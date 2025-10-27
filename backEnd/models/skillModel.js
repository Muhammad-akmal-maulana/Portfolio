import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },
})

const Skill = mongoose.model('skill', skillSchema);
export default Skill;