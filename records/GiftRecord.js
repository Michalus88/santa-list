const { pool } = require('../config/mariaDb');

class GiftRecord {
  constructor(name, count) {
    if (name === undefined || name.length < 3) {
      throw new Error('Nazwa musi zawierać co najmniej 3 znaki');
    }
    if (count === undefined || typeof count !== 'number') {
      throw new Error('Ilość jest wymagana i wartość musi być liczbą');
    }

    this.name = name;
    this.count = count;
  }

  static async findOne(itemName) {

  }

  static async findAll() {

  }

  static async add(name, quantity) {

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
