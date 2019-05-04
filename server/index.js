import justoStore from './api/v1';
import connectDatabase from './database/factory';

const DATABASE_DRIVER = 'memory';
const PORT = 9000;

const database = connectDatabase(DATABASE_DRIVER);
const app = justoStore(database);

console.log(`Server listening on ${PORT}`);

export default app;
