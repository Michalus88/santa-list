import { v4 as uuid } from "uuid";
import { NoFoundError, ValidateError } from "../utils/errors";
import {FieldPacket} from "mysql2"

import { pool } from "../config/mariaDb";
import { formatData, ChildEntity } from "../utils/group-function";

type ChildrenRecordsData =  [ChildEntity[],FieldPacket[]];

export interface Payload {
  id: string;
  name: string;
  gifts: string[];
}

export class ChildRecord {
  id: string;
  name: string;
  gifts: string[];
  constructor(obj: Payload) {
    if (obj.name === undefined || obj.name.length < 3) {
      throw new ValidateError("Imię musi zawierać co najmniej 3 znaki");
    }
    this.id = obj.id;
    this.name = obj.name;
    this.gifts = obj.gifts;
  }

  static async findOne(id: string):Promise<ChildRecord> {

    let [child] = await pool.query(
      'SELECT `children`.id,`children`.`FirstName` AS "firstName",`gifts`.`name` ' +
        "FROM `children` " +
        "LEFT JOIN `children_gifts` ON `children`.`id`=`children_gifts`.`childId`" +
        "LEFT JOIN `gifts` ON `gifts`.`id`=`children_gifts`.`giftId`" +
        "WHERE `children`.`id`=:id;",
      { id }
    )as ChildrenRecordsData;

    if (child.length === 0) {
      throw new NoFoundError(`Nie istnieje dziecko o podanym id :${id}`);
    }

    return new ChildRecord(formatData(child, "firstName")[0]);
  }

  static async findAll():Promise<ChildRecord[]> {
    const [childrenGifts] = await pool.query(
      'SELECT `children`.id,`children`.`FirstName` AS "firstName",`gifts`.`name` ' +
        "FROM `children` " +
        "LEFT JOIN `children_gifts` ON `children`.`id`=`children_gifts`.`childId`" +
        "LEFT JOIN `gifts` ON `gifts`.`id`=`children_gifts`.`giftId`;"
    )as  ChildrenRecordsData;

    return formatData(childrenGifts, "firstName").map(
      (obj) => new ChildRecord(obj)
    );
  }

  async insert():Promise<string> {
    if (!this.id) {
      this.id = uuid();
    }
    await pool.execute(
      "INSERT INTO `children`(`id`,`firstName`) VALUES(:id,:name) ",
      { id: this.id, name: this.name }
    );
    return this.id;
  }

  addGift = async (giftId: string):Promise<void> =>  {
    await pool.execute(
      "INSERT INTO `children_gifts`(childId,giftId) VALUES(:childId,:giftId) ;",
      { childId: this.id, giftId }
    );
  };
}

