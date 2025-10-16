import React from 'react';

function ProjectAdmin({ project, onEdit, onDeleted }) {
    async function handleDelete() {
        if (window.confirm("Yakin ingin menghapus project ini?")) {
            try {
                await fetch(`http://localhost:5000/api/project/${project._id}`, {
                    method: "DELETE",
                });
                onDeleted();
            } catch (err) {
                console.error("Gagal menghapus project:", err);
            }
        }
    }

    const imageUrl = project.image //menampilkan image yang sudah ditampilkan pada card
        ? `http://localhost:5000/uploads/${project.image}`
        : "";

    return (
        <table className="">
            <h4>{project.title}</h4>
            {project.image && (
                <img 
                    src={imageUrl} 
                    alt={project.title} 
                    className='project-image'
                />
            )}
            <p>{project.deskripsi}</p>
            <p>{project.kategori}</p>

            <button onClick={() => onEdit(project)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </table>
    );
}

export default ProjectAdmin;
