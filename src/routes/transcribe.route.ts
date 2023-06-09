import express from 'express';
import { transcribe } from '../controllers/transcribe.controller.js';

const router = express.Router();

router.post('/', transcribe);

export default router;
