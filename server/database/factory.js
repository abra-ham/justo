import MemoryDatabase from './memory';

import { staticItems, initialCartState, promotions } from '../data';

export default (driverName) => {
  if (driverName === 'memory') {
    return new MemoryDatabase(staticItems, initialCartState, promotions);
  }
};
