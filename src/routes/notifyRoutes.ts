import express from 'express';
import { sendOverdueEmail } from '../controllers/notifyController';

const router = express.Router();

router.post('/send-overdue-email', sendOverdueEmail);

export default router;
