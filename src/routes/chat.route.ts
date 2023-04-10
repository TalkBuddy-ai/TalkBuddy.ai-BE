import express from 'express';
import { chatCompletion, getChat } from '../controllers/chat.controller.js';

const router = express.Router();

router.post('/', chatCompletion);

router.get('/', getChat);

export default router;
