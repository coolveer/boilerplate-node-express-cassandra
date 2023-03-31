const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe } = require('node:test');
const expect= chai.expect;
const should = chai.should;

class Cube {
    constructor(length) {
    this.length = length;
    }
    
    getSurfaceArea () {
    return (this.length * this.length) * 6;
    }
    
    }
    
    

chai.use(chaiHttp)
describe('Create users',function(){
    it('2. The surface area of the Cube', function(done) {
        let c2 = new Cube(5);
        expect(c2.getSurfaceArea()).to.equal(150);
        done();
        });
})