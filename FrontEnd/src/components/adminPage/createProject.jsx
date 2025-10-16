import React, { useState } from 'react';
import ProjectForm from '../fitur/projectForm.jsx';

function CreateProject({ onCreated, onCancel }) {
    const [resetForm, setResetForm] = useState(false);

    async function handleCreate(formData) {
        const data = new FormData();
        data.append("title", formData.title);
        data.append("deskripsi", formData.deskripsi);
        data.append("kategori", formData.kategori);
        if (formData.image) data.append("image", formData.image);

        try {
            const res = await fetch("http://localhost:5000/api/project", {
                method: "POST",
                body: data,
            });
            if (!res.ok) throw new Error("Gagal input gambar");
            setResetForm(true); // trigger reset
            onCreated();
            onCancel();
        } catch (err) {
            alert("Gagal input gambar");
        } finally {
            setTimeout(() => setResetForm(false), 100); // reset trigger
        }
    }

    return (
        <div>
            <h3>Buat Project Baru</h3>
            <ProjectForm onSubmit={handleCreate} resetForm={resetForm} />
            <button onClick={() => onCancel && onCancel()}>Batal</button>
        </div>
    );
}

export default CreateProject;