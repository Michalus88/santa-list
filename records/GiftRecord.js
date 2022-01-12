const { v4: uuid } = require('uuid');
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
    if (!gift) throw new Error('Nie ma prezentu o podanym id');

    return new GiftRecord(gift.id, gift.name, gift.count);
  }

  static async findAll() {
    const [gifts] = await pool.query('SELECT * FROM `gifts`;');

    return gifts.map((gift) => new GiftRecord(gift.id, gift.name, gift.count));
  }

  async insert() {
    if (!this.id) {
      this.id = uuid();
    }
    await pool.execute('INSERT INTO `gifts`(`id`,`name`,`count`) VALUES(:id,:name) ', { id: this.id, name: this.name });
    return this.id;
  }

  async update() {
    await pool.execute('UPDATE `gifts` SET `count` = :count WHERE `id`=:id ;',
      { count: this.count - 1, id: this.id });
  }

  async isGiftAvailable() {
    const isAvailable = this.count !== 0;
    if (!isAvailable) throw new Error('Produkt nie dostępny');
    await this.update();

    return this.name;
  }
}

module.exports = {
  GiftRecord,
};
