import { v4 as uuid } from "uuid";
import {FieldPacket} from "mysql2";

import { pool } from "../config/mariaDb";
import { NoFoundError, ValidateError } from "../utils/errors";
import { IncDec, Gift } from "../interfaces/gift";



type GiftRecordData = [GiftRecord[],FieldPacket[]];

export class GiftRecord {
  id?: string;
  name: string;
  count: number;
  constructor(giftObj: Gift) {
    if (giftObj.name === undefined || giftObj.name.length < 3) {
      throw new ValidateError("Nazwa musi zawierać co najmniej 3 znaki");
    }
    if (giftObj.count === undefined || typeof giftObj.count !== "number") {
      throw new ValidateError("Ilość jest wymagana i wartość musi być liczbą");
    }
    this.id = giftObj.id;
    this.name = giftObj.name;
    this.count = giftObj.count;
  }

  static async findOne(id: string):Promise<GiftRecord | null> {
    const [[gift]] = await pool.query(
      "SELECT * FROM `gifts` WHERE `id`=:id ;",
      { id }
    )as GiftRecordData;
    if (!gift) throw new NoFoundError(`Nie ma prezentu o podanym ${id}`);

    return new GiftRecord(gift);
  }

  static async findAll():Promise<GiftRecord[] | null> {
    const [gifts] = await pool.query("SELECT * FROM `gifts`;") as GiftRecordData;

    return gifts.map((gift: Gift) => new GiftRecord(gift));
  }

  async insert():Promise<string> {
    if (!this.id) {
      this.id = uuid();
    }
    await pool.execute(
      "INSERT INTO `gifts`(`id`,`name`,`count`) VALUES(:id,:name,:count) ",
      {
        id: this.id,
        name: this.name,
        count: this.count,
      }
    );

    return this.id;
  }

  async giftCountUpdate(action: IncDec) {
    const newCount = action === "increment" ? this.count + 1 : this.count - 1;
    await pool.execute("UPDATE `gifts` SET `count` = :count WHERE `id`=:id ;", {
      count: newCount,
      id: this.id,
    });
  }

  async isGiftAvailable() {
    const isAvailable = this.count !== 0;
    if (!isAvailable) throw new Error("Produkt nie dostępny");
    await this.giftCountUpdate("decrement");

    return this.id;
  }
}
