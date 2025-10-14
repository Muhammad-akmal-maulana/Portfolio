import express from 'express';
import multer from 'multer';

import {
    getAllProjects,
    createProject,
    updateProject,
    deleteProject
} from '../controllers/projectController.js'


// Konfigurasi multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });
const router = express.Router();

router.get('/', getAllProjects);
router.post('/', upload.single("image"), createProject);
router.put('/:id', upload.single("image"), updateProject);
router.delete('/:id', deleteProject);

export default router;