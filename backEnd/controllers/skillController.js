import Skill from "../models/skillModel.js";
import fs from 'fs/promises';
import path from "path";
import { fileURLToPath } from 'url';

// compute uploads folder relative to this file (backEnd/controllers)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '..', 'uploads');

export const getAllSkill = async (req, res) => {
    try {
        const skills = await Skill.find();
        res.json(skills);
    } catch (error) {
        res.status(500).json({ message: 'gagal meengambil skill' });
    }
};

export const createSkill = async (req, res) => {
    try {
        const { title } = req.body;
        const image = req.file ? req.file.filename : null;

        const skill = new Skill({
            title,
            image,
        });

        await skill.save();
        res.status(201).json(skill);
    } catch (error) {
        res.status(500).json({ message: 'gagal membuat skill' });
    }
};

export const updateSkill = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const update = { title };
    if (req.file) update.image = req.file.filename;
    const skill = await Skill.findByIdAndUpdate(id, update, { new: true });
    if (!skill) return res.status(404).json({ message: 'tidak ketemu' });
    res.json(skill);
};

export const deleteSkill = async (req, res) => {
    try {
        const { id } = req.params;
        const skill = await Skill.findById(id);
        if (!skill) return res.status(404).json({ error: 'skill tidak ketemu' });

        if (skill.image) {
            try {
                const filePath = path.join(uploadsDir, skill.image);
                await fs.unlink(filePath);
            } catch (err) {
                // Log a warning but continue deletion of DB document
                console.warn('gagal menghapus file:', err.message)
            }
        }

    // remove the skill document from DB
    await Skill.findByIdAndDelete(id);
    res.json({ message: 'skill dihapus' });
    } catch (error) {
        res.status(500).json({ message: 'gagal update skill' });
    }
};