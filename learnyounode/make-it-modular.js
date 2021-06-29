const myModule = require('./mymodule.js')

myModule(process.argv[2],process.argv[3],(err,data) => {
    data.forEach(e => {console.log(e)})
})