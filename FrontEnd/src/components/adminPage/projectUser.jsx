import React from 'react';
import '../style/projectsPage.css'

function ProjectUser({ project }) {
    if (!project) return null;

    const imageUrl = project.image //menampilkan image yang sudah ditampilkan pada card
        ? `http://localhost:5000/uploads/${project.image}`
        : "";

    function batasiKata(text, limit = 21) {
        if (!text) return "";

        text = String(text).trim();
        if (text.length <= limit) return text;
        return text.slice(0, limit) + "…";
    }

    return (
        <div className="project-card flex align-item-center">
            <div className="">
                {project.image && (
                    <img
                        src={imageUrl}
                        alt={project.title}
                        className='project-image'
                    />
                )}
                <div className="sub-project-card flex align-item-center justify-beetween">
                    <div className="">
                        <h3>{batasiKata(project.title, 21)}</h3>
                        <p className='deskripsi'>{batasiKata(project.deskripsi, 20)}</p>
                    </div>
                        <p className={`kategori ${project.kategori?.toLowerCase() === 'pkl' ? 'pkl blue-button' : 'non-pkl'}`}>
                            {project.kategori}
                        </p>
                </div>
            </div>
        </div>
    );
}

export default ProjectUser;