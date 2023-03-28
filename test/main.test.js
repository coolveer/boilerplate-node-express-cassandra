const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe } = require('node:test');
const expect= chai.expect;
const should = chai.should;


chai.use(chaiHttp)
describe('Create users',function(){
    it('Create users',function(done){
        chai.request('http://localhost:3001/api/typec')
        .get('/status')
        .end(function(err,res){
            expect(res).to.have.status(200);
            done();
        })
    })
})