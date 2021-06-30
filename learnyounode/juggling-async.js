const http = require('http')

const target1 = process.argv[2]
const target2 = process.argv[3]


const getFullText = (target) => {
    return new Promise((resolve) => {
        http.get(target,(res) => {
            let fulltext = ""
            res.on('data',chunk => {
                fulltext += chunk
            })

            res.on('end',() => {
                resolve(fulltext)
            })
        })
    }) 
}

const main = async () => {
    for (let i=2; i < process.argv.length; i++) {
        console.log(await getFullText(process.argv[i]));
    }
}

main()