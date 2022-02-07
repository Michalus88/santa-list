const { Router } = require('express');

// const { GiftRecord } = require('../records/GiftRecord'); //mariaDB
const { GiftRecord } = require('../records/mongo/gift.record'); // mongoDB
const { catchAsync } = require('../utils/errors');

module.exports = () => {
  const giftRouter = Router();

  giftRouter.get('/', catchAsync(async (req, res) => {
    const gifts = await GiftRecord.findAll();

    res.render('gift/list', { gifts });
  }));

  giftRouter.post('/', catchAsync(async (req, res) => {
    const dataObj = {
      ...req.body,
      count: Number(req.body.count),
    };

    const newGiftRecord = new GiftRecord(dataObj);
    await newGiftRecord.insert();

    res.redirect('/gifts');
  }));

  return giftRouter;
};
