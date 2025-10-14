import express from 'express';

import { LoginAdmin, verifyAdmin } from "../controllers/adminController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/login', LoginAdmin);
router.get('/verify', verifyToken, verifyAdmin);


export default router;