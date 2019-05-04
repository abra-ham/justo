import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';

const should = chai.should();

chai.use(chaiHttp);

const tshirt = {
	code: "TSHIRT",
	description: "Esta playera se encuentra libre de spoilers.",
	name: "Playera con motivo de Avengers: Endgame",
	price: 20,
}

const voucher = {
	code: 'VOUCHER',
	name: 'Voucher de Peppa Pig',
	description: 'Perfecto para tus sobrinos.',
	price: 5,
}

const mug = {
	code: 'MUG',
	name: 'Taza con motivo Vegetariano',
	description: 'Ahora nadie te invitará por una hamburguesa, bien hecho.',
	price: 7.5,
}

describe.only('Cart', () => {
	it('should be empty given no items', done => {
		chai.request(app)
			.get('/v1/cart/')
			.end((err, res) => {
				res.should.have.status(200);
				res.body[0].items.length.should.be.eql(0);

				done();
			})
	});

	it('should have an item given an item', done => {
		chai.request(app)
			.post('/v1/cart/add', { item: 'VOUCHER' })
			.end((err, res) => res)
			
		chai.request(app)
			.get('/v1/cart/')
			.end((err, res) => {
				res.should.have.status(200);
				res.body[0].items.length.should.be.eql(1);

				done();
			})
	})

	it('should apply 2 by 1 promo given 2 vouchers or more ', done => {
		const { price } = voucher;

		chai.request(app).post('/v1/cart/add').send({ item: voucher })
			.end((err, res) => res);

		chai.request(app).get('/v1/cart/checkout')
			.end((err, res) => {
				res.body.total.should.be.eql(price);
			})
	
		chai.request(app).post('/v1/cart/add').send({ item: voucher })
			.end((err, res) => res)

		chai.request(app).get('/v1/cart/checkout')
			.end((err, res) => {
				res.body.total.should.be.eql(price * 2);
				res.body.discount.should.be.eql(price)
			})
		
		chai.request(app).post('/v1/cart/add').send({ item: voucher })
			.end((err, res) => res)

		chai.request(app)
			.get('/v1/cart/checkout')
			.end((err, res) => {
				res.body.total.should.be.eql(price * 3);
				res.body.discount.should.be.eql(price * 2)

				done();
			})
	})

	it.only('should apply bulk promo given 3 tshirts or more ', done => {
		const { price } = tshirt;
		const discountPrice = 19;

		chai.request(app).post('/v1/cart/add').send({ item: tshirt })
			.end((err, res) => res);

		chai.request(app).get('/v1/cart/checkout')
			.end((err, res) => {
				res.body.total.should.be.eql(price);
			})
	
		chai.request(app).post('/v1/cart/add').send({ item: tshirt })
			.end((err, res) => res)

		chai.request(app).get('/v1/cart/checkout')
			.end((err, res) => {
				res.body.total.should.be.eql(price * 2);
			})
		
		chai.request(app).post('/v1/cart/add').send({ item: tshirt })
			.end((err, res) => res)

		chai.request(app)
			.get('/v1/cart/checkout')
			.end((err, res) => {
				res.body.total.should.be.eql(price * 3);
				res.body.discount.should.be.eql(discountPrice * 3)
				res.body.discount.should.not.be.eql(price * 3)

				done();
			})
	})

	it('should return a total of 74.5 during checkout, given 3 VOUCHERS, 3 TSHIRTS and 1 MUG', done => {
		chai.request(app).post('/v1/cart/add').send({ item: voucher })
			.end((err, res) => res);
	
		chai.request(app).post('/v1/cart/add').send({ item: tshirt })
			.end((err, res) => res)
		
		chai.request(app).post('/v1/cart/add').send({ item: voucher })
			.end((err, res) => res)

		chai.request(app).post('/v1/cart/add').send({ item: voucher })
			.end((err, res) => res)
		
		chai.request(app).post('/v1/cart/add').send({ item: mug })
			.end((err, res) => res)
		
		chai.request(app).post('/v1/cart/add').send({ item: tshirt })
			.end((err, res) => res)

		chai.request(app).post('/v1/cart/add').send({ item: tshirt })
			.end((err, res) => res)

		chai.request(app)
			.get('/v1/cart/checkout')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.discount.should.be.eql(74.5);
				res.body.discount.should.not.be.eql(82.5);

				done();
			})
	})
});

