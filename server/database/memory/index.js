import MemoryStore from './store';

class ItemStore extends MemoryStore {}
class CartStore extends MemoryStore {}

class MemoryDatabase {
  constructor(items, cart) {
    this.items = new ItemStore(items);
    this.cart = new CartStore(cart);
  }
}

module.exports = MemoryDatabase;
