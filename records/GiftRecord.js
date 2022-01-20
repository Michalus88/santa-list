const { v4: uuid } = require('uuid');
const { pool } = require('../config/mariaDb');
const { NoFoundError, ValidateError } = require('../utils/errors');

class GiftRecord {
  constructor(giftObj) {
    if (giftObj.name === undefined || giftObj.name.length < 3) {
      throw new ValidateError('Nazwa musi zawierać co najmniej 3 znaki');
    }
    if (giftObj.count === undefined || typeof giftObj.count !== 'number') {
      throw new ValidateError('Ilość jest wymagana i wartość musi być liczbą');
    }
    this.id = giftObj.id;
    this.name = giftObj.name;
    this.count = giftObj.count;
  }

  static async findOne(id) {
    const [[gift]] = await pool.query('SELECT * FROM `gifts` WHERE `id`=:id ;', { id });
    if (!gift) throw new Error('Nie ma prezentu o podanym id');

    return new GiftRecord(gift);
  }

  static async findAll() {
    const [gifts] = await pool.query('SELECT * FROM `gifts`;');

    return gifts.map((gift) => new GiftRecord(gift));
  }

  async insert() {
    if (!this.id) {
      this.id = uuid();
    }
    await pool.execute('INSERT INTO `gifts`(`id`,`name`,`count`) VALUES(:id,:name,:count) ', {
      id: this.id,
      name: this.name,
      count: this.count,
    });

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
