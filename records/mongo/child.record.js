const { v4: uuid } = require('uuid');
const { NoFoundError, ValidateError } = require('../../utils/errors');

const { db, ObjectId } = require('../../config/mongoDb');

class ChildRecord {
  constructor(obj) {
    if (obj.name === undefined || obj.name.length < 3) {
      throw new ValidateError('Imię musi zawierać co najmniej 3 znaki');
    }
    this.id = obj._id;
    this.name = obj.name;
    this.gifts = obj.gifts;
  }

  static async findOne(id) {
    const child = await db.collection('children').findOne({ _id: ObjectId(String(id)) });
    if (child.length === 0) {
      throw new NoFoundError(`Nie istnieje dziecko o podanym id :${id}`);
    }

    return new ChildRecord(child);
  }

  static async findAll() {
    const children = await db.collection('children').find().toArray();
    // console.log(children);
    return children.map((obj) => new ChildRecord(obj));
  }

  async insert() {
    if (!this.id) {
      this.id = uuid();
    }

    return this.id;
  }

  addGift = async (name) => {
    await db.collection('children').updateOne({ _id: ObjectId(String(this.id)) }, { $push: { gifts: name } });
  }
}
module.exports = {
  ChildRecord,
};
