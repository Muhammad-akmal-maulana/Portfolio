import React, { useState, useEffect } from 'react';
import '../components/style/projectsPage.css';
import ProjectUser from '../components/projects/projectUser';
import { Link } from 'react-router-dom';

function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [filter, setFilter] = useState('all');

    // normalize kategori and filter value to be case-insensitive and trim spaces
    const normalize = str => (str || '').toString().trim().toLowerCase();
    const visibleProjects = filter === 'all'
        ? projects
        : projects.filter(p => normalize(p.kategori) === normalize(filter));

    useEffect(() => {
        fetch("http://localhost:5000/api/project")
            .then(res => res.json())
            .then(data => setProjects(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <nav className="navbar-android">
                <h2>Project</h2>

                <div className="filter-container flex">
                    <button
                        onClick={() => setFilter('pkl')}
                        aria-pressed={filter === 'pkl'}
                    ><p>PKL</p></button>
                    <button
                        onClick={() => setFilter('non-pkl')}
                        aria-pressed={filter === 'non-pkl'}
                    ><p>Non PKL</p></button>
                    <button
                        onClick={() => setFilter('all')}
                        aria-pressed={filter === 'all'}
                    ><p>All</p></button>
                </div>

                <Link
                    to='/'
                    className='red-button back flex align-item-center'
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        fill="currentColor"
                        className="bi bi-chevron-left"
                        viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                    </svg>

                    <p>Back</p>
                </Link>
            </nav>
            <section className="projects-page">


                <div className="projectPage-container">
                    {visibleProjects && visibleProjects.length > 0 ? (
                        visibleProjects.map((project, idx) => (
                            <ProjectUser
                                key={project._id || project.id || idx}
                                project={project}
                            />
                        ))
                    ) : (
                        <p>Tidak Ada Project</p>
                    )}
                </div>
            </section>
        </>
    );
}

export default ProjectsPage;