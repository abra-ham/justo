import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';

const should = chai.should();

chai.use(chaiHttp);

describe('Items', () => {
	it('should get all items given zero arguments', done => {
		chai.request(app)
			.get('/v1/items/')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.length.should.be.eql(3);
				done();
			})
	});
}) 
