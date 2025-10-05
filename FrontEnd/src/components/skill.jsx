import React, { useEffect, useRef, useState } from 'react';
import Dropdown from './fitur/dropdown';
import './style/skill.css';
import FadeInAnimation from './fitur/fadeIn';

function Skill() {
    const [activeCategory, setActiveCategory] = useState("design-graphic");

    return (
        <section className='skill-section section'>
            <h2 className='fade-in'>Skill</h2>
            <div className="skill-container flex justify-beetween">
                <div className="skill-kategori">
                    <div className="sub-kategori flex align-item-center fade-in">
                        <button
                            onClick={() => setActiveCategory("design-graphic")}
                        >Graphic Design</button>
                        <i className="bi bi-chevron-right"></i>
                    </div>

                    <div className="sub-kategori flex align-item-center fade-in">
                        <button
                            onClick={() => setActiveCategory("digital-illustration")}
                        >Digital Illustration</button>
                        <i className="bi bi-chevron-right"></i>
                    </div>

                    <Dropdown
                        label="Fullstack Web"
                        className='skill-dropdown'
                        contentClassName='drop-relative'
                    >
                        <div className="flex align-item-center justify-beetween">
                            <button
                                onClick={() => setActiveCategory("front-end")}
                            >Front End</button>
                            <i className="bi bi-chevron-right"></i>
                        </div>
                        <div className="flex align-item-center justify-beetween">
                            <button
                                onClick={() => setActiveCategory("back-end")}
                            >Back End</button>
                            <i className="bi bi-chevron-right"></i>
                        </div>
                    </Dropdown>

                    <div className="sub-kategori flex align-item-center fade-in">
                        <button
                            onClick={() => setActiveCategory("other")}
                        >Other</button>
                        <i className="bi bi-chevron-right"></i>
                    </div>

                </div>

                <div className="skill-percentage fade-in">

                    {activeCategory === 'design-graphic' && (
                        <FadeInAnimation trigger={activeCategory}>
                            <div className='skill-container fade-in' id="design-graphic">
                                <div className="skill flex align-item-center">
                                    <img src="/icon/adobe-illustrator.png" className='icon' />
                                    <div className='sub-skill'>
                                        <div className="flex justify-beetween">
                                            <p>Adobe Illustrator</p>

                                            <p>85%</p>
                                        </div>

                                        <div className="skill-bar-container">
                                            <div className="skill-bar" id='illustrator'></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="skill flex align-item-center">
                                    <div className='icon' id="figma-icon-container">
                                        <img src="/icon/figma.png" id='figma-icon' />
                                    </div>
                                    <div className='sub-skill'>
                                        <div className="flex justify-beetween">
                                            <p>Figma</p>

                                            <p>60%</p>
                                        </div>

                                        <div className="skill-bar-container">
                                            <div className="skill-bar" id='figma'></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="skill flex align-item-center">
                                    <img src="/icon/figma.png" className='icon' />
                                    <div className='sub-skill'>
                                        <div className="flex justify-beetween">
                                            <p>Adobe Photoshop</p>

                                            <p>On Progress</p>
                                        </div>

                                        <div className="skill-bar-container">
                                            <div className="skill-bar" id='photoshop'></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeInAnimation>
                    )}

                    {activeCategory === 'digital-illustration' && (
                        <FadeInAnimation trigger={activeCategory}>
                            <div className='skill-container fade-in' id="digital-illustration">
                                <div className="skill flex align-item-center">
                                    <img src="/icon/adobe-illustrator.png" className='icon' />
                                    <div className='sub-skill'>
                                        <div className="flex justify-beetween">
                                            <p>Ibis Paint X</p>

                                            <p>80%</p>
                                        </div>

                                        <div className="skill-bar-container">
                                            <div className="skill-bar" id='ibis-paint-x'></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="skill flex align-item-center">
                                    <img src="/icon/adobe-illustrator.png" className='icon' />
                                    <div className='sub-skill'>
                                        <div className="flex justify-beetween">
                                            <p>Ms Paint</p>

                                            <p>80%</p>
                                        </div>

                                        <div className="skill-bar-container">
                                            <div className="skill-bar" id='ms-paint'></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeInAnimation>
                    )}

                    {activeCategory === 'front-end' && (
                        <FadeInAnimation trigger={activeCategory}>
                            <div className='skill-container fade-in' id="front-end">
                                <div className="skill flex align-item-center">
                                    <img src="/icon/adobe-illustrator.png" className='icon' />
                                    <div className='sub-skill'>
                                        <div className="flex justify-beetween">
                                            <p>Html</p>

                                            <p>75%</p>
                                        </div>

                                        <div className="skill-bar-container">
                                            <div className="skill-bar" id='html'></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="skill flex align-item-center">
                                    <img src="/icon/adobe-illustrator.png" className='icon' />
                                    <div className='sub-skill'>
                                        <div className="flex justify-beetween">
                                            <p>Css</p>

                                            <p>75%</p>
                                        </div>

                                        <div className="skill-bar-container">
                                            <div className="skill-bar" id='css'></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="skill flex align-item-center">
                                    <img src="/icon/adobe-illustrator.png" className='icon' />
                                    <div className='sub-skill'>
                                        <div className="flex justify-beetween">
                                            <p>Javascript</p>

                                            <p>10%</p>
                                        </div>

                                        <div className="skill-bar-container">
                                            <div className="skill-bar" id='js'></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="skill flex align-item-center">
                                    <img src="/icon/adobe-illustrator.png" className='icon' />
                                    <div className='sub-skill'>
                                        <div className="flex justify-beetween">
                                            <p>React</p>

                                            <p>20%</p>
                                        </div>

                                        <div className="skill-bar-container">
                                            <div className="skill-bar" id='react'></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeInAnimation>
                    )}

                    {activeCategory === 'back-end' && (
                        <FadeInAnimation trigger={activeCategory}>

                            <div className='skill-container fade-in' id="back-end">
                                <div className="skill flex align-item-center">
                                    <img src="/icon/adobe-illustrator.png" className='icon' />
                                    <div className='sub-skill'>
                                        <div className="flex justify-beetween">
                                            <p>Node Js</p>

                                            <p>10%</p>
                                        </div>

                                        <div className="skill-bar-container">
                                            <div className="skill-bar" id='nodejs'></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="skill flex align-item-center">
                                    <img src="/icon/adobe-illustrator.png" className='icon' />
                                    <div className='sub-skill'>
                                        <div className="flex justify-beetween">
                                            <p>Express</p>

                                            <p>10%</p>
                                        </div>

                                        <div className="skill-bar-container">
                                            <div className="skill-bar" id='express'></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="skill flex align-item-center">
                                    <img src="/icon/adobe-illustrator.png" className='icon' />
                                    <div className='sub-skill'>
                                        <div className="flex justify-beetween">
                                            <p>MongoDB</p>

                                            <p>35%</p>
                                        </div>

                                        <div className="skill-bar-container">
                                            <div className="skill-bar" id='mongodb'></div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </FadeInAnimation>
                    )}

                    {activeCategory === 'other' && (
                        <FadeInAnimation trigger={activeCategory}>
                            <div className='skill-container fade-in' id="other">
                                <div className="skill flex align-item-center">
                                    <img src="/icon/adobe-illustrator.png" className='icon' />
                                    <div className='sub-skill'>
                                        <div className="flex justify-beetween">
                                            <p>Notion</p>

                                            <p>20%</p>
                                        </div>

                                        <div className="skill-bar-container">
                                            <div className="skill-bar" id='notion'></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="skill flex align-item-center">
                                    <img src="/icon/adobe-illustrator.png" className='icon' />
                                    <div className='sub-skill'>
                                        <div className="flex justify-beetween">
                                            <p>Webflow</p>

                                            <p>50%</p>
                                        </div>

                                        <div className="skill-bar-container">
                                            <div className="skill-bar" id='webflow'></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeInAnimation>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Skill;