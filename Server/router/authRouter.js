import express from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import { register } from '../controller/auth.js';
const router = express.Router();

router.post('/register', asyncHandler(register))

export default router;