const http = require('http')
const target = process.argv[2]


const getFullText = async () => {
    return new Promise(resolve => {
        http.get(target,res => {
            let fullText = ""
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                fullText += chunk
            });
            res.on('end',() => {
                resolve(fullText)
            })
        })    
    })
}

async function main() {
    fullText = await getFullText()
    console.log(fullText.length)
    console.log(fullText)
}

main()