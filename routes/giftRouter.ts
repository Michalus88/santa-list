import { catchAsync } from '../utils/errors';
import { Router } from 'express';
// import { GiftRecord } from '../records/GiftRecord'; //mariaDB
import { GiftRecord } from '../records/mongo/gift.record'; // mongoDB

export default() => {
  const giftRouter = Router();

  giftRouter.get('/', catchAsync(async (req, res) => {
    const gifts = await GiftRecord.findAll();

    res.render('gift/list', { gifts });
  }));

  giftRouter.post('/', catchAsync(async (req, res) => {
    const dataObj = {
      ...req.body,
      count: Number(req.body.count),
    } as GiftRecord;

    const newGiftRecord = new GiftRecord(dataObj);
    await newGiftRecord.insert();

    res.redirect('/gifts');
  }));

  return giftRouter;
};
