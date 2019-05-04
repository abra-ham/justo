import MemoryStore from './store';

class ItemStore extends MemoryStore {}
class PromotionStore extends MemoryStore {
  applyPromotion(promotionForItem, itemQuantity, itemPrice) {
    const { description, promotion } = promotionForItem;
    
    return {
      discountedPricePerItem: promotion(itemQuantity, itemPrice),
      promotionDescription: description,
    };
  };
}

class CartStore extends MemoryStore {
  async checkout(database) {
    const itemsInCart = this.items['0'].items;

    const {
      discount,
      itemsWithCount,
    } = await this._getDiscountedPriceAndAppliedPromotions(itemsInCart, database);

    const payload = {
      discount,
      total: this._getTotal(itemsInCart, database),
      itemsWithCount: Object.values(itemsWithCount),
    }

    return new Promise((resolve, reject) => resolve(payload));
  }

  _getTotal(items) {
    return items.reduce((acc, curr) => acc += curr['price'], 0);
  }

  async _getDiscountedPriceAndAppliedPromotions(items, database) {
    const { promotions } = database;

    const itemsWithCount = this._countItems(items);
    const itemCodes = Object.keys(itemsWithCount);

    let discount = 0;

    const [availablePromotions] = await promotions.all();

    itemCodes.forEach(itemCode => {
      const promotionForItem = availablePromotions[itemCode];
      const itemQuantity = itemsWithCount[itemCode]['quantity'];
      const itemPrice = itemsWithCount[itemCode]['price'];

      if (promotionForItem.promotion) {
        const {
          discountedPricePerItem,
          promotionDescription
        } = promotions.applyPromotion(promotionForItem, itemQuantity, itemPrice);

        itemsWithCount[itemCode] = {
          ...itemsWithCount[itemCode],
          promotionDescription,
          discount: discountedPricePerItem,
        };

        discount = discount + discountedPricePerItem;
      } else {
        discount = discount + itemPrice;
      }
    });

    return {
      discount,
      itemsWithCount,
    };
  }

  _countItems(items) {
    const itemQuantityMap = {};

    items.forEach(item => {
      if (itemQuantityMap[item.code] == undefined) {
        itemQuantityMap[item.code] = {
          quantity: 1,
          ...item,
        };
      } else {
        itemQuantityMap[item.code]['quantity'] = itemQuantityMap[item.code]['quantity'] += 1;
      }
    })

    return itemQuantityMap;
  }
}

class MemoryDatabase {
  constructor(items, cart, promotions) {
    this.items = new ItemStore(items);
    this.cart = new CartStore(cart);
    this.promotions = new PromotionStore(promotions)
  }
}

module.exports = MemoryDatabase;
