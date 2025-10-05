import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './components/navbar';
import HeroSection from './components/hero';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; //bootstrap fungsi js saja tanpa style
import "bootstrap-icons/font/bootstrap-icons.css"; // icon bootstrap
import './global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar/>
    <HeroSection/>
  </StrictMode>,
)
