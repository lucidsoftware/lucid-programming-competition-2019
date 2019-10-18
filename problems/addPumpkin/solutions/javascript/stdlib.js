const chunks = [];
process.stdin.on('data', d => chunks.push(d));
process.stdin.on('end', () => {
    const data = chunks.join('');
    console.log(
        data.split(' ')
        .map((str) =>
            parseInt(
                str.replace(/W/g, '1').replace(/P/g, '0'),
                2
            )
        )
        .reduce((a,b) => a + b, 0)
        .toString(2)
        .replace(/1/g, 'W')
        .replace(/0/g, 'P')
    );
});