const { Router } = require('express');

const { GiftRecord } = require('../records/GiftRecord');

module.exports = () => {
  const giftRouter = Router();

  giftRouter.get('/', async (req, res) => {
    const gifts = await GiftRecord.findAll();

    res.render('gift/list', { gifts });
  });

  giftRouter.post('/', async (req, res) => {
    await GiftRecord.add(req.body.giftName, Number(req.body.quantity));
    res.redirect('/gifts');
  });

  return giftRouter;
};
