const { Router } = require('express');

const { Child } = require('../mokData');
const { GiftRecord } = require('../records/GiftRecord');

module.exports = () => {
  const childrenRouter = Router();

  childrenRouter.get('/', async (req, res) => {
    const children = await Child.findAll();
    // console.log(children);
    const gifts = await GiftRecord.findAll();
    res.render('children/list', { children, gifts });
  });

  childrenRouter.post('/:name', async (req, res) => {
    const child = await Child.findOne(req.params.name);
    const gift = await GiftRecord.findOne(req.body.item);
    const [isAvailable, itemName] = await gift.quantityDecrement();
    child.addGift(isAvailable, itemName);

    res.redirect('/children');
  });

  return childrenRouter;
};
