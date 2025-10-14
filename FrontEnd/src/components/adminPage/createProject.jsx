import React from 'react';
 

function CreateProject({ onCreated }) {
    async function handleCreate(formData) {
        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("kategori", formData.kategori);
        if (formData.image) data.append("image", formData.image);

        try {
            await fetch("http://localhost:5000/api/project", {
                method: "POST",
                body: data,
            });
            onCreated();
        } catch (err) {
            console.error("Gagal membuat project:", err);
        }
    }

    return (
        <div>
            <h3>Buat Project Baru</h3>
            <ProjectForm onSubmit={handleCreate} />
        </div>
    );
}

export default CreateProject;