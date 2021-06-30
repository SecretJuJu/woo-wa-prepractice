const http = require('http')
const fs = require("fs")

const PORT = process.argv[2]
const FILEPATH = process.argv[3]

const server = http.createServer((req,res) => {
    fs.createReadStream(FILEPATH).pipe(res)
})

server.listen(PORT)