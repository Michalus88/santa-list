import { db, ObjectId } from '../../config/mongoDb';
import { NoFoundError, ValidateError } from '../../utils/errors';

export class GiftRecord {
  constructor(giftObj) {
    if (giftObj.name === undefined || giftObj.name.length < 3) {
      throw new ValidateError('Nazwa musi zawierać co najmniej 3 znaki');
    }
    if (giftObj.count === undefined || typeof giftObj.count !== 'number') {
      throw new ValidateError('Ilość jest wymagana i wartość musi być liczbą');
    }
    // eslint-disable-next-line no-underscore-dangle
    this.id = giftObj._id;
    this.name = giftObj.name;
    this.count = giftObj.count;
  }

  static async findOne(id) {
    const gift = await db.collection('gifts').findOne({ _id: ObjectId(String(id)) });

    return new GiftRecord(gift);
  }

  static async findAll() {
    const gifts = await db.collection('gifts').find().toArray();
    return gifts.map((gift) => new GiftRecord(gift));
  }

  async insert() {
    const id = await db.collection('gifts').insertOne({
      name: String(this.name),
      count: this.count,
    });
    return id;
  }

  async giftCountUpdate(action) {
    const newCount = action === 'increment' ? this.count + 1 : this.count - 1;
    console.log(newCount);
    await db.collection('gifts').updateOne({ _id: this.id }, { $set: { count: newCount } });
  }

  async isGiftAvailable() {
    const isAvailable = this.count !== 0;
    if (!isAvailable) throw new NoFoundError('Produkt nie dostępny');
    await this.giftCountUpdate('decrement');

    return this.name;
  }
}


