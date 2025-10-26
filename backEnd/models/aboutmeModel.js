import mongoose, { Types } from 'mongoose';

const aboutmeSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    },

    deskripsi: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

}, { timestamps: true })

const Aboutme = mongoose.model("Aboutme", aboutmeSchema);
export default Aboutme;