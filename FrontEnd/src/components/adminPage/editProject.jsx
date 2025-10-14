import React from 'react';
import ProjectForm from '../fitur/projectForm';

function EditProject({ project, onCancel, onUpdated }) {
    async function handleUpdate(formData) {
        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        if (formData.image) data.append("image", formData.image);

        try {
            await fetch(`http://localhost:5000/api/project/${project._id}`, {
                method: "PUT",
                body: data,
            });
            onUpdated();
            onCancel();
        } catch (err) {
            console.error("Gagal mengupdate project:", err);
        }
    }

    return (
        <div>
            <h3>Edit Project</h3>
            <ProjectForm onSubmit={handleUpdate} initialData={project} />
            <button onClick={onCancel}>Batal</button>
        </div>
    );
}

export default EditProject;
