import express from 'express';
import multer from 'multer';
import { getAllSkill, createSkill, updateSkill, deleteSkill } from '../controllers/skillController.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });
const router = express.Router();

router.get('/', getAllSkill);
router.post('/', upload.single('image'), createSkill);
router.put('/:id', upload.single('image'), updateSkill);
router.delete('/:id', deleteSkill);

export default router;