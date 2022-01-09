const { v4: uuid } = require('uuid');

const { pool } = require('../config/mariaDb');
const { formatData } = require('../utils/group-function');

class ChildRecord {
  constructor(name, gifts = []) {
    if (name === undefined || name.length < 3) {
      throw new Error('Imię musi zawierać co najmniej 3 znaki');
    }
    this.name = name;
    this.gifts = gifts;
  }

  static async findOne(id) {
    const [[child]] = await pool.execute('SELECT * FROM `children` WHERE `id`=:id;', { id });
    const [gifts] = await pool.execute('SELECT `gifts`.`name`, `children`.`firstName` FROM `children` LEFT JOIN `children_gifts` ON `children`.id=`children_gifts`.childId LEFT JOIN `gifts` ON `gifts`.id=`children_gifts`.`giftId` WHERE `childId`=:id ;', { id });
    // console.log(child, gifts);
  }

  static async findAll() {
    const [childrenGifts] = await pool.query(
      'SELECT `children`.`FirstName` AS "firstName",`gifts`.`name` '
        + 'FROM `children` '
        + 'LEFT JOIN `children_gifts` ON `children`.`id`=`children_gifts`.`childId`'
        + 'LEFT JOIN `gifts` ON `gifts`.`id`=`children_gifts`.`giftId`;',
    );
    console.log(formatData(childrenGifts, 'firstName'));
    return formatData(childrenGifts, 'firstName').map((obj) => new ChildRecord(obj.name, obj.gifts));
  }

  static async addNew() {

  }

   addGift = async (isAvailable, itemName) => {
     if (isAvailable) {

     } else {
       throw new Error('Produkt niedostępny');
     }
   };
}

module.exports = {
  ChildRecord,
};
