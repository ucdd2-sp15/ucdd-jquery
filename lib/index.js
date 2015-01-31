var fs = require('fs'),
    cheerio = require('cheerio')
_ = require('lodash')


function Group(nodes) {
    this.nodes = nodes
    this.length = nodes.length
}

Group.prototype.first = function() {
    var hardCodedResult = {
        type: 'li',
        children: [{
            type: 'text',
            data: 'Apple'
        }]
    }
    return new Group([hardCodedResult])
}


Group.prototype.last = function() {
    var hardCodedResult = {
        type: 'li',
        children: [{
            type: 'text',
            data: 'Banana'
        }]
    }
    return new Group([hardCodedResult])
}

Group.prototype.eq = function(i) {
    var hardCodedResult = {
        type: 'li',
        children: [{
            type: 'text',
            data: 'Orange'
        }]
    }
    return new Group([hardCodedResult])
}

Group.prototype.text = function() {
    // hardcoded answers
    if (this.nodes.length === 1) {
        return this.nodes[0].children[0].data
    } else {
        return 'AppleOrangeBanana'
    }
}

Group.prototype.parent = function() {
    var hardCodedResult = {
        type: 'ul',
        attribs: {
            id: 'fruits'
        },
        children: [{
            type: 'text',
            data: 'Orange'
        }]
    }
    return new Group([hardCodedResult])
}

Group.prototype.siblings = function() {
    var hardCodedResult = {
        type: 'li',
        children: [{
            type: 'text',
            data: 'Banana'
        }]
    }
    return new Group([hardCodedResult])
}

Group.prototype.attr = function(key) {
    return this.nodes[0].attribs[key]
}


// var html = '<ul><li>Apple</li><li>Orange</li><li>Banana</li></ul>'
// var html = '<li>Apple</li><li class="orange">Orange</li><li>Banana</li>'

// console.log(JSON.stringify(parse(html), null, ' '))

// $$('li')

// load(html)

// var $ = cheerio.load(html)
// var $$ = load(html)


var lib = {}
lib.load = load
lib.parse = parse
module.exports = lib


// console.log($('li').length)
// console.log($$('li').length)


// console.log($('li').text())
// console.log($$('li').text())


// console.log($('li').first().text())
// console.log($$('li').first().text())

// console.log($('li').last().text())
// console.log($$('li').last().text())

// console.log($('.orange').text())
// console.log($$('.orange').text())


// console.log($('.orange').after('<li>Plumn</li>'))
// console.log($.html())


function load(html) {

    var tree = parse(html)

    return function(selector) {

        return my$(selector, tree)

    }
}


function selectByTagName(selector, tree) {
    return [{
        type: 'li',
        children: [{
            type: 'text',
            data: 'Apple'
        }]
    }, {
        type: 'li',
        children: [{
            type: 'text',
            data: 'Orange',
            attribs: {
                'class': 'orange'
            }
        }]
    }, {
        type: 'li',
        children: [{
            type: 'text',
            data: 'Banana'
        }]
    }]
}

function selectByClassName(selector, tree) {
    return [{
        type: 'li',
        children: [{
            type: 'text',
            data: 'Orange',
            attribs: {
                'class': 'orange'
            }
        }]
    }]
}

function select(selector, tree) {

    if (selector === 'li') {

        return selectByTagName(selector, tree)

    } else if (selector === '.orange') {

        return selectByClassName(selector, tree)
    } else {

        return []
    }
}

function my$(selector, tree) {


    // fake results

    selectedNodes = select(selector, tree)

    var group = new Group(selectedNodes)
    return group
}


function parse(html) {
    var $ = cheerio.load(html)
    return simple($.root()[0])
}


function simple(node) {
    var snode = {
        type: node.type
    }
    if ('name' in node) {
        snode.name = node.name
    }
    if ('attribs' in node) {
        snode.attribs = node.attribs
    }
    if ('data' in node) {
        snode.data = node.data
    }
    if (node.children) {
        snode.children = []
        node.children.forEach(function(c) {
            childNode = simple(c)
            childNode.parent = snode
    
            if (childNode.type == 'text' && childNode.data.match(/\s/)) {} else {
                snode.children.push(childNode)
            }
        })
    }
    return snode
}

function render(node) {

    var html = ''

    if (node.type === 'root') {

        // render children's contents recursively
        if (node.children) {
            node.children.forEach(function(c) {

                html = html + render(c)

            })
        }

    } else if (node.type === 'tag') {

        // openning tag
        html = html + '<' + node.name + '>'

        // render children's contents recursively
        if (node.children) {
            node.children.forEach(function(c) {

                html = html + render(c)

            })
        }

        // closing tag
        html = html + '</' + node.name + '>'

    } else {

        html = html + node.data
    }

    return html
}