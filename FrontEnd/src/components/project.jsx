import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import './style/project.css';
import ProjectUser from './projects/projectUser';
import { Link } from 'react-router-dom';

function Project() {
    const [projects, setProjects] = useState([]);
    const lastProjectRef = useRef(null);
    const [lastProjectHeight, setLastProjectHeight] = useState(0);

    useEffect(() => {
        fetch("http://localhost:5000/api/project")
            .then(res => res.json())
            .then(data => setProjects(data))
            .catch(err => console.error(err));
    }, []);

    useLayoutEffect(() => {
        const el = lastProjectRef.current;
        if (!el) return;

        const getTargetHeight = () => {
            const rect = el.getBoundingClientRect();
            return Math.ceil(rect.height);
        };

        const update = () => {
            const h = getTargetHeight();
            setLastProjectHeight(h);
            console.debug('[Project] measured last-project height:', h);
        };

        update();

        let ro;
        if (typeof ResizeObserver !== 'undefined') {
            ro = new ResizeObserver(update);
            ro.observe(el);
            const inner = el.querySelector('.project-card');
            if (inner) ro.observe(inner);
        } else {
            window.addEventListener('resize', update);
        }

        return () => {
            if (ro) ro.disconnect();
            else window.removeEventListener('resize', update);
        };
    }, [projects]);

    return (
        <section className="section project-section" id='project-page'>
            <h1 className='fade-in'>Projects</h1>
            <p className='fade-in'>Project Yang Saya Kerjakan Semalama Waktu PKL</p>
            <div className="project-subcontainer fade-in">

                {projects.length > 0 ? (
                    // 4 adalah jumlah cardnya
                    projects.slice(0, 4).map((project, idx) => (
                        <div 
                            key={project._id}
                            ref={idx === 3 ? lastProjectRef : null}
                            className={
                                idx === 3 ? 
                                'last-project flex justify-center align-item-center' : 
                                'regular flex justify-center align-item-center'
                            }
                            >
                            {/* disable popup for small cards on the projects list */}
                            <ProjectUser project={project} enablePopup={false} />
                        </div>
                    ))
                ) : (
                    <p>Tidak Ada Project</p>
                )}

                <Link 
                    to="/projectPage" 
                    className="see-more flex align-item-center justify-center"
                >
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