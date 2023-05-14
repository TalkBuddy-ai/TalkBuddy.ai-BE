import express from 'express';
import chatRoute from './chat.route.js';
import transcriptionsRoute from './transcribe.route.js'

const router = express.Router();

router.use('/chats', chatRoute);

router.use('/transcribe', transcriptionsRoute);

export default router;