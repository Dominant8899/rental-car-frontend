import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "image/bmwm5.avif",
      eyebrow: "Premium Vehicle Rental",
      title: "Drive Your",
      highlight: "Dreams.",
      sub: "Rent premium EVs and luxury vehicles at the best prices.",
    },
    {
      image: "image/gt3.jpg",
      eyebrow: "Sports Cars",
      title: "Feel The",
      highlight: "Speed.",
      sub: "Experience high performance and ultimate comfort.",
    },
    {
      image: "image/marcducati.png",
      eyebrow: "Electric Cars",
      title: "Go",
      highlight: "Electric.",
      sub: "Eco-friendly driving with premium EV technology.",
    },
    {
      image: "image/4kcar.jpg",
      eyebrow: "Adventure Bikes",
      title: "Ride The",
      highlight: "Road.",
      sub: "Premium bikes for city rides and long adventures.",
    },
  ];

  const moveSlide = (direction) => {
    setCurrentSlide(
      (prev) => (prev + direction + slides.length) % slides.length,
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const autoPlay = setInterval(() => {
      moveSlide(1);
    }, 4000);

    return () => clearInterval(autoPlay);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Odemine | Drive Your Dreams</title>
      <link rel="stylesheet" href="style.css" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />
      <style
        dangerouslySetInnerHTML={{
          __html:
            '\n    /* ===== HERO ===== */\n    .hero {\n  position: relative;\n  width: 100%;\n  height: 100vh; /* full viewport height */\n  overflow: hidden;\n}\n    .hero-content {\n      position: relative;\n      z-index: 1;\n      padding: 0 5%;\n      max-width: 800px;\n      top: 40%;\n    }\n    .hero-eyebrow {\n      display: flex;\n      align-items: center;\n      gap: 10px;\n      font-family: "Roboto Condensed", sans-serif;\n      font-size: 0.75rem;\n      letter-spacing: 4px;\n      text-transform: uppercase;\n      color: var(--red);\n      margin-bottom: 20px;\n      animation: fadeUp 0.8s 0.2s both;\n    }\n    .hero-eyebrow span { opacity: 0.4; }\n    .hero h1 {\n      font-family:"Roboto Condensed", sans-serif;\n      font-size: clamp(4rem, 9vw, 9rem);\n      line-height: 0.92;\n      letter-spacing: 2px;\n      color: var(--white);\n      animation: fadeUp 0.8s 0.4s both;\n    }\n    .hero h1 em {\n      font-style: normal;\n      color: var(--red);\n      display: block;\n    }\n    .hero-sub {\n      margin-top: 24px;\n      font-size: 1.1rem;\n      color: var(--muted);\n      max-width: 420px;\n      line-height: 1.7;\n      animation: fadeUp 0.8s 0.6s both;\n    }\n    .hero-btns {\n      display: flex;\n      gap: 16px;\n      margin-top: 36px;\n      animation: fadeUp 0.8s 0.8s both;\n    }\n\n    /* Scroll indicator */\n    .scroll-hint {\n      position: absolute;\n      bottom: 40px; left: 50%;\n      transform: translateX(-50%);\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      gap: 8px;\n      font-family: "Roboto Condensed", sans-serif;;\n      font-size: 0.65rem;\n      letter-spacing: 3px;\n      text-transform: uppercase;\n      color: var(--muted);\n      animation: bounce 2s infinite;\n    }\n    .scroll-hint i { color: var(--red); }\n\n    /* Stats strip */\n    .stats-strip {\n      background: var(--surface);\n      border-top: 1px solid var(--border);\n      border-bottom: 1px solid var(--border);\n      padding: 32px 5%;\n      display: grid;\n      grid-template-columns: repeat(4, 1fr);\n      gap: 1px;\n      background-color: var(--border);\n    }\n    .stat-item {\n      background: var(--surface);\n      padding: 28px 32px;\n      text-align: center;\n    }\n    .stat-num {\n      font-family: "Roboto Condensed", sans-serif;\n      font-size: 3rem;\n      color: var(--red);\n      letter-spacing: 2px;\n      line-height: 1;\n    }\n    .stat-label {\n      font-family: "Roboto Condensed", sans-serif;\n      font-size: 0.75rem;\n      letter-spacing: 2px;\n      text-transform: uppercase;\n      color: var(--muted);\n      margin-top: 6px;\n    }\n\n\n    /* ===== WHY SECTION ===== */\n    .why-section {\n      padding: 120px 5%;\n    }\n    .why-layout {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 80px;\n      align-items: start;\n      max-width: 1200px;\n      margin: 0 auto;\n    }\n    .why-left { position: sticky; top: 120px; }\n    .why-left .section-title { margin-bottom: 20px; }\n    .why-left p { color: var(--muted); line-height: 1.8; margin-bottom: 32px; }\n    .why-grid {\n      display: grid;\n      gap: 16px;\n    }\n    .why-card {\n      background: var(--surface);\n      border: 1px solid var(--border);\n      border-radius: var(--radius-lg);\n      padding: 28px 32px;\n      display: flex;\n      gap: 20px;\n      align-items: flex-start;\n      transition: border-color var(--transition), transform var(--transition);\n    }\n    .why-card:hover { border-color: var(--red); transform: translateX(6px); }\n    .why-icon {\n      width: 48px; height: 48px; flex-shrink: 0;\n      background: rgba(200, 16, 46, 0.1);\n      border: 1px solid rgba(200, 16, 46, 0.2);\n      border-radius: var(--radius);\n      display: flex; align-items: center; justify-content: center;\n      color: var(--red);\n      font-size: 1.1rem;\n    }\n    .why-text h3 {\n      font-family: "Roboto Condensed", sans-serif;\n      font-size: 1.1rem;\n      letter-spacing: 0.5px;\n      margin-bottom: 6px;\n    }\n    .why-text p { color: var(--muted); font-size: 0.9rem; line-height: 1.6; }\n\n    /* ===== CATEGORIES ===== */\n    .categories-section {\n      padding: 0 5% 120px;\n    }\n    .cat-header {\n      display: flex;\n      justify-content: space-between;\n      align-items: flex-end;\n      margin-bottom: 40px;\n    }\n    .category-grid {\n      display: grid;\n      grid-template-columns: repeat(3, 1fr);\n      gap: 20px;\n    }\n    .cat-card {\n      height: 420px;\n      border-radius: var(--radius-lg);\n      overflow: hidden;\n      position: relative;\n      cursor: pointer;\n    }\n    .cat-bg {\n      position: absolute;\n      inset: 0;\n      background-size: cover;\n      background-position: center;\n      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);\n    }\n    .cat-card:hover .cat-bg { transform: scale(1.06); }\n    .cat-overlay {\n      position: absolute;\n      inset: 0;\n      background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%);\n    }\n    .cat-content {\n      position: absolute;\n      bottom: 0; left: 0; right: 0;\n      padding: 32px;\n    }\n    .cat-count {\n      font-family: "Roboto Condensed", sans-serif;\n      font-size: 0.7rem;\n      letter-spacing: 2.5px;\n      text-transform: uppercase;\n      color: var(--red);\n      margin-bottom: 6px;\n    }\n    .cat-content h3 {\n      font-family: "Roboto Condensed", sans-serif;\n      font-size: 2.2rem;\n      letter-spacing: 2px;\n    }\n    .cat-arrow {\n      width: 40px; height: 40px;\n      background: var(--red);\n      border-radius: 50%;\n      display: flex; align-items: center; justify-content: center;\n      margin-top: 14px;\n      transform: translateX(-10px);\n      opacity: 0;\n      transition: all var(--transition);\n    }\n    .cat-card:hover .cat-arrow { transform: translateX(0); opacity: 1; }\n\n    /* ===== ANIMATIONS ===== */\n    @keyframes fadeUp {\n      from { opacity: 0; transform: translateY(30px); }\n      to   { opacity: 1; transform: translateY(0); }\n    }\n    @keyframes bounce {\n      0%,100% { transform: translateX(-50%) translateY(0); }\n      50%      { transform: translateX(-50%) translateY(8px); }\n    }\n\n    @media (max-width: 900px) {\n      .stats-strip { grid-template-columns: repeat(2, 1fr); }\n      .why-layout { grid-template-columns: 1fr; }\n      .why-left { position: static; }\n      .category-grid { grid-template-columns: 1fr; }\n    }\n      .slide{\n        position: absolute;\n        inset: 0;\n        width: 100%;\n        height: 100%;\n        background-size: cover;\n        background-position: center;\n        background-repeat: no-repeat;\n\n        opacity: 0;\n        transition: opacity 1s ease-in-out;\n        z-index: 1;\n    }\n\n    .slide.active{\n        opacity: 1;\n    }\n\n\n    /* dark overlay */\n    .overlay{\n        position: absolute;\n        inset: 0;\n        background: rgba(0,0,0,0.45);\n        z-index: 2;\n    }\n\n    /* make text stay on top */\n    .hero-content,\n    .scroll-hint,\n    .slider-dots{\n        position: relative;\n        z-index: 10;\n    }\n    .hero{\n    position: relative;\n    height: 100vh;\n    overflow: hidden;\n}\n\n.slide {\n  position: absolute;\n  inset: 0;\n  background-image: url("../image/car2.jpg"); /* adjust path */\n  background-size: cover;       /* fills screen */\n  background-position: center;  /* keeps focus centered */\n  background-repeat: no-repeat;\n  transition: opacity 1s ease-in-out;\n}\n.slide.active{\n    opacity: 1;\n}\n\n.slide img {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 120%; /* slightly larger than viewport */\n  height: 120%; /* ensures it always covers */\n  object-fit: cover;\n  transform: translate(-50%, -50%);\n}\n\n/* dark overlay effect */\n    /* ===== HERO ===== */\n    .hero-content {\n      position: relative;\n      z-index: 1;\n      padding: 0 5%;\n      max-width: 800px;\n    }\n    .hero-eyebrow {\n      display: flex;\n      align-items: center;\n      gap: 10px;\n      font-family: "Roboto Condensed", sans-serif;\n      font-size: 1rem;\n      letter-spacing: 4px;\n      text-transform: uppercase;\n      color: var(--red);\n      margin-bottom: 20px;\n      animation: fadeUp 0.8s 0.2s both;\n    }\n    .hero-eyebrow span { opacity: 0.4; }\n    .hero h1 {\n      font-family: "Roboto Condensed", sans-serif;\n      font-size: clamp(4rem, 9vw, 9rem);\n      line-height: 0.92;\n      letter-spacing: 2px;\n      color: var(--white);\n      animation: fadeUp 0.8s 0.4s both;\n    }\n    .hero h1 em {\n      font-style: normal;\n      color: var(--red);\n      display: block;\n    }\n    .hero-sub {\n      margin-top: 24px;\n      font-size: 1.1rem;\n      color: var(--muted);\n      max-width: 420px;\n      line-height: 1.7;\n      animation: fadeUp 0.8s 0.6s both;\n    }\n    .hero-btns {\n      display: flex;\n      gap: 16px;\n      margin-top: 36px;\n      animation: fadeUp 0.8s 0.8s both;\n    }\n\n    /* Scroll indicator */\n    .scroll-hint {\n      position: absolute;\n      bottom: 40px; left: 50%;\n      transform: translateX(-50%);\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      gap: 8px;\n      font-family: "Roboto Condensed", sans-serif;\n      font-size: 0.65rem;\n      letter-spacing: 3px;\n      text-transform: uppercase;\n      color: var(--muted);\n      animation: bounce 2s infinite;\n    }\n    .scroll-hint i { color: var(--red); }\n\n    /* Stats strip */\n    .stats-strip {\n      background: var(--surface);\n      border-top: 1px solid var(--border);\n      border-bottom: 1px solid var(--border);\n      padding: 32px 5%;\n      display: grid;\n      grid-template-columns: repeat(4, 1fr);\n      gap: 1px;\n      background-color: var(--border);\n    }\n    .stat-item {\n      background: var(--surface);\n      padding: 28px 32px;\n      text-align: center;\n    }\n    .stat-num {\n      font-family: "Roboto Condensed", sans-serif;\n      font-size: 3rem;\n      color: var(--red);\n      letter-spacing: 2px;\n      line-height: 1;\n    }\n    .stat-label {\n      font-family: "Roboto Condensed", sans-serif;\n      font-size: 0.75rem;\n      letter-spacing: 2px;\n      text-transform: uppercase;\n      color: var(--muted);\n      margin-top: 6px;\n    }\n\n\n    /* ===== WHY SECTION ===== */\n    .why-section {\n      padding: 120px 5%;\n    }\n    .why-layout {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 80px;\n      align-items: start;\n      max-width: 1200px;\n      margin: 0 auto;\n    }\n    .why-left { position: sticky; top: 120px; }\n    .why-left .section-title { margin-bottom: 20px; }\n    .why-left p { color: var(--muted); line-height: 1.8; margin-bottom: 32px; }\n    .why-grid {\n      display: grid;\n      gap: 16px;\n    }\n    .why-card {\n      background: var(--surface);\n      border: 1px solid var(--border);\n      border-radius: var(--radius-lg);\n      padding: 28px 32px;\n      display: flex;\n      gap: 20px;\n      align-items: flex-start;\n      transition: border-color var(--transition), transform var(--transition);\n    }\n    .why-card:hover { border-color: var(--red); transform: translateX(6px); }\n    .why-icon {\n      width: 48px; height: 48px; flex-shrink: 0;\n      background: rgba(200, 16, 46, 0.1);\n      border: 1px solid rgba(200, 16, 46, 0.2);\n      border-radius: var(--radius);\n      display: flex; align-items: center; justify-content: center;\n      color: var(--red);\n      font-size: 1.1rem;\n    }\n    .why-text h3 {\n      font-family: "Roboto Condensed", sans-serif;\n      font-size: 1.1rem;\n      letter-spacing: 0.5px;\n      margin-bottom: 6px;\n    }\n    .why-text p { color: var(--muted); font-size: 0.9rem; line-height: 1.6; }\n\n    /* ===== CATEGORIES ===== */\n    .categories-section {\n      padding: 0 5% 120px;\n    }\n    .cat-header {\n      display: flex;\n      justify-content: space-between;\n      align-items: flex-end;\n      margin-bottom: 40px;\n    }\n    .category-grid {\n      display: grid;\n      grid-template-columns: repeat(3, 1fr);\n      gap: 20px;\n    }\n    .cat-card {\n      height: 420px;\n      border-radius: var(--radius-lg);\n      overflow: hidden;\n      position: relative;\n      cursor: pointer;\n    }\n    .cat-bg {\n      position: absolute;\n      inset: 0;\n      background-size: cover;\n      background-position: center;\n      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);\n    }\n    .cat-card:hover .cat-bg { transform: scale(1.06); }\n    .cat-overlay {\n      position: absolute;\n      inset: 0;\n      background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%);\n    }\n    .cat-content {\n      position: absolute;\n      bottom: 0; left: 0; right: 0;\n      padding: 32px;\n    }\n    .cat-count {\n      font-family: "Roboto Condensed", sans-serif;\n      font-size: 0.7rem;\n      letter-spacing: 2.5px;\n      text-transform: uppercase;\n      color: var(--red);\n      margin-bottom: 6px;\n    }\n    .cat-content h3 {\n      font-family: "Roboto Condensed", sans-serif;\n      font-size: 2.2rem;\n      letter-spacing: 2px;\n    }\n    .cat-arrow {\n      width: 40px; height: 40px;\n      background: var(--red);\n      border-radius: 50%;\n      display: flex; align-items: center; justify-content: center;\n      margin-top: 14px;\n      transform: translateX(-10px);\n      opacity: 0;\n      transition: all var(--transition);\n    }\n    .cat-card:hover .cat-arrow { transform: translateX(0); opacity: 1; }\n\n    /* ===== ANIMATIONS ===== */\n    @keyframes fadeUp {\n      from { opacity: 0; transform: translateY(30px); }\n      to   { opacity: 1; transform: translateY(0); }\n    }\n    @keyframes bounce {\n      0%,100% { transform: translateX(-50%) translateY(0); }\n      50%      { transform: translateX(-50%) translateY(8px); }\n    }\n\n    @media (max-width: 900px) {\n      .stats-strip { grid-template-columns: repeat(2, 1fr); }\n      .why-layout { grid-template-columns: 1fr; }\n      .why-left { position: static; }\n      .category-grid { grid-template-columns: 1fr; }\n    }\n    \n\n    .slide.active{\n        opacity: 1;\n    }\n\n    /* dark overlay */\n    .overlay{\n        position: absolute;\n        inset: 0;\n        background: rgba(0,0,0,0.45);\n        z-index: 2;\n    }\n\n\n    /* make text stay on top */\n    .hero-content,\n    .scroll-hint,\n    .slider-dots{\n        position: relative;\n        z-index: 10;\n    }\n    .hero{\n    position: relative;\n    height: 100vh;\n    overflow: hidden;\n}\n\n.slide {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100vh; /* match hero height */\n  background-size: cover;\n  background-position: center;\n}\n.slide img {\n  width: 100%;\n  height: 70%h;\n  object-fit: cover;\n}\n\n.slide.active{\n    opacity: 1;\n}\n\n.slide img{\n    width: 100%;\n    height: 100vh;\n    object-fit: cover;\n    display: block;\n}\n\n/* dark overlay effect */\n.slide::after{\n    content: "";\n    position: absolute;\n    inset: 0;\n    background: rgba(0,0,0,0.45);\n}\n\n.hero-content{\n    position: absolute;\n    top: 50%;\n    left: 8%;\n    transform: translateY(-50%);\n    z-index: 5;\n    color: white;\n    max-width: 600px;\n}\n\n.slider-btn {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  z-index: 20;\n  background: rgba(255,255,255,0.1);\n  border: 1px solid rgba(255,255,255,0.2);\n  color: white;\n  width: 50px;\n  height: 50px;\n  border-radius: 50%;\n  font-size: 1.1rem;\n  cursor: pointer;\n  transition: background 0.3s;\n  backdrop-filter: blur(6px);\n}\n.slider-btn:hover { background: var(--red); border-color: var(--red); }\n.slider-btn.prev { left: 32px; }\n.slider-btn.next { right: 32px; }\n\n.slider-dots {\n  position: absolute;\n  bottom: 28px;\n  left: 50%;\n  transform: translateX(-50%);\n  display: flex;\n  gap: 8px;\n  z-index: 20;\n}\n.dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: rgba(255,255,255,0.3);\n  cursor: pointer;\n  transition: all 0.3s;\n}\n.dot.active {\n  background: var(--red);\n  width: 24px;\n  border-radius: 4px;\n}\n\n.why-section {\n  padding: 120px 5%;\n}\n.why-section {\n  padding: 120px 5%;\n  position: relative;\n  background-image: url(\'image/bugati.png\');\n  background-size: cover;\n  background-position: center;\n  background-attachment:fixed;\n}\n.section-tag{\n  font-size: 1.2rem;\n}\n\n.why-section::before {\n  content: \'\';\n  position: absolute;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.75);\n  z-index: 0;\n}\n\n.why-layout {\n  position: relative;\n  z-index: 1;\n}\n  ',
        }}
      />
      {/* HERO */}
      <section className="hero">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? "active" : ""}`}
          >
            <img src={slide.image} alt="" />

            <div className="hero-content">
              <div className="hero-eyebrow">{slide.eyebrow}</div>

              <h1>
                {slide.title} <em>{slide.highlight}</em>
              </h1>

              <p className="hero-sub">{slide.sub}</p>
            </div>
          </div>
        ))}
        {/* Slider Controls */}
        <button className="slider-btn prev" onClick={() => moveSlide(-1)}>
          <i className="fas fa-chevron-left" />
        </button>
        <button className="slider-btn next" onClick={() => moveSlide(1)}>
          <i className="fas fa-chevron-right" />
        </button>
        {/* Dots */}
        <div className="slider-dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            />
          ))}
          <span className="dot" onclick="goToSlide(1)" />
          <span className="dot" onclick="goToSlide(2)" />
          <span className="dot" onclick="goToSlide(3)" />
        </div>
      </section>
      {/* STATS STRIP */}
      <div className="stats-strip">
        <div className="stat-item">
          <div className="stat-num">30+</div>
          <div className="stat-label">Vehicles Available</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">10K+</div>
          <div className="stat-label">Happy Customers</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">3</div>
          <div className="stat-label">Branch Locations</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">24/7</div>
          <div className="stat-label">Customer Support</div>
        </div>
      </div>
      {/* WHY US */}
      <section className="why-section">
        <div className="why-layout">
          <div className="why-left">
            <div className="section-tag">Why Odemine</div>
            <h2 className="section-title">Built For Drivers Who Demand More</h2>
            <div className="divider" />
            <p>
              From spontaneous weekend getaways to long business trips, Odemine
              offers the flexibility, quality, and peace of mind you deserve.
            </p>
            <a href="about.html" className="btn btn-outline">
              Our Story <i className="fas fa-arrow-right" />
            </a>
          </div>
          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon">
                <i className="fas fa-car" />
              </div>
              <div className="why-text">
                <h3>Wide Selection</h3>
                <p>
                  Choose from 60+ vehicles including latest EVs, fuel cars, and
                  big bikes for every occasion.
                </p>
              </div>
            </div>
            <div className="why-card">
              <div className="why-icon">
                <i className="fas fa-tag" />
              </div>
              <div className="why-text">
                <h3>Best Prices</h3>
                <p>
                  Competitive daily and weekly rates with zero hidden charges.
                  What you see is what you pay.
                </p>
              </div>
            </div>
            <div className="why-card">
              <div className="why-icon">
                <i className="fas fa-shield-alt" />
              </div>
              <div className="why-text">
                <h3>Fully Insured</h3>
                <p>
                  Every vehicle comes with comprehensive insurance coverage for
                  your complete peace of mind.
                </p>
              </div>
            </div>
            <div className="why-card">
              <div className="why-icon">
                <i className="fas fa-headset" />
              </div>
              <div className="why-text">
                <h3>24/7 Support</h3>
                <p>
                  Our team is available around the clock to assist you with any
                  questions or road-side help.
                </p>
              </div>
            </div>
            <div className="why-card">
              <div className="why-icon">
                <i className="fas fa-bolt" />
              </div>
              <div className="why-text">
                <h3>Instant Booking</h3>
                <p>
                  Reserve your vehicle in minutes. Quick, paperless process with
                  immediate confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CATEGORIES */}
      <section className="categories-section">
        <div className="cat-header">
          <div>
            <div className="section-tag">Our Fleet</div>
            <h2 className="section-title">Browse By Category</h2>
          </div>
          <Link to="/rents" className="btn btn-outline">
            View All <i className="fas fa-arrow-right" />
          </Link>
        </div>
        <div className="category-grid">

          {/* EV Card */}
          <div className="cat-card">
            <div
              className="cat-bg"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=800")',
              }}
            />
            <div className="cat-overlay" />
            <div className="cat-content">
              <h3>EV Cars</h3>
              <Link to="/ev" className="cat-arrow">
                <i className="fas fa-arrow-right" />
              </Link>
            </div>
          </div>

          {/* Fuel Card */}
          <div className="cat-card">
            <div
              className="cat-bg"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800")',
              }}
            />
            <div className="cat-overlay" />
            <div className="cat-content">
              <h3>Fuel Cars</h3>
              <Link to="/fuel" className="cat-arrow">
                <i className="fas fa-arrow-right" />
              </Link>
            </div>
          </div>

          {/* Big Bikes Card */}
          <div className="cat-card">
            <div
              className="cat-bg"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800")',
              }}
            />
            <div className="cat-overlay" />
            <div className="cat-content">
              <h3>Big bikes</h3>
              <Link to="/bigbike" className="cat-arrow">
                <i className="fas fa-arrow-right" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
