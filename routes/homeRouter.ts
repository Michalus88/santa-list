import  { Router } from 'express';

export default () => {
  const homeRouter = Router();

  homeRouter.get('/', (req, res) => {
    res.render('home');
  });

  return homeRouter;
};
