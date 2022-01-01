const children = [{ firstName: 'Michał', gifts: [] }, { firstName: 'Franek', gifts: [] }, { firstName: 'Karolina', gifts: [] }];
const gifts = [{ name: 'kolejka', amount: 10 }, { name: 'klocki', amount: 10 }, { name: 'bączek', amount: 10 }];

const add = () => {
  children.forEach((child) => (
    child.firstName === 'Michał' ? child.gifts.push('kolejka') : null));
};

module.exports = {
  children,
  gifts,
  add,
};
