import React, { Component } from 'react';
import FadeInAnimation from '../components/fitur/fadeIn';
import Aboutme from '../components/aboutMe';
import Skill from '../components/skill';
import Project from '../components/project';
import Footer from '../components/footer';

function AfterHero() {
    return (
        <div className="section">
            <FadeInAnimation>
                <Aboutme />
                <Skill />
                <Project />
                <Footer />
            </FadeInAnimation>
        </div>
    );
}

export default AfterHero;