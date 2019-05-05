import chai from 'chai';
import chaiHttp from 'chai-http';
import cloneDeep from 'clone-deep';

import { staticItems } from '../data';
import createDatabase from '../database/memory';
import server from '../api/v1';

const should = chai.should();

chai.use(chaiHttp);

describe('Items', () => {
	let app;

	beforeEach(() => {
		const items = cloneDeep(staticItems);
		const database = new createDatabase(items, {}, {});

		app = server(database);
	})

	afterEach(() => app.close());

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
