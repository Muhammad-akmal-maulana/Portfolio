import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components/style/login.css';

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // show dan hide password
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/api/admin/login", {
                username,
                password,
            });

            // simpan token ke localStorage
            localStorage.setItem("token", res.data.token);

            // redirect ke /admin kalau sudah login
            navigate("/admin");

        } catch (err) {
            console.error(err);
            alert("Login gagal! Periksa username dan password.");
        } finally {
            // reset input setelah tombol login ditekan (baik berhasil atau gagal)
            setUsername("");
            setPassword("");
            setShowPassword(false);
        }
    };

    return (
        <div className='login-body'>
            <div className="login-sub-body"></div> {/* Background seharusnya bisa pakek psuedo element :( */}

            <div className="login-container">

                <div className="image-container">
                    <div className="left-image"></div>
                    <div className="white-grass-container">
                        <img 
                            src="/random-img/white-frontGrass.svg" 
                            alt="whitegrass" 
                            className="white-grass" 
                        />
                        <div className="padding-bawah"></div>
                    </div>
                </div>
                <div className="sub-login">
                    <p className='login-title'>Login</p>
                    <p className='login-subtitle'>to access <span>admin</span> account</p>
                    <form onSubmit={handleSubmit} className='form-login'>
                        <div className="flex align-item-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                fill="currentColor"
                                className="bi bi-person-fill"
                                viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            </svg>
                            <input
                                type="text"
                                name="username"
                                placeholder='Username'
                                className='input'
                                onChange={(e) => setUsername(e.target.value)}
                                required 
                                autoComplete='off'/>
                        </div>

                        <div className="password flex align-item-center justify-beetween">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                fill="currentColor"
                                className="bi bi-lock-fill"
                                viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4m0 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3" />
                            </svg>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder='Password'
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                            <button
                                id='see-password'
                                type="button"
                                aria-pressed={showPassword}
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        fill="currentColor"
                                        className="bi bi-eye-fill"
                                        viewBox="0 0 16 16">
                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        fill="red"
                                        className="bi bi-eye-slash-fill"
                                        viewBox="0 0 16 16">
                                        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                                        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        <button type="submit" className='login-button blue-button'>Login</button>
                        <a href="/" className='flex justify-center'>
                            <p>Nahh I'm <span>not an admin</span></p>
                        </a>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;