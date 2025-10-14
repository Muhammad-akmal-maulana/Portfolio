import React, { useState, useEffect } from 'react';
import Dropdown from './fitur/dropdown';
import './style/project.css';
import FadeInAnimation from './fitur/fadeIn';
import ProjectCard from './projectCard';

function Project() {
    const [activeCategory, setActiveCategory] = useState("all");

    return (
        <>
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

                <div className="project-container">

                    <FadeInAnimation trigger={activeCategory}>
                        {(activeCategory === 'pkl' || activeCategory === 'all') && (
                            <div className="project fade-in">
                                <img src="/icon/adobe-illustrator.png" alt="" />
                                <p>judul</p>
                            </div>
                        )}

                        {(activeCategory === 'non-pkl' || activeCategory === 'all') && (
                            <div className="project fade-in">
                                <img src="/icon/adobe-illustrator.png" alt="" />
                                <p>judul</p>
                            </div>
                        )}
                    </FadeInAnimation>

                    <ProjectCard/>

                </div>
            </section>
        </>
    );
}

export default Project;