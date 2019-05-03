import express from 'express';

import getItems from './getItems';

const itemsRouter = express.Router();

itemsRouter.get('/', getItems);

export default itemsRouter;
