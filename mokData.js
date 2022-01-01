const children = [{ firstName: 'Michał', gifts: [] }, { firstName: 'Franek', gifts: [] }, { firstName: 'Karolina', gifts: [] }];
const gifts = [{ name: 'kolejka', amount: 2 }, { name: 'klocki', amount: 10 }, { name: 'bączek', amount: 10 }];

const add = (name, item) => {
  let lack = true;

  gifts.forEach((gift) => (gift.name === item
    ? gift.amount === 0
      ? lack = false : --gift.amount
    : null
  ));
  if (lack) {
    children.forEach((child) => (child.firstName === name ? child.gifts.push(item) : null));
  }
};

module.exports = {
  children,
  gifts,
  add,
};
