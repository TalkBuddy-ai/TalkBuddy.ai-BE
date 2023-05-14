import express from 'express';
// import { transcriptions, transcribe } from '../controllers/transcriptions.controller.js';
import { transcribe } from '../controllers/transcribe.controller.js';

const router = express.Router();

router.post('/', transcribe);

export default router;
