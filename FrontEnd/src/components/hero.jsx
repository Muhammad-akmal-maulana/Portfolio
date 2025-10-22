import React, { useState, useRef, useEffect } from 'react';
import AfterHero from '../pages/afterHero';
import './style/hero.css';

function HeroSection() {
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            const front = document.getElementById('front');
            const middle = document.getElementById('middle');
            const text = document.getElementById('parallax-text');
            const back = document.getElementById('back');
            const sky = document.getElementById('sky');
            const sky1 = document.getElementById('sky1');

            if (front && middle && back && sky && text) {
                sky.style.transform = `translateY(${scrollY * 0.6}px)`; // paling cepat
                back.style.transform = `translateY(${scrollY * 0.4}px)`; // sedang
                middle.style.transform = `translateY(${scrollY * 0.2}px)`;   // lambat
                text.style.transform = `translateY(${scrollY * 0.2}px)`;
                front.style.transform = `translateY(${scrollY * 0.005}px)`;    // paling lambat
            }

            const ySky = Math.min(scrollY * 0.6, 50); // mencegah sky bergerak berlebihan dan menyebabkan celah putih diatas
            sky1.style.transform = `translateY(${ySky}px)`;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <section id='hero-section'>
                <div className="parallax">
                    <div className="parallax" id="front"></div>
                    <div className="parallax" id="middle"></div>
                    <section className="hero-section" id='parallax-text'>
                        <p>Hi, Im</p>
                        <h1>
                            Muhammad Akmal <br />
                            Maulana Hidayat
                        </h1>
                        <p>Front-End Web Developer, Graphic Designer, UI UX Designer</p>
                    </section>
                    <div className="parallax" id="back"></div>
                    <div className="parallax" id="sky"></div>
                    <div className="parallax" id="sky1"></div>
                </div>
            </section>

            <div className="afterhero">
                <AfterHero />
            </div>
        </>
    );
}

export default HeroSection;