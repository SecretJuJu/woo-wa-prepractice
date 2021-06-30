const http = require('http')
const map = require('through2-map')

const PORT = process.argv[2]

server = http.createServer((req,res) => {
    if (req.method !== 'POST') {
        return res.end("only post")
    }

    req.pipe(map((chunk) => {
        return chunk.toString().toUpperCase()
    })).pipe(res)
})

server.listen(PORT)