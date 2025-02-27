import express from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import { finalizeLogin_Oauth, handleCallback_Oauth, initiateLogin_Oauth, login, register } from '../controller/auth.js';
const router = express.Router();

router.post('/register', asyncHandler(register))
router.post('/login', asyncHandler(login))


router.get("/login/:provider", asyncHandler(initiateLogin_Oauth));
router.get("/login/:provider/callback", asyncHandler(handleCallback_Oauth), asyncHandler(finalizeLogin_Oauth));



export default router;