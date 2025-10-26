import express from 'express';
import multer from 'multer';
import { getAboutme, updateAboutme, createAboutme } from '../controllers/aboutmeController.js';

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, 'uploads/'),
	filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

const router = express.Router();

router.get('/', getAboutme);
router.post('/', upload.single('image'), createAboutme);
router.put('/:id', upload.single('image'), updateAboutme);

export default router;
