var rp = require('request-promise');
var tough = require('tough-cookie');
var escape = require('escape-html');

let cookie = new tough.Cookie({
    key: "_hrank_session",
    value: process.env['HACKERRANK_AUTH'],
    domain: 'www.hackerrank.com',
    httpOnly: true,
    maxAge: 31536000
});

const LOCK_SCOREBOARD = false;

function bucket(data, key) {
    let result = {};
    data.forEach(d => {
        if(!(d[key] in result)) {
            result[d[key]] = []
        }
        result[d[key]].push(d)
    });
    return result;
}

const whitelist = {
    1311122608: true,
};

function calculateScore(submissions) {
    let score = 0;
    let time = 0;
    let problemStatus = {};
    submissions.sort((a,b) => {
        return a['time_from_start'] - b['time_from_start'];
    });

    submissions.forEach(submission => {
        if(!submission.in_contest_bounds) {
            return;
        }
        if(LOCK_SCOREBOARD && submission.time_from_start > 3*60) {
            return;
        }
        let slug = submission.challenge.slug;
        if(!(problemStatus[slug])) {
            problemStatus[slug] = {
                complete: false,
                penalty: 0,
                time: 0
            };
        }
        if(problemStatus[slug].complete) {
            return;
        }
        if(submission.status == 'Accepted' || whitelist[submission.id]) {
            problemStatus[slug].complete = true;
            score++;
            problemStatus[slug].time = submission.time_from_start;
            time += problemStatus[slug].time + problemStatus[slug].penalty;
        } else {
            problemStatus[slug].penalty += 20;
        }
    });
    return {
        score: score,
        problemStatus: problemStatus,
        time: time,
        userName: submissions[0].hacker_username,
    }
}

function toTimeStr(time) {
    let minutes = Math.abs(time);
    let hours = Math.floor(minutes/60);
    let min: any = minutes - hours * 60;
    let seconds: any = Math.round((min - Math.floor(min)) * 60);
    min = Math.floor(min);
    if(min < 10) {
        min = '0' + min;
    }
    if(seconds < 10) {
        seconds = '0' + seconds;
    }

    return (time < 0 ? '-' : '') + hours + ':' + min + ':' + seconds;
}

let problems = [
   'art-1',
   'dungeon-crawler',
   'mean-older-brother',
   'to-catch-a-cheat',
   'rotating-caesar-cipher',
   'scramble-squares',
   'trade-market',
   'risky-business',
   'honest-rectangle',
   'quick-chats',
];

const CONTEST_NAME= 'lucid-2019-cu';
let problem_names = {
   'art-1': 'Art',
   'dungeon-crawler': 'Dungeon Crawler',
   'mean-older-brother': 'Mean Older Brother',
   'to-catch-a-cheat': 'To Catch a Cheat',
   'rotating-caesar-cipher': 'Rotating Caesar Cipher',
   'scramble-squares': 'Scramble Squares',
   'trade-market': 'Trade Market',
   'risky-business': 'Risky Business',
   'honest-rectangle': 'Honest Rectangle',
   'quick-chats': 'Quick Chats',
};


const LIMIT = 100;
const BASE_URL = `https://www.hackerrank.com/contests/${CONTEST_NAME}/challenges/`;
const REST_URL = `https://www.hackerrank.com/rest/contests/${CONTEST_NAME}/judge_submissions/?limit=` + LIMIT;

var cookiejar = rp.jar();
cookiejar.setCookie(cookie, 'https://www.hackerrank.com');

function getPage(page: number) {
    return rp({
        method:'GET',
        uri: REST_URL + '&offset=' + page*LIMIT,
        jar: cookiejar,
        json: true
    });
}

async function getSubmissions() {

    let first = await getPage(0);
    let rest = [];
    for(let i=1; i*LIMIT < first.total; i++) {
        rest.push(getPage(i));
    }

    let result = first.models;

    let otherPages = await Promise.all(rest);

    otherPages.forEach(data => {
        result.push(...data.models);
    });

    let seen = {};
    return result.filter(submission => {
        if(seen[submission.id]) {
            return false;
        }
        seen[submission.id] = true;
        return true;
    });
}

