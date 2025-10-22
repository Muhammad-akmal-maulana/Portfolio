import React, { useEffect, useRef, useState } from 'react';
import Dropdown from './fitur/dropdown';
import './style/skill.css';
import FadeInAnimation from './fitur/fadeIn';

function Skill() {

    return (
        <section className='skill-section section'>
            <h1 className='fade-in'>Skill</h1>
            <p className='fade-in'>Kemampuan Kemampuan Yang Saya Kuasai</p>

            <div className="skill-container flex">
                <div className="sub-skill-container fade-in">
                    <div className="skill">
                        <div className="ibispaint">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px" y="0px"
                                width="50"
                                viewBox="0 0 50 50">
                                <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M15,37.5	c0,0.83-0.67,1.5-1.5,1.5S12,38.33,12,37.5v-13c0-0.83,0.67-1.5,1.5-1.5s1.5,0.67,1.5,1.5V37.5z M13.5,22c-1.04,0-1.88-0.9-1.88-2	s0.84-2,1.88-2s1.88,0.9,1.88,2S14.54,22,13.5,22z M29.5,33.5c-2.41,0-4.65-0.75-6.5-2.02v5.02c0,1.38-1.12,2.5-2.5,2.5	S18,37.88,18,36.5V22c0-6.34,5.16-11.5,11.5-11.5S41,15.66,41,22S35.84,33.5,29.5,33.5z M34.4,21h4.55	c-0.11-1.01-0.38-1.96-0.77-2.85l-3.96,2.28C34.29,20.62,34.36,20.8,34.4,21z M34.22,23.57l3.96,2.28c0.39-0.89,0.66-1.84,0.77-2.85	H34.4C34.36,23.2,34.29,23.38,34.22,23.57z M33.22,18.7l3.95-2.28c-0.58-0.8-1.29-1.51-2.09-2.09l-2.28,3.95	C32.95,18.41,33.09,18.55,33.22,18.7z M32.8,25.72l2.28,3.95c0.8-0.58,1.51-1.29,2.09-2.09l-3.95-2.28	C33.09,25.45,32.95,25.59,32.8,25.72z M33.35,13.32c-0.89-0.39-1.84-0.66-2.85-0.77v4.58c0.19,0.04,0.39,0.09,0.57,0.15L33.35,13.32	z M30.5,26.9v4.55c1.01-0.11,1.96-0.38,2.85-0.77l-2.28-3.96C30.88,26.79,30.7,26.86,30.5,26.9z M32.5,22c0-1.65-1.35-3-3-3	s-3,1.35-3,3s1.35,3,3,3S32.5,23.65,32.5,22z M25.65,30.68c0.89,0.39,1.84,0.66,2.85,0.77V26.9c-0.2-0.04-0.38-0.11-0.57-0.18	L25.65,30.68z M28.5,17.13v-4.58c-1.01,0.11-1.96,0.38-2.85,0.77l2.28,3.96C28.11,17.22,28.31,17.17,28.5,17.13z M26.2,18.28	l-2.28-3.95c-0.8,0.58-1.51,1.29-2.09,2.09l3.95,2.28C25.91,18.55,26.05,18.41,26.2,18.28z M25.78,25.3l-3.95,2.28	c0.58,0.8,1.29,1.51,2.09,2.09l2.28-3.95C26.05,25.59,25.91,25.45,25.78,25.3z M24.78,20.43l-3.96-2.28	c-0.39,0.89-0.66,1.84-0.77,2.85h4.55C24.64,20.8,24.71,20.62,24.78,20.43z M24.6,23h-4.55c0.11,1.01,0.38,1.96,0.77,2.85l3.96-2.28	C24.71,23.38,24.64,23.2,24.6,23z"></path>
                            </svg>
                        </div>
                        <p>Ibis Paint X</p>
                    </div>
                </div>

                <div className="sub-skill-container fade-in">
                    <div className="skill">
                        <div className="illustrator">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px" y="0px"
                                width="57.5"
                                viewBox="0 0 30 30"
                                className='illustrator'>
                                <path d="M 6 4 C 4.895 4 4 4.895 4 6 L 4 24 C 4 25.105 4.895 26 6 26 L 24 26 C 25.105 26 26 25.105 26 24 L 26 6 C 26 4.895 25.105 4 24 4 L 6 4 z M 19.660156 9.2480469 C 20.282156 9.2480469 20.707031 9.6445469 20.707031 10.185547 C 20.707031 10.726547 20.282156 11.123047 19.660156 11.123047 C 19.045156 11.123047 18.615234 10.726547 18.615234 10.185547 C 18.615234 9.6445469 19.045156 9.2480469 19.660156 9.2480469 z M 11.792969 9.953125 L 13.775391 9.953125 L 17.28125 19.818359 L 15.388672 19.818359 L 14.554688 17.296875 L 10.925781 17.296875 L 10.076172 19.818359 L 8.2929688 19.818359 L 11.792969 9.953125 z M 12.6875 11.832031 L 11.335938 15.900391 L 14.144531 15.900391 L 12.804688 11.832031 L 12.6875 11.832031 z M 18.820312 12.339844 L 20.507812 12.339844 L 20.507812 19.818359 L 18.820312 19.818359 L 18.820312 12.339844 z"></path>
                            </svg>
                        </div>
                        <p>Adobe Illustrator</p>
                    </div>
                </div>

                <div className="sub-skill-container fade-in">
                    <div className="skill">
                        <div className="figma">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px" y="0px"
                                width="45.69"
                                viewBox="0 0 50 50"
                                className='figma'>
                                <path d="M25 2v14h-7c-3.855 0-7-3.145-7-7 0-3.855 3.145-7 7-7H25zM25 18v14h-7c-3.855 0-7-3.145-7-7 0-3.855 3.145-7 7-7H25zM25 34v7c0 3.855-3.145 7-7 7s-7-3.145-7-7c0-3.855 3.145-7 7-7H25zM41 9c0 3.855-3.145 7-7 7h-7V2h7C37.855 2 41 5.145 41 9zM34 18A7 7 0 1034 32 7 7 0 1034 18z"></path>
                            </svg>
                        </div>
                        <p>Figma</p>
                    </div>
                </div>

                <div className="sub-skill-container fade-in">
                    <div className="skill">
                        <div className="webflow">
                            <img src="/icon/webflow.svg" alt="" />
                        </div>
                        <p>Webflow</p>
                    </div>
                </div>

                <div className="sub-skill-container fade-in">
                    <div className="skill">
                        <div className="notion">
                            <img src="/icon/notion.svg" alt="" />
                        </div>
                        <p>Notion</p>
                    </div>
                </div>

                <div className="sub-skill-container fade-in">
                    <div className="skill">
                        <div className="html">
                            <img
                                src="/icon/html.svg"
                                alt=""
                                className='html' />
                        </div>
                        <p>HTML</p>
                    </div>
                </div>

                <div className="sub-skill-container fade-in">
                    <div className="skill">
                        <div className="css">
                            <img
                                src="/icon/css3.svg"
                                alt=""
                                className='css-js' />
                        </div>
                        <p>CSS</p>
                    </div>
                </div>

                <div className="sub-skill-container fade-in">
                    <div className="skill">
                        <div className="js">
                            <img
                                src="/icon/js.svg"
                                alt=""
                                className='css-js' />
                        </div>
                        <p>Java Script</p>
                    </div>
                </div>

                <div className="sub-skill-container fade-in">
                    <div className="skill">
                        <div className="react">
                            <img src="/icon/react.svg" alt="" />
                        </div>
                        <p>React</p>
                    </div>
                </div>

                <div className="sub-skill-container fade-in">
                    <div className="skill">
                        <div className="node">
                            <img src="/icon/node-js.svg" alt="" />
                        </div>
                        <p>Node Js</p>
                    </div>
                </div>

                <div className="sub-skill-container fade-in">
                    <div className="skill">
                        <div className="mongo">
                            <img
                                src="/icon/mongodb.svg"
                                alt=""
                                className='mongodb' />
                        </div>
                        <p>MongoDB</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Skill;