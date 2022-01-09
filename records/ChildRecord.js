const { v4: uuid } = require('uuid');

const { pool } = require('../config/mariaDb');
const { groupByKey } = require('../utils/group-function');

class Child {
  constructor(name, gifts = []) {
    if (name === undefined || name.length < 3) {
      throw new Error('Imię musi zawierać co najmniej 3 znaki');
    }
    this.firstName = name;
    this.gifts = gifts;
  }

  static async findOne() {

  }

  static async findAll() {
    const [children] = await pool.query('SELECT DISTINCT `FirstName` FROM `children`;');
    const [childrenGifts] = await pool.query('SELECT `children`.`FirstName` AS "firstName",`gifts`.`name` FROM `children` LEFT JOIN `children_gifts` ON `children`.`id`=`children_gifts`.`childId`LEFT JOIN `gifts` ON `gifts`.`id`=`children_gifts`.`giftId`');
    // console.log(children);
    console.log(Object.values(groupByKey(childrenGifts, 'firstName')));

    return Object.values(groupByKey(childrenGifts, 'firstName'));
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
  Child,
};
