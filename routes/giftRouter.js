const { Router } = require('express');

const { Child } = require('../records/ChildRecord');
const { GiftRecord } = require('../records/GiftRecord');

module.exports = () => {
  const giftRouter = Router();

  giftRouter.get('/', async (req, res) => {
    const gifts = await GiftRecord.findAll();

    res.render('gift/list', { gifts });
  });

  giftRouter.post('/', async (req, res) => {
    const { newChild } = req.body;
    await Child.addNew(newChild);
    res.redirect('/gifts');
  });

  return giftRouter;
};
