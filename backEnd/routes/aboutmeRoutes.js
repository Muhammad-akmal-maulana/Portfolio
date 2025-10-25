import express from 'express';
import { getAboutme, createAboutme, updateAboutme } from '../controllers/aboutmeController.js';

const router = express.Router();

router.get('/', getAboutme);
router.post('/', createAboutme);
router.put('/:id', updateAboutme);

export default router;
