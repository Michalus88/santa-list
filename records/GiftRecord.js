const items = [{ name: 'kolejka', amount: 2 }, { name: 'klocki', amount: 10 }, { name: 'bączek', amount: 10 }];

class GiftRecord {
  constructor(name, quantity) {
    if (name === undefined || name.length > 3) {
      throw new Error('Nazwa musi zawierać co najmniej 3 znaki');
    }
    if (quantity === undefined || typeof quantity !== 'number') {
      throw new Error('Ilość jest wymagana i wartość musi być liczbą');
    }

    this.name = name;
    this.amount = quantity;
  }

  static async findOne(itemName) {
    const gift = items.filter((item) => item.name === itemName)[0];

    return gift === undefined ? null : new GiftRecord(gift.name, gift.amount);
  }

  static async findAll() {
    return items.map(({ name, amount }) => new GiftRecord(name, amount));
  }

  async quantityDecrement() {
    let isAvailable = true;
    items.forEach((item) => (item.name === this.name
      ? item.amount === 0
        ? isAvailable = false
        : --item.amount
      : null));
    return [isAvailable, this.name];
  }
}

module.exports = {
  GiftRecord,
};
