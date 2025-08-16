import express from 'express';
const router = express.Router();
import { healthCheck } from '../controllers/health.controllers.js';

router.get('/', healthCheck);

export default router;