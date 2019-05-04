import express from 'express';

import getCart from './getCart';
import addItemToCart from './addItemToCart';
import checkout from './checkout';

const cartRouter = express.Router();

cartRouter.get('/', getCart);
cartRouter.get('/checkout', checkout);
cartRouter.post('/add', addItemToCart);

export default cartRouter;
