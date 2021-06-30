const http = require('http')
const PORT = process.argv[2]

const controller = {
    parseTime: (req,res,url) => {
        const params = {}
        for (const [key,val] of url.searchParams) {
            params[key] = val
        }

        const iso = params['iso']
        const date = new Date(iso)

        const result =  {
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        }

        // response
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify(result))

        return  res.end()
    },
    unixTime: (req,res,url) => {
        const params = {}
        for (const [key,val] of url.searchParams) {
            params[key] = val
        }
        const iso = params['iso']
        const date = new Date(iso)

        const result =  {
            unixtime: date.getTime()
        }

        // response
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify(result))

        return  res.end()
    }
}

const server = http.createServer((req,res) => {
    const url = new URL(req.url,`http://localhost:${PORT}`)
    if (url.pathname === "/api/parsetime") {
        return controller.parseTime(req,res,url)
    }
    if (url.pathname === "/api/unixtime") {
        return controller.unixTime(req,res,url)
    }
})

server.listen(PORT)