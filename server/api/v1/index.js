import express from 'express';
import cors from 'cors';

import cartRouter from './cart';
import itemsRouter from './items';

// High order function created to share our db singleton within requests
const databaseMiddleware = database => (req, res, next) => {
  req.database = database;
  next();
};

export default (database, port = 9000) => {
  const app = express();

	app.use(cors());
  app.use(express.json());
	app.use(databaseMiddleware(database));

	app.use('/v1/cart', cartRouter);
  app.use('/v1/items', itemsRouter);

  return app.listen(port);
}
