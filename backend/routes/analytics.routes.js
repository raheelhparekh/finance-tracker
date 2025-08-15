import express from 'express';
import { getMonthlySummary, getCategoryBreakdown } from '../controllers/analytics.controllers.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/monthly-summary', protect, getMonthlySummary);
router.get('/category-breakdown', protect, getCategoryBreakdown);

export default router;