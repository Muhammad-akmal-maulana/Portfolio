import React, { useState, useEffect } from 'react';
import './style/aboutme.css';

function Aboutme() {
    const name = "Akmal M.";

    // konfigurasi kecepatan typing (dalam ms)
    const charDelay = 100;     // kecepatan mengetik per karakter
    const deleteDelay = 60;    // kecepatan menghapus per karakter
    const pauseAfterTyping = 1500;   // jeda setelah selesai mengetik
    const pauseAfterDeleting = 600;  // jeda setelah selesai menghapus sebelum mengetik ulang

    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timeoutId;

        if (!isDeleting && text.length < name.length) {
            // mengetik satu karakter
            timeoutId = setTimeout(() => {
                setText(name.slice(0, text.length + 1));
            }, charDelay);
        } else if (!isDeleting && text.length === name.length) {
            // selesai mengetik -> tunggu sebelum mulai menghapus
            timeoutId = setTimeout(() => {
                setIsDeleting(true);
            }, pauseAfterTyping);
        } else if (isDeleting && text.length > 0) {
            // menghapus satu karakter
            timeoutId = setTimeout(() => {
                setText(name.slice(0, text.length - 1));
            }, deleteDelay);
        } else if (isDeleting && text.length === 0) {
            // selesai menghapus -> tunggu sebelum mulai mengetik ulang
            timeoutId = setTimeout(() => {
                setIsDeleting(false);
            }, pauseAfterDeleting);
        }

        return () => clearTimeout(timeoutId);
    }, [text, isDeleting, name]);


    return (
        <section className='aboutme-container' id='aboutme'>
            <div className='sub-aboutme1'>
                <div className="">
                    <h2 className="fade-in">ABOUT ME</h2>
                    <div className="fade-in flex align-item-center">
                        <p className='typing-anim'>
                            {text}
                        </p>
                        <div className='cursor-blink'></div>
                    </div>
                </div>
                <p className='fade-in'>
                    Halo, saya Akmal Maulana seorang fullstack web developer yang
                    lebih condong ke front end, selain itu saya juga seorang graphic
                    designer yang mengandalkan adobe illustrator dan figma sebagai
                    tools andalan saya<br /><br />

                    Selama beberapa waktu ini saya sudah mengerjakan beberapakarya
                    mulai dari design personal, banner event, logo, hingga proyek
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