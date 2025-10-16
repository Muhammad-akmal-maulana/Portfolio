import React from 'react';

function ProjectUser({ project }) {
    if (!project) return null;

    const imageUrl = project.image //menampilkan image yang sudah ditampilkan pada card
        ? `http://localhost:5000/uploads/${project.image}`
        : "";

    return (
        <div className="project-card">
            <h4>{project.title}</h4>
            {project.image && (
                <img 
                    src={imageUrl}
                    alt={project.title} 
                    className='project-image'
                />
            )}
            <p>{project.deskripsi}</p>
        </div>
    );
}

export default ProjectUser;