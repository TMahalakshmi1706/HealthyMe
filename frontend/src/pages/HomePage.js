import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  BarChart3,
  Pill,
  Clock,
  AlertTriangle,
  TrendingUp,
  Cpu
} from 'lucide-react';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const heroSlides = [
    {
      title: "Smart Prescription Scanner",
      subtitle: "Scan & Digitize Prescriptions Instantly",
      description: "Upload prescription images and let our AI extract medicine details automatically",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800"
    },
    {
      title: "Medication Management",
      subtitle: "Track All Your Medicines in One Place",
      description: "Never miss a dose with intelligent reminders and comprehensive tracking",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800"
    },
    {
      title: "AI Health Insights",
      subtitle: "Personalized Health Recommendations",
      description: "Get AI-powered suggestions based on your medications and conditions",
      image: "https://randomtrees.com/blog/wp-content/uploads/2023/12/Ai-in-pharma--1600x900.jpg"
    }
  ];

  const verticalNavItems = [
    { icon: <Home size={24} />, name: "Home", path: "/", desc: "Go to homepage" },
    { icon: <BarChart3 size={24} />, name: "Dashboard", path: "/dashboard", desc: "View your health dashboard" },
    { icon: <Pill size={24} />, name: "Medicines", path: "/medicines", desc: "Manage medications" },
    { icon: <Clock size={24} />, name: "Reminders", path: "/reminders", desc: "Set medication reminders" },
    { icon: <AlertTriangle size={24} />, name: "Interactions", path: "/interactions", desc: "Check drug interactions" },
    { icon: <TrendingUp size={24} />, name: "Analytics", path: "/analytics", desc: "Health analytics" },
    { icon: <Cpu size={24} />, name: "AI Insights", path: "/ai-insights", desc: "AI health recommendations" }
  ];

  const services = [
    {
      icon: <Pill size={32} />,
      title: "Smart Prescription Scanner",
      description: "Upload prescription images and let our advanced OCR technology automatically extract medicine details.",
      image: "https://static.zennioptical.com/marketing/campaign/prescription_ocr/LP/Prescription_OCR_step_1-md.png?quality=high"
    },
    {
      icon: <Pill size={32} />,
      title: "Medication Management",
      description: "Add, edit, and manage all your medicines manually with comprehensive tracking.",
      image: "https://tse4.mm.bing.net/th/id/OIP.LOgWMNvQ6UNO6ryloLM7IQHaE8?pid=Api&P=0&h=180"
    },
    {
      icon: <Clock size={32} />,
      title: "Smart Reminders",
      description: "Never miss a dose with intelligent reminders and notifications.",
      image: "https://tse2.mm.bing.net/th/id/OIP.Cuo48t5CrsPvyxDRcMCF-AHaF0?pid=Api&P=0&h=180"
    },
    {
      icon: <AlertTriangle size={32} />,
      title: "Drug Interaction Alerts",
      description: "Stay safe with automatic drug interaction checking and safety alerts.",
      image: "https://medicaldialogues.in/h-upload/2024/06/20/241667-drug-safety-alert-new-50.jpg"
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Health Analytics",
      description: "Track your medication adherence with detailed reports and progress analytics.",
      image: "https://demigos.com/media/cache/fe/4f/fe4f8c5f6bbe1c6f2eb3def637726c1f.jpg"
    },
    {
      icon: <Cpu size={32} />,
      title: "AI Health Insights",
      description: "Get personalized health recommendations based on your medications and conditions.",
      image: "https://www.addevice.io/storage/ckeditor/uploads/images/65c4e857b81ad_ai.in.healthcare.app.development.1920.1080.png"
    }
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const handleNavigation = (path) => {
    if (path === "/") return;
    if (!isLoggedIn) navigate('/login');
    else navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="homepage-container">
      <div className="medical-pattern-bg"></div>

      {/* Vertical Navigation */}
      <div className="vertical-nav-tab">
        <div className="vertical-nav-items">
          {verticalNavItems.map((item, index) => (
            <div
              key={index}
              className={`vertical-nav-item ${item.path === "/" ? "active" : ""}`}
              onClick={() => handleNavigation(item.path)}
              title={item.desc}
            >
              <div className="vertical-nav-icon">{item.icon}</div>
              <span className="vertical-nav-label">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Navbar */}
      <nav className="nav-header">
        <div className="nav-logo">
          <img src="/logo.png" alt="HealthCare+ Logo" className="logo-img" />
        </div>
        <div className="nav-links">
          <a href="#home" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#services" className="nav-link">Services</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>

        <div className="auth-buttons">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="btn-logout">LOGOUT</button>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="btn-login">LOGIN</button>
              <button onClick={() => navigate('/signup')} className="btn-signup">SIGN UP</button>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="main-content">
        <div className="hero-carousel">
          <div className="carousel-container">
            <div className="carousel-content">
              {heroSlides.map((slide, index) => (
                <div key={index} className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}>
                  <div className="slide-content">
                    <h1 className="slide-title">{slide.title}</h1>
                    <h2 className="slide-subtitle">{slide.subtitle}</h2>
                    <p className="slide-description">{slide.description}</p>
                    <button
                      onClick={() => navigate(isLoggedIn ? '/dashboard' : '/signup')}
                      className="btn-primary btn-with-arrow"
                    >
                      Get Started <span className="arrow">→</span>
                    </button>
                  </div>
                  <div className="slide-image">
                    <img src={slide.image} alt={slide.title} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="carousel-dots">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* About Section */}
        <section id="about" className="about-section">
          <div className="about-pattern-bg"></div>
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">About HealthCare+</h2>
              <p className="section-subtitle">We aim to digitize healthcare and make managing prescriptions simple, secure, and intelligent for everyone.</p>
            </div>
            <div className="about-grid">
              <div className="about-card">
                <h3 className="about-card-title">Reliable</h3>
                <p className="about-card-text">Built with accuracy and security at the forefront.</p>
              </div>
              <div className="about-card">
                <h3 className="about-card-title">AI Powered</h3>
                <p className="about-card-text">Advanced AI extracts medicine information automatically from prescriptions.</p>
              </div>
              <div className="about-card">
                <h3 className="about-card-title">User-Friendly</h3>
                <p className="about-card-text">Clean, intuitive interface that anyone can use easily.</p>
              </div>
              <div className="about-card">
                <h3 className="about-card-title">24/7 Support</h3>
                <p className="about-card-text">Round-the-clock assistance to help with medicine tracking and health updates.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="services-section">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">Our Services</h2>
              <p className="section-subtitle">We provide complete solutions to manage your prescriptions, reminders, and health insights.</p>
            </div>
            <div className="marquee-container">
              <div className="marquee-content">
                {services.map((service, index) => (
                  <div key={index} className="service-card-marquee">
                    <div className="service-image-container">
                      <img className="service-image" src={service.image} alt={service.title} />
                      <div className="service-overlay"></div>
                    </div>
                    <div className="service-content">
                      <div className="service-icon">{service.icon}</div>
                      <h3 className="service-title-marquee">{service.title}</h3>
                      <p className="service-description-marquee">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        
      <section id="contact" className="contact-section">
        <div className="contact-container">
          <h2 className="section-title">Get in Touch</h2>
          <p className="contact-subtitle">
            Have questions? Want to try our platform? Reach out to us and we'll get back within 24 hours.
          </p>

          <form
            action="https://formspree.io/f/xeozpdvv"
            method="POST"
            className="contact-form"
          >
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" required></textarea>
            <button type="submit" className="btn-contact">Send Message</button>
          </form>
        </div>
      </section>
      </main>
    </div>
  );
}