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

    return (
        <div className="project-card">
            {project.image && <img src={project.image} alt={project.title} />}
            <h4>{project.title}</h4>
            <p>{project.description}</p>
            <button onClick={() => onEdit(project)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default ProjectAdmin;
