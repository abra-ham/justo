import express from 'express';

import getCart from './getCart';

const cartRouter = express.Router();

cartRouter.get('/', getCart);

export default cartRouter;
