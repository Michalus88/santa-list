const { v4: uuid } = require('uuid');

const { pool } = require('../config/mariaDb');

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
