import Project from "../models/projectModel.js";
import fs from 'fs/promises';
import path from 'path';

// get semua project
export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil project' });
    }
};

// buat project baru
export const createProject = async (req, res) => {
    try {
        const { title, deskripsi, kategori } = req.body;
        const image = req.file ? req.file.filename : null;

        const project = new Project({
            title,
            deskripsi,
            kategori,
            image,
        });

        await project.save();
        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// update project
export const updateProject = async (req, res) => {
    try {
        const { title, kategori } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : undefined;

        const updated = await Project.findByIdAndUpdate(
            req.params.id,
            { title, kategori, ...(image && { image }) },
            { new: true }
        );

        res.status(200).json({ message: "Project diperbarui", project: updated });
    } catch (err) {
        res.status(500).json({ message: 'Gagal mengupdate project' });
    }
};

// hapus project
export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id);
        if (!project) return res.status(404).json({ error: "Project not found" });

        if (project.image) {
            try {
                const filePath = path.resolve("uploads", project.image);
                await fs.unlink(filePath);
            } catch (err) {
                // kalau file nggak ada atau gagal, log tapi tetap lanjut hapus DB
                console.warn("Gagal menghapus file:", err.message);
            }
        }

        await Project.findByIdAndDelete(id);
        res.json({ message: 'Project dihapus' });
    } catch (err) {
        res.status(500).json({ message: 'Gagal menghapus project' });
    }
};
