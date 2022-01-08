const { Router } = require('express');

const { Child } = require('../records/ChildRecord');
const { GiftRecord } = require('../records/GiftRecord');

module.exports = () => {
  const childrenRouter = Router();

  childrenRouter.get('/', async (req, res) => {
    const children = await Child.findAll();
    // console.log(children);
    const gifts = await GiftRecord.findAll();
    res.render('children/list', { children, gifts });
  });

  childrenRouter.post('/', async (req, res) => {
    const { newChild } = req.body;
    await Child.addNew(newChild);
    res.redirect('/children');
  });

  childrenRouter.post('/:id/gifts', async (req, res) => {
    const child = await Child.findOne(req.params.name);
    const gift = await GiftRecord.findOne(req.body.item);
    if (gift) {
      const [isAvailable, itemName] = await gift.quantityDecrement();
      child.addGift(isAvailable, itemName);
    } else throw new Error('Nie ma takiego przedmiotu');

    res.redirect('/children');
  });

  return childrenRouter;
};
