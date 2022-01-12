const { Router } = require('express');

const { ChildRecord } = require('../records/ChildRecord');
const { GiftRecord } = require('../records/GiftRecord');

module.exports = () => {
  const childrenRouter = Router();

  childrenRouter.get('/', async (req, res) => {
    const children = await ChildRecord.findAll();
    const gifts = await GiftRecord.findAll();

    res.render('children/list', { children, gifts });
  });

  childrenRouter.post('/', async (req, res) => {
    const newChild = new ChildRecord(req.body);
    await newChild.insert();
    res.redirect('/children');
  });

  childrenRouter.post('/:id/gifts', async (req, res) => {
    const { giftId } = req.body;
    if (giftId === '') return;

    const child = await ChildRecord.findOne(req.params.id);
    const gift = await GiftRecord.findOne(giftId);
    await gift.isGiftAvailable();
    await child.addGift(giftId);

    res.redirect('/children');
  });

  return childrenRouter;
};
