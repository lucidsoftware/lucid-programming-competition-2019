import * as scoreboard from './scoreboard';

exports.handler = async (event, context, callback) => {

    try {
        callback(null,{
            "isBase64Encoded": false,
            "statusCode": 200,
            "headers": { 'content-type': 'text/html'},
            "body": await scoreboard.leaderboard((event && event.queryStringParameters && event.queryStringParameters.school) || '')
        });
    } catch(e) {
        callback(e);
    }
};

exports.queue = async (event, context, callback) => {
    try {
        callback(null,{
            "isBase64Encoded": false,
            "statusCode": 200,
            "headers": { 'content-type': 'text/html'},
            "body": await scoreboard.getBaloonQueue((event && event.queryStringParameters && event.queryStringParameters.school) || '')
        });
    } catch(e) {
        callback(e);
    }
}