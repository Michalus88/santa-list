import { v4 as uuid } from "uuid";
import { NoFoundError, ValidateError } from "../utils/errors";

import { pool } from "../config/mariaDb";
import { formatData } from "../utils/group-function";
import { Gift } from "./GiftRecord";

interface Payload {
  id: string;
  name: string;
  gifts: Gift[];
}

class ChildRecord {
  id: string;
  name: string;
  gifts: Gift[];
  constructor(obj: Payload) {
    if (obj.name === undefined || obj.name.length < 3) {
      throw new ValidateError("Imię musi zawierać co najmniej 3 znaki");
    }
    this.id = obj.id;
    this.name = obj.name;
    this.gifts = obj.gifts;
  }

  static async findOne(id: string) {
    const [child] = await pool.query(
      'SELECT `children`.id,`children`.`FirstName` AS "firstName",`gifts`.`name` ' +
        "FROM `children` " +
        "LEFT JOIN `children_gifts` ON `children`.`id`=`children_gifts`.`childId`" +
        "LEFT JOIN `gifts` ON `gifts`.`id`=`children_gifts`.`giftId`" +
        "WHERE `children`.`id`=:id;",
      { id }
    );
    if (child.length === 0) {
      throw new NoFoundError(`Nie istnieje dziecko o podanym id :${id}`);
    }

    return new ChildRecord(formatData(child, "firstName")[0]);
  }

  static async findAll() {
    const [childrenGifts] = await pool.query(
      'SELECT `children`.id,`children`.`FirstName` AS "firstName",`gifts`.`name` ' +
        "FROM `children` " +
        "LEFT JOIN `children_gifts` ON `children`.`id`=`children_gifts`.`childId`" +
        "LEFT JOIN `gifts` ON `gifts`.`id`=`children_gifts`.`giftId`;"
    );

    return formatData(childrenGifts, "firstName").map(
      (obj) => new ChildRecord(obj)
    );
  }

  async insert() {
    if (!this.id) {
      this.id = uuid();
    }
    await pool.execute(
      "INSERT INTO `children`(`id`,`firstName`) VALUES(:id,:name) ",
      { id: this.id, name: this.name }
    );
    return this.id;
  }

  addGift = async (giftId: string) => {
    await pool.execute(
      "INSERT INTO `children_gifts`(childId,giftId) VALUES(:childId,:giftId) ;",
      { childId: this.id, giftId }
    );
  };
}

module.exports = {
  ChildRecord,
};
