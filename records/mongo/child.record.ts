import { db, ObjectId } from '../../config/mongoDb';
import { NoFoundError, ValidateError } from '../../utils/errors';

interface PayloadChildRecord {
  _id?:string;
  name:string;
  gifts:string[];
}

export class ChildRecord {
  id?:string;
  name:string;
  gifts:string[];
  constructor(obj:PayloadChildRecord) {
    if (obj.name === undefined || obj.name.length < 3) {
      throw new ValidateError('Imię musi zawierać co najmniej 3 znaki');
    }
    // eslint-disable-next-line no-underscore-dangle
    this.id = obj._id;
    this.name = obj.name;
    this.gifts = obj.gifts;
  }

  static async findOne(id:string) {
    const child = await db.collection('children').findOne({ _id: new ObjectId(String(id)) })as unknown as PayloadChildRecord;
    if (child.length === 0) {
      throw new NoFoundError(`Nie istnieje dziecko o podanym id :${id}`);
    }

    return new ChildRecord(child);
  }

  static async findAll() {
    const children = await db.collection('children').find().toArray();

    return children.map((obj) => new ChildRecord(obj));
  }

  async insert() {
    const id = await db.collection('children').insertOne({ name: this.name, gifts: [] });

    return id;
  }

  addGift = async (name) => {
    await db.collection('children').updateOne({ _id: ObjectId(String(this.id)) }, { $push: { gifts: name } });
  }
}

