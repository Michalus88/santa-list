const items = [{ name: 'kolejka', amount: 2 }, { name: 'klocki', amount: 10 }, { name: 'bączek', amount: 10 }];

class GiftRecord {
  constructor(name, amount) {
    this.name = name;
    this.amount = amount;
  }

  static async findOne(itemName) {
    const { amount, name } = items.filter((item) => item.name === itemName)[0];

    return new GiftRecord(name, amount);
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
