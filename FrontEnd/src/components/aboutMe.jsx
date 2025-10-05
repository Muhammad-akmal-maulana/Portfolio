import React, { Component } from 'react';
import './style/aboutme.css';

function Aboutme() {
    return (
        <section className='aboutme-container'>
            <div className='sub-aboutme1'>
                <h2 className="fade-in">About Me</h2>
                <p className='fade-in'>
                    Halo, saya Akmal Maulana seorang fullstack web developer yang
                    lebih condong ke front end, selain itu saya juga seorang graphic
                    designer yang mengandalkan adobe illustrator dan figma sebagai
                    tools andalan saya<br /><br />

                    Saya suka menuangkan imajinasi saya dalam bentuk posterdan ilustrasi
                    digital. Dalam karya yang saya buat saya selalu memperhatikan
                    estetika dan makna dari setiap warna dan bentuk yang saya pilih.
                    <br /><br />

                    Selama beberapa waktu ini saya sudah mengerjakan beberapakarya
                    mulai dari design personal, benner event, logo, hinggaproyek
                    branding beberapa pihak.
                </p>
            </div>
            <div className='flex sub-aboutme2'>
                <div className="person fade-in"></div>
            </div>
        </section>
    );
}

export default Aboutme;