export async function leaderboard(schoolFilter?:string) {

    let abbreviations = {
        'byu': 'BYU',
        'usu': 'USU',
        'uofu': 'Utah',
        'osu': 'OSU',
        'cu': 'CU',
    };
    schoolFilter = schoolFilter && schoolFilter.toLocaleLowerCase();
    if(schoolFilter && !(schoolFilter in abbreviations)) {
        schoolFilter = '';
    }

    let data = await getSubmissions();

    let byUserName = bucket(data, 'hacker_username');

    let profiles = {};
    let promises = [];
    for(let user in byUserName) {
        promises.push(rp({
            method:'GET',
            uri: 'https://www.hackerrank.com/rest/contests/master/hackers/' + user,
            jar:cookiejar,
            json: true,
        }).then(result => profiles[user] = result));
    }
    await Promise.all(promises);

    let scores = [];
    for(let user in byUserName) {
        let submissions = byUserName[user];
        let score = calculateScore(submissions);
        scores.push(score);
    }
    scores.sort((a, b) => {
        return (b.score - a.score) || (a.time - b.time)
    });


    let result = `<html><head><link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
    <style>.container { min-width:1300px; } .title {color: black;}</style>
    <style>
    .tooltip {
        position: relative;
    }

    .need-names {
        color: #ED6058;
    }

    .tooltip .tooltiptext {
        visibility: hidden;
        width: 300px;
        background-color: black;
        color: #fff;
        text-align: left;
        padding: 5px;
        border-radius: 6px;

        position: absolute;
        z-index: 1;
        top: 50%;
        left: calc(100% + 10px);
        transform: translateY(-50%);
    }

    .tooltip:hover .tooltiptext {
        visibility: visible;
    }
    </style>
    </head>
    <body>

    <div class="container">
    <h1><a class="title" href="?">Lucid Programming Competition Leaderboard</a></h1>`
    let table = `<table class="bordered striped centered"><tbody>\n<thead><tr><th>Rank</th><th>Name</th><th>Location</th>`;
    problems.forEach(p => {
        table += `<th><a href="${BASE_URL+p}">${problem_names[p]}</a></th>`;
    });
    table += '<th>Score</th><th>Time</th></tr></thead>';

    let hasScore = false;

    for(let i=0; i<scores.length; i++) {
        let score = scores[i];
        if(score.score == 0) {
            continue;
        }
        let bio = (profiles[score.userName].model.short_bio || '').split('\n');
        let school = (bio.shift() || '').toLocaleLowerCase();

        let names = bio.map(n => escape(n)).join('<br>');

        let nameTooltip = bio.length > 0 ? 'Competitors:<br>' + names : 'Update the "About" field to have the school you are competing at as the first line (CU), followed by the name of each person on your team on the next lines.<br><b>You must do this to be eligible for prizes</b>';

        let row = `\n<tr><td>${i+1}</td><td><a class="tooltip${bio.length == 0 ? ' need-names' : ''}" href="https://www.hackerrank.com/${score.userName}">${escape(profiles[score.userName].model.name)}${bio.length == 0 ? '*' : ''} <span class="tooltiptext">${nameTooltip}</span></a></td>`;
        if(schoolFilter && schoolFilter != school) {
            continue;
        }
        if(abbreviations[school]) {
            if(!schoolFilter) {
                row += `<td><a href="?school=${abbreviations[school]}">${abbreviations[school]}</a></td>`;
            } else {
                row += `<td>${abbreviations[school]}</td>`;
            }
        } else {
            row += `<td><a class="tooltip" href="https://www.hackerrank.com/settings/bio">Set Location<span class="tooltiptext">Update the "About" field to have the school you are competing at as the first line (CU), followed by the name of each person on your team on the next lines.<br><b>You must do this to be eligible for prizes</b></span></td>`;
        }
        problems.forEach(p => {
            row += '<td>';
            if(score.problemStatus[p] && score.problemStatus[p].complete) {
                row += `${toTimeStr(score.problemStatus[p].time)}`;
                if(score.problemStatus[p].penalty) {
                    row += `<br>(+${score.problemStatus[p].penalty})`;
                }
            }
            row += '</td>';
        });
        row += `<td>${score.score}</td><td>${toTimeStr(score.time)}</td>`;
        row += '</tr>';
        table += row;
        hasScore = true;
    }
    table += '</tbody></table>';

    if(!hasScore) {
        result += `The <a href="https://www.hackerrank.com/contests/${CONTEST_NAME}">Lucid Programing Competition</a> Leaderboard will be enabled after the first successful submission`;
    } else {
        result += table;
    }

    result += '</div></body></html>';

    return result;
};

