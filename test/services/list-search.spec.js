const expect = require('chai').expect

require('chai').should()

describe('List Sorted Service', function() {
    before(async function () {
        this.service = require('../../services/listsort/list-sorted')
    })
    
    describe('search by key', function() {
        it('should return an array key', async function() {
            let list = [3,1,5,10,233,2,6]
            let valueExistsToSearch = 2
            let missingValueToSearch = 4

            let resultExistsValue = this.service.listsearch(list, valueExistsToSearch)
            let resultMissingValue = this.service.listsearch(list, missingValueToSearch)

            console.log(resultExistsValue, resultExistsValue)
        })
    })
})