import React, { useEffect, useState, useRef } from 'react';
import Aboutme from '../aboutMe';
import '../style/editAboutme.css'

function AboutmeEdit() {
    const [loading, setLoading] = useState(true);
    const [about, setAbout] = useState(null);
    const [nama, setNama] = useState('')
    const [deskripsi, setDeskripsi] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileRef = useRef(null);
    const [isChanged, setIsChanged] = useState(false); //mendeteksi perubahan
    // dropdown
    const [show, setShow] = useState(false);
    const dropdownRef = useRef(null);
    const [imageLoading, setImageLoading] = useState(true); //loading

    useEffect(() => {
        async function fetchAbout() {
            try {
                const res = await fetch('http://localhost:5000/api/aboutme');
                const data = await res.json();

                if (!res.ok) throw new Error(data.message || 'Gagal mengambil data');

                if (data && Object.keys(data).length) {
                    setAbout(data);
                    setNama(data.nama || '');
                    setDeskripsi(data.deskripsi || '');
                    setPreview(data.image ? `http://localhost:5000/uploads/${data.image}` : null);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchAbout();
    }, []);

    //deteksi perubahan data yang dibandingkan data awal
    useEffect(() => {
        if (!about) {
            setIsChanged(!!nama || !!deskripsi || !!imageFile);
            return;
        }

        const namaChanged = nama !== (about.nama || '');
        const deskripsiChanged = deskripsi !== (about.deskripsi || '');
        const imageChanged = !!imageFile; // jika ada file baru
        setIsChanged(namaChanged || deskripsiChanged || imageChanged);
    }, [nama, deskripsi, imageFile, about]);

    // preview gambar baru
    useEffect(() => {
        if (!imageFile) return;
        const url = URL.createObjectURL(imageFile);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [imageFile]);

    // dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShow(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // handle perubahan file
    const handleFileChange = (e) => {
        const f = e.target.files && e.target.files[0];
        setImageFile(f || null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isChanged) return; //jika data tidak ada yang baru maka menolak update
        const form = new FormData();

        if (!about && !imageFile) {
            alert('Silakan pilih gambar sebelum menyimpan.');
            return;
        }

        form.append('nama', nama);
        form.append('deskripsi', deskripsi);
        if (imageFile) form.append('image', imageFile);

        try {
            let res;
            if (about && about._id) {
                res = await fetch(`http://localhost:5000/api/aboutme/${about._id}`, {
                    method: 'PUT',
                    body: form,
                });
            } else {
                res = await fetch('http://localhost:5000/api/aboutme', {
                    method: 'POST',
                    body: form,
                });
            }

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.message || 'Gagal menyimpan');
            }

            const saved = await res.json();
            setAbout(saved);

            alert('Berhasil disimpan');

            setNama(saved.nama || nama);
            setDeskripsi(saved.deskripsi || deskripsi);
            if (saved.image) {
                setPreview(`http://localhost:5000/uploads/${saved.image}`);
            }
            setImageFile(null);
            setIsChanged(false);

        } catch (err) {
            console.error(err);
            alert(err.message || 'Gagal menyimpan about me');
        }
    };

    return (
        <div
            ref={dropdownRef}
            className='edit-about-all'
        >
            <section className='section aboutme-container'>
                <div className="sub-aboutme1">
                    <div className="">
                        <h2>ABOUT ME</h2>
                        <div className="">
                            <div className="flex align-item-center">
                                <button onClick={() => setShow(!show)}>
                                    <span>{nama} </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='deskripsi-container flex align-item-center justify-center'>
                        <button
                            onClick={() => setShow(!show)}
                            className='blue-button'
                        >Edit Deskripsi</button>
                        <p>
                            {deskripsi?.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}
                        </p>
                    </div>
                </div>

                <div className="sub-aboutme2 flex align-item-center justify-center">
                    <button
                        onClick={() => setShow(!show)}
                        className='blue-button'
                    >Edit Gambar</button>

                    {about?.image ? (
                        <img
                            src={`http://localhost:5000/uploads/${about.image}`}
                            alt="About Me"
                            className='person'
                            onError={(e) => (e.target.style.display = 'none')}
                        />
                    ) : (
                        <div>
                            <p>Tidak ada gambar</p>
                        </div>
                    )}
                </div>
            </section>

            {show && (
                <section className='aboutmeEdit-section'>

                    <div className="about-header blue-button">
                        <div className='about-title flex justify-beetween align-item-center'>
                            <p>Edit About Me</p>
                            <button onClick={() => setShow(false)}>
                                <i class="bi bi-x-lg"></i>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex align-item-center">
                            <div className="sub-about1">

                                <div>
                                    <p className='top-label'>Typing Animation</p>
                                    <input
                                        type="text"
                                        value={nama}
                                        onChange={(e) => setNama(e.target.value)}
                                        placeholder="Masukkan nama"
                                        required
                                    />
                                </div>

                                <div>
                                    <p>Deskripsi</p>
                                    <textarea
                                        placeholder='Masukkan Deskripsi'
                                        value={deskripsi}
                                        onChange={(e) => setDeskripsi(e.target.value)}
                                        rows={6}
                                        required
                                    />
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className={isChanged ? 'blue-button' : 'gray-button'}
                                        disabled={!isChanged}
                                    >Update</button>
                                </div>
                            </div>

                            <div className="sub-about2 flex align-item-center justify-center">

                                <div className='about-image'>
                                    {preview && (
                                        <>
                                            {imageLoading && <div className="loading">Loading...</div>}

                                            <img
                                                src={preview}
                                                alt="preview"
                                                onLoad={() => setImageLoading(false)}   // hilangkan loading saat gambar sudah tampil
                                                onError={() => {
                                                    setImageLoading(false);             // hilangkan loading juga jika error
                                                    console.error('Gagal memuat gambar');
                                                }}
                                                style={{
                                                    display: imageLoading ? 'none' : 'block',
                                                }}
                                            />
                                        </>
                                    )}

                                    <input
                                        id='aboutme-img'
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            setImageLoading(true); // setiap kali pilih gambar baru, tampilkan loading lagi
                                            handleFileChange(e);
                                        }}
                                        ref={fileRef}
                                    />
                                </div>


                                <div className='edit-gambar flex justify-center align-item-center'>
                                    <label
                                        htmlFor="aboutme-img"
                                        className='blue-button'
                                    >
                                        Edit Gambar
                                    </label>
                                </div>
                            </div>

                        </form>
                    </div>

                </section>
            )}
        </div>
    );
}

export default AboutmeEdit;
