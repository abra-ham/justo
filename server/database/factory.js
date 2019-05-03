import MemoryDatabase from './memory';

import { staticItems, initialCartState } from '../data';

export default (driverName) => {
  if (driverName === 'memory') {
    return new MemoryDatabase(staticItems, initialCartState);
  }
}
