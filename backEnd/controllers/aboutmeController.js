import Aboutme from "../models/aboutmeModel.js";

export const getAboutme = async (req, res) => {
	try {
		const doc = await Aboutme.findOne().lean();
		res.json(doc || {});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
}

export const updateAboutme = async (req, res) => {
	try {
		const { id } = req.params;
		if (req.file) req.body.image = req.file.filename;
		const update = await Aboutme.findByIdAndUpdate(id, req.body, { new: true });
		if (!update) return res.status(404).json({ message: 'Not found' });
		
		res.json(update);
	} catch (err) {
		console.error(err);
		res.status(400).json({ message: 'Invalid data', error: err.message });
	}
}

export const createAboutme = async (req, res) => {
	try {
		if (req.file) req.body.image = req.file.filename;
		const created = await Aboutme.create(req.body);
		res.status(201).json(created);
	} catch (err) {
		console.error(err);
		res.status(400).json({ message: 'Gagal membuat aboutme', error: err.message });
	}
}