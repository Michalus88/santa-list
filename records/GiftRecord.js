const { pool } = require('../config/mariaDb');

class GiftRecord {
  constructor(id, name, count) {
    if (name === undefined || name.length < 3) {
      throw new Error('Nazwa musi zawierać co najmniej 3 znaki');
    }
    if (count === undefined || typeof count !== 'number') {
      throw new Error('Ilość jest wymagana i wartość musi być liczbą');
    }
    this.id = id;
    this.name = name;
    this.count = count;
  }

  static async findOne(id) {
    const [[gift]] = await pool.query('SELECT * FROM `gifts` WHERE `id`=:id ;', { id });

    return new GiftRecord(gift.id, gift.name, gift.count);
  }

  static async findAll() {
    const [gifts] = await pool.query('SELECT * FROM `gifts`;');

    return gifts.map((gift) => new GiftRecord(gift.id, gift.name, gift.count));
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
