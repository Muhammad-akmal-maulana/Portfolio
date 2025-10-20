import React, { useState, useEffect } from 'react';
import './style/project.css';
import ProjectUser from './adminPage/projectUser';
import { Link } from 'react-router-dom';

function Project() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/project")
            .then(res => res.json())
            .then(data => setProjects(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <section className="section">
            <h2>Projects</h2>
            <div className="project-subcontainer">

                {projects.length > 0 ? (
                    // show only up to 4 projects; mark the 4th with class 'last-project'
                    projects.slice(0, 4).map((project, idx) => (
                        <div 
                            key={project._id} 
                            className={
                                idx === 4 ? 
                                'last-project flex justify-center align-item-center' : 
                                'regular flex justify-center align-item-center'
                            }>
                            <ProjectUser project={project} />
                        </div>
                    ))
                ) : (
                    <p>Tidak Ada Project</p>
                )}

                <Link to="/projectPage" className="see-more flex align-item-center justify-center">
                    <div className="flex blue-button">
                        <p>See More</p>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="16" 
                            fill="currentColor" 
                            className="bi bi-chevron-right" 
                            viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                        </svg>
                    </div>
                </Link>
            </div>
        </section>
    );
}

export default Project;