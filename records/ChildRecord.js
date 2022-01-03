const children = [{ firstName: 'Michał', gifts: [] }, { firstName: 'Franek', gifts: [] }, { firstName: 'Karolina', gifts: [] }];

class Child {
  constructor(name, gifts = []) {
    this.firstName = name;
    this.gifts = gifts;
  }

  static async findOne(name) {
    const foundChild = children.filter((child) => child.firstName === name)[0];
    console.log(foundChild);
    return new Child(foundChild.firstName, foundChild.gifts);
  }

  static async findAll() {
    return children.map(({ firstName, gifts }) => new Child(firstName, gifts));
  }

  addGift = (isAvailable, itemName) => {
    if (isAvailable) {
      this.gifts.push(itemName);
    } else {
      console.error('produkt niedostępny');
    }
  };
}

module.exports = {
  Child,
  children,
};
