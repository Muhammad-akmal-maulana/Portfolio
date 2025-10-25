import Aboutme from "../models/aboutmeModel";

export const getAboutme = async (req, res) => {
	try {
		const doc = await Aboutme.findOne().lean();
		res.json(doc || {});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
}

export const createAboutme = async (req, res) => {
	try {
		const { deskripsi, image } = req.body;
		const created = await Aboutme.create({ deskripsi, image });
		res.status(201).json(created);
	} catch (err) {
		console.error(err);
		res.status(400).json({ message: 'Invalid data', error: err.message });
	}
}

export const updateAboutme = async (req, res) => {
	try {
		const { id } = req.params;
		const update = await Aboutme.findByIdAndUpdate(id, req.body, { new: true });
		if (!update) return res.status(404).json({ message: 'Not found' });
		res.json(update);
	} catch (err) {
		console.error(err);
		res.status(400).json({ message: 'Invalid data', error: err.message });
	}
}