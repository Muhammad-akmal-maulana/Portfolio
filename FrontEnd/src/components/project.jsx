import React, { useState, useEffect } from 'react';
import './style/project.css';
import Dropdown from './fitur/dropdown';
import ProjectUser from './adminPage/projectUser';

function Project() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/project")
            .then(res => res.json())
            .then(data => setProjects(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <section className="section">
            <div className="flex justify-beetween align-item-center">
                <h2 className='fade-in'>Project</h2>
                <Dropdown
                    label="Filter"
                    className='fade-in'
                    contentClassName="drop-absolute"
                    icon={<i className='bi bi-sliders'></i>} //ganti icon
                >
                    <button
                        onClick={() => setActiveCategory("all")}
                        className='project-drop'
                    >All</button>
                    <button
                        onClick={() => setActiveCategory("pkl")}
                        className='project-drop'
                    >PKL</button>
                    <button
                        onClick={() => setActiveCategory("non-pkl")}
                        className='project-drop'
                    >Non Pkl</button>
                </Dropdown>
            </div>

            <div className="project-container flex  ">

                {projects.length > 0 ? (
                    projects.map(project => (
                        <ProjectUser key={project._id} project={project}/>
                    ))
                ): (
                    <p>Tidak Ada Project</p>
                )}

            </div>
        </section>
    );
}

export default Project;