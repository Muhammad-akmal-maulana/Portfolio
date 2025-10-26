import React, { useState, useEffect } from 'react';
import './style/aboutme.css';

function Aboutme() {

    // konfigurasi kecepatan typing (dalam ms)
    const charDelay = 100;     // kecepatan mengetik per karakter
    const deleteDelay = 60;    // kecepatan menghapus per karakter
    const pauseAfterTyping = 1500;   // jeda setelah selesai mengetik
    const pauseAfterDeleting = 600;  // jeda setelah selesai menghapus sebelum mengetik ulang

    const [about, setAbout] = useState(null);
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [imgError, setImgError] = useState(false);

    //animasi typing
    useEffect(() => {
        if (!about || !about.nama) return;
        let timeoutId;

        // mengetik satu karakter
        if (!isDeleting && text.length < about.nama.length) {
            timeoutId = setTimeout(() => {
                setText(about.nama.slice(0, text.length + 1));
            }, charDelay);

            // selesai mengetik -> tunggu sebelum mulai menghapus
        } else if (!isDeleting && text.length === about.nama.length) {
            timeoutId = setTimeout(() => {
                setIsDeleting(true);
            }, pauseAfterTyping);

            // menghapus satu karakter
        } else if (isDeleting && text.length > 0) {
            timeoutId = setTimeout(() => {
                setText(about.nama.slice(0, text.length - 1));
            }, deleteDelay);

            // selesai menghapus -> tunggu sebelum mulai mengetik ulang
        } else if (isDeleting && text.length === 0) {
            timeoutId = setTimeout(() => {
                setIsDeleting(false);
            }, pauseAfterDeleting);
        }

        return () => clearTimeout(timeoutId);
    }, [text, isDeleting, about]);
    

    //ambil data
    useEffect(() => {
        async function fetchAbout() {
            try {
                const res = await fetch('http://localhost:5000/api/aboutme');
                const data = await res.json();

                if (res.ok && data) {
                    setAbout(data);
                    // no local preview state in this component — image URL is built when rendering
                } else {
                    console.error('Gagal mengambil data About Me:', data);
                }

                setImgError(false);
            } catch (err) {
                console.error('Gagal mengambil data About Me:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchAbout();
    }, []);


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
                    {about?.deskripsi?.split('\n').map((line, index) => ( //menambahkan enter jika memasukkan enter
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                </p>
            </div>

            <div className='sub-aboutme2 fade-in'>
                {about?.image && !imgError ? (
                    (() => {
                        const filename = about?.image;
                        const imageUrl = `http://localhost:5000/uploads/${encodeURIComponent(filename)}`;
                        console.debug('Requesting about image URL:', imageUrl);
                        return (
                            <img
                                src={imageUrl}
                                alt={about?.nama || 'About image'}
                                className="person"
                                onError={(e) => {
                                    console.warn('Image failed to load:', imageUrl, e);
                                    setImgError(true);
                                }}
                            />
                        );
                    })()
                ) : (
                    <div className="person fade-in no-image">No Image Available</div>
                )}
            </div>
        </section>
    );
}

export default Aboutme;