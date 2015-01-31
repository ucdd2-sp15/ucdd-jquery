var parse = require('./lib').parse
var fs = require('fs')


var inspect = require('eyes').inspector({
    maxLength: 10000
});

var html1 = fs.readFileSync('data/1.html', 'utf8')
var html2 = fs.readFileSync('data/2.html', 'utf8')
var html3 = fs.readFileSync('data/3.html', 'utf8')

console.log("data/1.html")
inspect(parse(html1))

console.log("data/2.html")
inspect(parse(html2))

console.log("data/3.html")
inspect(parse(html3))



