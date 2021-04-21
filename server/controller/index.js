import express from 'express';
import { getDefaultController } from './default';

const getRoutes = () => {
  const router = express.Router();

  router.use((req, res, next) => {
    'use strict';
    res.header('Access-Control-Allow-Origin', req.get('origin'));
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

  router.use('/api', require('./api/'));
  router.use("/", getDefaultController());

  return router;
};

export { getRoutes };
