import React from "react";

export default function About() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>About Us | Odemine</title>
      <link rel="stylesheet" href="style.css" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />
      <style
        dangerouslySetInnerHTML={{
          __html:
            '\n      * {\n        box-sizing: border-box;\n        margin: 0;\n        padding: 0;\n      }\n      .page-header {\n        padding: 180px 5%;\n        position: relative;\n        z-index: 1;\n        background:\n          linear-gradient(\n            135deg,\n            rgba(10, 10, 10, 0.95) 0%,\n            rgba(10, 10, 10, 0.6) 50%,\n            rgba(10, 10, 10, 0.85) 100%\n          ),\n          url("image/bugati.png") center/cover no-repeat;\n      }\n      .page-header-tag {\n        color: var(--red);\n        font-size: 1.5rem;\n      }\n      .page-header h1 {\n        color: var(--red);\n      }\n      .page-header p {\n        color: var(--red);\n        font-size: 20px;\n        font-weight: 600;\n      }\n      .story-section {\n        padding: 50px 5%;\n      }\n      .story-layout {\n        display: grid;\n        grid-template-columns: 1fr 1fr;\n        gap: 80px;\n        align-items: center;\n        max-width: 1200px;\n        margin: 0 auto;\n      }\n      .story-img-wrap {\n        position: relative;\n      }\n      .story-img-wrap img {\n        border-radius: var(--radius-lg);\n        height: 500px;\n        object-fit: cover;\n      }\n      .story-img-tag {\n        position: absolute;\n        bottom: -24px;\n        right: -24px;\n        background: var(--red);\n        padding: 24px 28px;\n        border-radius: var(--radius-lg);\n      }\n      .story-img-tag .big {\n        font-family: "Roboto Condensed", sans-serif;\n        font-size: 2.5rem;\n        letter-spacing: 2px;\n        line-height: 1;\n      }\n      .story-img-tag .small {\n        font-family: "Roboto Condensed", sans-serif;\n        font-size: 0.5rem;\n        letter-spacing: 2px;\n        text-transform: uppercase;\n        color: rgba(255, 255, 255, 0.7);\n      }\n      .story-text .section-title {\n        margin-bottom: 12px;\n      }\n      .story-text .section-tag {\n        font-size: 1.5rem;\n      }\n      .story-text p {\n        color: var(--muted);\n        line-height: 1.9;\n        margin-bottom: 18px;\n        font-size: 1.2rem;\n      }\n\n      /* ===== STATS ===== */\n      .stats-section {\n        padding: 0 5% 100px;\n      }\n      .stats-grid {\n        display: grid;\n        grid-template-columns: repeat(3, 1fr);\n        gap: 20px;\n        max-width: 1200px;\n        margin: 0 auto;\n      }\n      .stat-card {\n        background: var(--surface);\n        border: 1px solid var(--border);\n        border-radius: var(--radius-lg);\n        padding: 48px 40px;\n        position: relative;\n        overflow: hidden;\n        transition:\n          border-color var(--transition),\n          transform var(--transition);\n      }\n      .stat-card:hover {\n        border-color: var(--red);\n        transform: translateY(-7px);\n      }\n      .stat-card::after {\n        content: "";\n        position: absolute;\n        bottom: 0;\n        left: 0;\n        width: 100%;\n        height: 3px;\n        background: var(--red);\n        transform: scaleX(0);\n        transform-origin: left;\n        transition: transform 0.4s ease;\n      }\n      .stat-card:hover::after {\n        transform: scaleX(1);\n      }\n      .stat-card-num {\n        font-family: "Roboto Condensed", sans-serif;\n        font-size: 2.5rem;\n        letter-spacing: 3px;\n        color: var(--white);\n        line-height: 1;\n      }\n      .stat-card-num span {\n        color: var(--red);\n      }\n      .stat-card-title {\n        font-family: "Roboto Condensed", sans-serif;\n        font-size: 1rem;\n        letter-spacing: 1px;\n        text-transform: uppercase;\n        margin: 12px 0 8px;\n      }\n      .stat-card-desc {\n        color: var(--muted);\n        font-size: 0.95rem;\n      }\n\n      /* ===== VALUES ===== */\n      .values-section {\n        padding: 0 5% 120px;\n        background: var(--surface);\n        border-top: 1px solid var(--border);\n        padding-top: 100px;\n      }\n      .values-header {\n        text-align: center;\n        margin-bottom: 60px;\n      }\n      .values-header .section-tag {\n        justify-content: center;\n        font-size: 1.5rem;\n      }\n      .values-header .section-tag::before {\n        display: none;\n      }\n      .values-grid {\n        display: grid;\n        grid-template-columns: repeat(4, 1fr);\n        gap: 24px;\n        max-width: 1200px;\n        margin: 0 auto;\n      }\n      .value-card {\n        background: var(--surface2);\n        border: 1px solid var(--border);\n        border-radius: var(--radius-lg);\n        padding: 36px 28px;\n        text-align: center;\n        transition: all var(--transition);\n      }\n      .value-card:hover {\n        background: var(--surface3);\n        border-color: var(--red);\n        transform: translateY(-7px);\n      }\n      .value-icon {\n        width: 56px;\n        height: 56px;\n        background: rgba(200, 16, 46, 0.1);\n        border: 1px solid rgba(200, 16, 46, 0.2);\n        border-radius: 50%;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        margin: 0 auto 20px;\n        font-size: 1.7rem;\n        color: var(--red);\n      }\n      .value-card h3 {\n        font-family: "Roboto Condensed", sans-serif;\n        font-size: 1.2rem;\n        letter-spacing: 0.5px;\n        margin-bottom: 10px;\n      }\n      .value-card p {\n        color: var(--muted);\n        font-size: 0.95rem;\n        line-height: 1.7;\n      }\n\n      @media (max-width: 900px) {\n        .story-layout {\n          grid-template-columns: 1fr;\n        }\n        .story-img-tag {\n          right: 0;\n        }\n        .stats-grid {\n          grid-template-columns: 1fr;\n        }\n        .values-grid {\n          grid-template-columns: 1fr 1fr;\n        }\n      }\n    ',
        }}
      />
      <header className="page-header">
        <div className="page-header-tag">Our Story</div>
        <h1>About Odemine</h1>
        <p>
          The premium vehicle rental service built for those who love the road.
        </p>
      </header>
      {/* STORY */}
      <section className="story-section">
        <div className="story-layout">
          <div className="story-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800"
              alt="Luxury Cars"
            />
            <div className="story-img-tag">
              <div className="big">Est.</div>
              <div className="big">2020</div>
              <div className="small">Odemine Rental</div>
            </div>
          </div>
          <div className="story-text">
            <div className="section-tag">Who We Are</div>
            <h2 className="section-title">Our Story</h2>
            <div className="divider" />
            <p>
              Odemine was founded with a simple mission: to make premium vehicle
              rentals accessible to everyone. We believe that everyone deserves
              the opportunity to drive their dream car, whether it's an
              eco-friendly electric vehicle, a powerful fuel car, or an exciting
              big bike.
            </p>
            <p>
              Since our establishment, we've grown to become one of the leading
              vehicle rental services, offering a diverse fleet of over 60
              vehicles to choose from. Our commitment to quality, safety, and
              customer satisfaction has made us the preferred choice for
              thousands of satisfied customers.
            </p>
            <p>
              At Odemine, we're not just about renting vehicles — we're about
              creating unforgettable experiences and memories on the road.
            </p>
            <a
              href="contact.html"
              className="btn btn-red"
              style={{ marginTop: 8 }}
            >
              <i className="fas fa-phone" /> Get In Touch
            </a>
          </div>
        </div>
      </section>
      {/* STATS */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-num">
              30<span>+</span>
            </div>
            <div className="stat-card-title">Vehicles</div>
            <div className="stat-card-desc">
              Wide selection of premium EVs, fuel cars, and big bikes ready for
              you.
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-num">
              10<span>K+</span>
            </div>
            <div className="stat-card-title">Happy Customers</div>
            <div className="stat-card-desc">
              Thousands of satisfied drivers trust Odemine for their rental
              needs.
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-num">
              24<span>/7</span>
            </div>
            <div className="stat-card-title">Support</div>
            <div className="stat-card-desc">
              Round-the-clock customer service so you're never stranded alone.
            </div>
          </div>
        </div>
      </section>
      {/* VALUES */}
      <section className="values-section">
        <div className="values-header">
          <div className="section-tag">What We Stand For</div>
          <h2 className="section-title">Our Core Values</h2>
        </div>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">
              <i className="fas fa-gem" />
            </div>
            <h3>Quality</h3>
            <p>
              Every vehicle is meticulously maintained to ensure the highest
              standard.
            </p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <i className="fas fa-shield-alt" />
            </div>
            <h3>Safety</h3>
            <p>
              Comprehensive insurance and regular safety checks on every
              vehicle.
            </p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <i className="fas fa-handshake" />
            </div>
            <h3>Trust</h3>
            <p>
              Transparent pricing and honest service — what we promise, we
              deliver.
            </p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <i className="fas fa-leaf" />
            </div>
            <h3>Sustainability</h3>
            <p>
              A growing EV fleet to drive towards a cleaner, greener future.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
