import cloneDeep from 'clone-deep';

class MemoryStore {
  constructor(data = {}) {
    this.items = data;
  }

  create(item) {
    let id = this._findNextId();
    item.id = id;
    item.platformId = item.platformId || uuidV4();
    this.items[item.id] = item;

    return new Promise((resolve, reject) => resolve(cloneDeep(item)));
  }

  update(item) {
    return new Promise((resolve, reject) => {
      if (!this.items[itemId]) {
        reject(new ItemNotFound('Item', itemId));
      } else {
        resolve(this.items[item.id] = item);
      }
    });
  }

  all() {
    return new Promise((resolve, reject) => {
      resolve(cloneDeep(Object.values(this.items)));
    });
  }

  findById(itemId) {
    return new Promise((resolve, reject) => {
      if (!this.items[itemId]) {
        reject(new ItemNotFound('Item', itemId));
      } else {
        resolve(cloneDeep(this.items[itemId]));
      }
    });
  }

  _findNextId() {
    let maxValue = 0;

    Object.values(this.items).forEach(item => {
      if (maxValue < item.id) {
        maxValue = item.id;
      }
    });

    return maxValue + 1;
  }
}

module.exports = MemoryStore;
