import React from 'react';
import ProjectForm from '../fitur/projectForm';

function EditProject({ project, onCancel, onUpdated }) {
    async function handleUpdate(formData) {
        const data = new FormData();
        data.append("title", formData.title);
        data.append("deskripsi", formData.deskripsi);
        data.append("kategori", formData.kategori);
        if (formData.image) data.append("image", formData.image);

        // debug: tampilkan semua entry FormData
        for (const pair of data.entries()) console.log(pair[0], pair[1]);

        try {
            const res = await fetch(`http://localhost:5000/api/project/${project._id}`, {
                method: "PUT",
                body: data,
            });
            console.log("response status", res.status);
            const body = await res.text();
            console.log("response body:", body);
            if (!res.ok) throw new Error(body || "Gagal mengupdate project");
            onUpdated && onUpdated();
            onCancel && onCancel();
        } catch (err) {
            console.error(err);
            alert("Gagal mengupdate project");
        }
    }

    return (
        <div className="create-project-container">
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
