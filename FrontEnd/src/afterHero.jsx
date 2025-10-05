import React, { Component } from 'react';
import FadeInAnimation from './components/fitur/fadeIn';
import Aboutme from './components/aboutMe';
import Skill from './components/skill';
import Project from './components/project';
import ContactMe from './components/contactMe';

function AfterHero() {
    return (
        <div className="section">
            <FadeInAnimation>
                <Aboutme />
                <Skill />
                <Project />
                <ContactMe />
            </FadeInAnimation>
        </div>
    );
}

export default AfterHero;