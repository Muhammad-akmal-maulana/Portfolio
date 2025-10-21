import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import React, { useState, useRef, useEffect } from 'react';
import './style/hero.css';
import AfterHero from '../pages/afterHero';

function HeroSection() {

    return (
        <div id='hero-section'>
            <Parallax pages={1.658} style={{ top: '0', left: '0' }}>
                <ParallaxLayer offset={0} speed={1.5}>
                    {/* nanti gambar bakal di jadiin background image */}
                    <div className="parallax" id='sky'></div>
                </ParallaxLayer>

                <ParallaxLayer offset={0} speed={2}>
                    <div className="parallax" id='back'></div>
                </ParallaxLayer>

                <ParallaxLayer offset={0} speed={2.5}>
                    <div className="parallax" id='middle'></div>

                    <section className="hero-section">
                        <p>Hi, Im</p>
                        <h1>
                            Muhammad Akmal <br />
                            Maulana Hidayat
                        </h1>
                        <p>Front-End Web Developer, Graphic Designer, UI UX Designer</p>
                    </section>
                </ParallaxLayer>

                <ParallaxLayer offset={0} speed={3.5}>
                    <div className="parallax" id='front'></div>
                </ParallaxLayer>

                <ParallaxLayer offset={0.99} speed={3.8}>
                    <AfterHero />
                </ParallaxLayer>

            </Parallax>
        </div>
    );
}

export default HeroSection;