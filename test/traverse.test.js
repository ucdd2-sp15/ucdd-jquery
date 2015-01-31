var ours = require('../lib'),
    theirs = require('cheerio'),
    assert = require('assert')

describe('traverse', function() {

    var html1 = '<li>Apple</li><li class="orange">Orange</li><li>Banana</li>'
    var html2 = '<ul><li>Banana</li><li>Apple</li></ul>'

    describe('length', function() {

        it('should work on html2', function() {

            $ = theirs.load(html1)
            $$ = ours.load(html1)

            theirResult = $('li').length
            ourResult = $$('li').length

            assert.equal(ourResult, theirResult)

        })


        it('should work on html2', function() {

            $ = theirs.load(html2)
            $$ = ours.load(html2)

            theirResult = $('li').length
            ourResult = $$('li').length

            assert.equal(ourResult, theirResult)

        })

    })

    describe('first', function() {

        it('should work on html2', function() {

            $ = theirs.load(html1)
            $$ = ours.load(html1)

            theirResult = $('li').first().text()
            ourResult = $$('li').first().text()
            assert.equal(ourResult, theirResult)
        })


        it('should work on html2', function() {

            $ = theirs.load(html2)
            $$ = ours.load(html2)

            theirResult = $('li').first().text()
            ourResult = $$('li').first().text()
            assert.equal(ourResult, theirResult)
        })

    })

    describe('last', function() {

        it('should work on html1', function() {

            $ = theirs.load(html1)
            $$ = ours.load(html1)

            theirResult = $('li').last().text()
            ourResult = $$('li').last().text()
            assert.equal(ourResult, theirResult)
        })


        it('should work on html2', function() {

            $ = theirs.load(html2)
            $$ = ours.load(html2)

            theirResult = $('li').last().text()
            ourResult = $$('li').last().text()
            assert.equal(ourResult, theirResult)
        })

    })

    describe('eq', function() {

        it('should work on html1', function() {

            $ = theirs.load(html1)
            $$ = ours.load(html1)

            theirResult = $('li').eq(1).text()
            ourResult = $$('li').eq(1).text()
            assert.equal(ourResult, theirResult)
        })


        it('should work on html2', function() {

            $ = theirs.load(html2)
            $$ = ours.load(html2)

            theirResult = $('li').eq(1).text()
            ourResult = $$('li').eq(1).text()
            assert.equal(ourResult, theirResult)
        })

    })

    var html3 = '<div><ul id="fruits"><li>Apple</li><li class="orange">Orange</li><li>Banana</li></ul></div>'

    describe('parent', function() {

        it('should work on html3', function() {

            $ = theirs.load(html3)
            $$ = ours.load(html3)

            theirResult = $('.orange').parent().attr('id')
            ourResult = $$('.orange').parent().attr('id')
            assert.equal(ourResult, theirResult)
        })

    })

    describe('siblings', function() {

        it('should work on html3', function() {

            $ = theirs.load(html3)
            $$ = ours.load(html3)

            theirResult = $('.orange').siblings().text()
            ourResult = $$('.orange').siblings().text()
            assert.equal(ourResult, theirResult)
        })

    })

})