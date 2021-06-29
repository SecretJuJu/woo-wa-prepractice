const fs = require("fs")
const path = require("path")

const myModule = (dirPath, filterExt, cb) => {
    
    fs.readdir(dirPath,(err,files) => {
        if (err) {
            return cb(err,null)
        }
        const result = files.filter(function (file) {
            return path.extname(file) === '.' + filterExt
        })
        return cb(null,result) 
    })
    
}

module.exports = myModule