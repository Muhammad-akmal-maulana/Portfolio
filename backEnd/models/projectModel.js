import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    
    kategori: {
        type: String,
        enum: ["pkl", "non-pkl"],
        required: true
    },

    deskripsi: {
        type: String,
        default: ""
    },
    
    image: {
        type: String,
        required: true
    },

})

const Project = mongoose.model("Project", projectSchema);
export default Project;