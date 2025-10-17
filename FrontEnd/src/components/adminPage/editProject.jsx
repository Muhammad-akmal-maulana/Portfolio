import React from 'react';
import ProjectForm from '../fitur/projectForm';

function EditProject({ project, onCancel, onUpdated }) {
    async function handleUpdate(formData) {
        const data = new FormData();
        data.append("title", formData.title);
        data.append("deskripsi", formData.deskripsi);
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
            <div className="admin-title flex justify-beetween align-item-center">
                <h1>Edit Project</h1>
                <button 
                    onClick={onCancel}
                    className='red-button batal box-shadow'
                >Batal</button>
            </div>
            <ProjectForm onSubmit={handleUpdate} initialData={project} />
        </div>
    );
}

export default EditProject;