export async function getBaloonQueue(schoolFilter:string = '') {
    let submissions = await getSubmissions();
    let byUserName = bucket(submissions, 'hacker_username');

    let profiles = {};
    let promises = [];
    for(let user in byUserName) {
        promises.push(rp({
            method:'GET',
            uri: 'https://www.hackerrank.com/rest/contests/master/hackers/' + user,
            jar:cookiejar,
            json: true,
        }).then(result => profiles[user] = result));
    }
    await Promise.all(promises);

    let schools = {
        'byu': true,
        'utah': true,
        'usu': true,
        'osu': true,
        'cu': true,
    };

    schoolFilter = schoolFilter.toLowerCase()

    if(!(schoolFilter in schools)) {
        schoolFilter = '';
    }

    let acceptedAtSchool = submissions.filter(submission => {
        if(LOCK_SCOREBOARD && submission.time_from_start > 3*60) {
            return;
        }
        // let bio = (profiles[submission.hacker_username].model.short_bio || '').split('\n');
        // let school = (bio.shift() || '').toLocaleLowerCase();
        return submission.status == 'Accepted' /* && school && school in schools && (!schoolFilter || schoolFilter == school) */;
    });

    acceptedAtSchool.sort((a,b) => {
        return a.time_from_start - b.time_from_start;
    });

    let scores = {};
    let solved = {};

    let result = acceptedAtSchool.filter(submission => {
        let key = submission.challenge.slug + ',' + submission.hacker_username;
        if(solved[key]) {
            return false;
        }
        solved[key] = true;
        return true;
    }).map(submission => {
        if(!(submission.hacker_username in scores)) {
            scores[submission.hacker_username] = 0;
        }
        scores[submission.hacker_username]++;
        let bio = (profiles[submission.hacker_username].model.short_bio || '').split('\n');
        let school = (bio.shift() || '').toLocaleLowerCase();
        return {
            name: profiles[submission.hacker_username].model.name,
            score: scores[submission.hacker_username],
            id: submission.id,
            userId: submission.hacker_id,
            problem: submission.challenge.name,
            time: toTimeStr(submission.time_from_start),
            school: school,
        }
    });

    let html = `<html>
    <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
        <style>
            .item {
                cursor: pointer;
                transition: 0.5s all;
            }
            .selected {
                background-color: #42a5f5;
                text-decoration: line-through;
            }
        </style>
    </head>
    <body>
        <div class="container">
        <h1>LPC Balloon Queue</h1>
        ${schoolFilter ? '' : '<p>Filter to a location: <a href="?school=byu">BYU</a>, <a href="?school=utah">Utah</a>, or <a href="?school=usu">USU</a>.</p>'}
        <table>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>School</th>
                    <th>Problem</th>
                    <th>Location</th>
                    <th>Time Solved</th>
                    <th>Score</th>
                </tr>`;

    result.reverse();
    result.forEach(s => {
        html += `\n    <tr class="item" id="${s.id}" data-user="${s.userId}">
        <td>${escape(s.name)}</td>
        <td>${escape(s.school)}</td>
        <td>${escape(s.problem)}</td>
        <td><input type="text"></td>
        <td>${escape(s.time)}</td>
        <td>${escape(s.score)}</td>
    </tr>`
    })
    if(result.length == 0) {
        html += '<tr><td>Waiting for successful submission</td></tr>'
    }

    html += `\n            </tbody>
        </table></div>
    <script>
        document.querySelectorAll('.item').forEach(function(item) {
            item.onclick = function() {
                var selected = item.classList.toggle('selected');
                localStorage.setItem(item.id, selected);
            }

            let input = item.querySelector('input');

            input.onclick = function(event) {
                event.stopPropagation();
            };

            input.onchange = function() {
                document.querySelectorAll('.item').forEach(function(check) {
                    if(check.dataset['user'] == item.dataset['user']) {
                        check.querySelector('input').value = input.value;
                    }
                });
                localStorage.setItem(item.dataset['user']+'-location', input.value);
            };

            if(localStorage.getItem(item.id) == 'true') {
                item.classList.add('selected');
            }
            if(localStorage.getItem(item.dataset['user']+'-location')) {
                input.value = localStorage.getItem(item.dataset['user']+'-location');
            }
        });
    </script>
    </body>
</html>`;

    return html;
}
