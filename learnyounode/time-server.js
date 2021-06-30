const net = require('net')
const PORT = parseInt(process.argv[2])

const fillZero = (num) => {
    return num >= 10? num: "0"+num
}

const getNow = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = fillZero(now.getMonth() + 1)
    const day = fillZero(now.getDate())
    const hour = fillZero(now.getHours())
    const minute = fillZero(now.getMinutes())
    return `${year}-${month}-${day} ${hour}:${minute}`
}

const server = net.createServer(function (socket) {
    socket.end(getNow()+"\n")
})
server.listen(PORT)