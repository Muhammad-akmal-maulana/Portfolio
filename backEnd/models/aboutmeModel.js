import mongoose, { Types } from 'mongoose';

const aboutmeSchema = new mongoose.Schema({
    deskripsi: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

})

const Aboutme = mongoose.model("Aboutme", aboutmeSchema);
export default Aboutme;