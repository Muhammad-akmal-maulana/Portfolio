import React from 'react';

function ProjectUser({ project }) {
    return (
        <div className="project-card">
            {project.image && <img src={project.image} alt={project.title} />}
            <h4>{project.title}</h4>
            <p>{project.description}</p>
        </div>
    );
}

export default ProjectUser;