import React, { useState, useRef, useEffect } from 'react';
import '../style/projectsPage.css'

function ProjectUser({ project, enablePopup = true }) {
    const [show, setShow] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (!enablePopup) return; // don't attach listener when popup disabled

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShow(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
        <div className='project-page'>
            <button
                className="project-card flex align-item-center"
                onClick={() => { if (enablePopup) setShow(!show); }}
            >
                <div>
                    {project.image && (
                        <img
                            src={imageUrl}
                            alt={project.title}
                            className='project-image'
                        />
                    )}
                    <div className="sub-project-card flex align-item-center justify-beetween">
                        <div>
                            <h3>{batasiKata(project.title, 18)}</h3>
                            <p className='deskripsi'>{batasiKata(project.deskripsi, 20)}</p>
                        </div>
                        <p className={`kategori ${project.kategori?.toLowerCase() === 'pkl' ? 'pkl blue-button' : 'non-pkl'}`}>
                            {project.kategori}
                        </p>
                    </div>
                </div>
            </button>

            {enablePopup && show && (
                <div className="pop-project" ref={dropdownRef}>
                    <div className="pop-content">

                        <img src={imageUrl} alt={project.title} className="pop-image" />
                        <div className="pop-text">
                            <div className="close-btn">
                                <button
                                    onClick={() => setShow(false)}
                                ><span>✕</span></button>
                            </div>

                            <div className="flex align-item-center justify-beetween">
                                <h3>{project.title}</h3>
                                <p className={`kategori ${project.kategori?.toLowerCase() === 'pkl' ? 'pkl blue-button' : 'non-pkl'}`}>
                                    {project.kategori}
                                </p>
                            </div>
                            <p>{project.deskripsi}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProjectUser;