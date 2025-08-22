import express from 'express';
import { trackVisitor, getVisitors } from '../controllers/trackController.js';

const serviceRouter = express.Router();

serviceRouter.get('/status', (req, res) => {
  res.json({ status: 'Service is running' });
});
serviceRouter.post('/track-visitor', trackVisitor);
serviceRouter.get('/get-visitor', getVisitors);

export default serviceRouter;