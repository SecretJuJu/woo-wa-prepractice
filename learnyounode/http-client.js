const http = require('http')
const target = process.argv[2]

http.get(target,res => {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log(chunk)
    });
})