import React from "react";

export default function Location() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Locations | Odemine</title>
      <link rel="stylesheet" href="style.css" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />
      <style
        dangerouslySetInnerHTML={{
          __html:
            '\n      * {\n        box-sizing: border-box;\n        margin: 0;\n        padding: 0;\n      }\n      .page-header {\n        padding: 180px 5%;\n        position: relative;\n        z-index: 1;\n        background:\n          linear-gradient(\n            135deg,\n            rgba(10, 10, 10, 0.95) 0%,\n            rgba(10, 10, 10, 0.6) 50%,\n            rgba(10, 10, 10, 0.85) 100%\n          ),\n          url("image/ford2.webp")\n            center/cover no-repeat;\n      }\n      .page-header-tag {\n        color: var(--red);\n        font-size: 1.5rem;\n      }\n      .page-header h1 {\n        color: var(--red);\n      }\n      .page-header p {\n        color: var(--red);\n        font-size: 20px;\n        font-weight: 600;\n      }\n      .locations-section {\n        padding: 90px 5% 130px;\n        position: relative;\n      }\n      .locations-section::before {\n        content: "";\n        position: absolute;\n        top: 0;\n        left: 50%;\n        transform: translateX(-50%);\n        width: 900px;\n        height: 500px;\n        background: radial-gradient(rgba(200, 16, 46, 0.15), transparent 70%);\n        filter: blur(80px);\n        z-index: 0;\n      }\n      .branches-grid {\n        position: relative;\n        z-index: 2;\n        display: grid;\n        grid-template-columns: repeat(3, 1fr);\n        gap: 28px;\n        max-width: 1250px;\n        margin: 0 auto 90px;\n      }\n      .branch-card {\n        position: relative;\n        background: rgba(16, 16, 16, 0.9);\n        border: 1px solid rgba(255, 255, 255, 0.06);\n        border-radius: 28px;\n        overflow: hidden;\n        backdrop-filter: blur(12px);\n        transition: 0.4s ease;\n        box-shadow: 0 10px 35px rgba(0, 0, 0, 0.45);\n      }\n      .branch-card::before {\n        content: "";\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 4px;\n        background: linear-gradient(\n          90deg,\n          transparent,\n          var(--red),\n          transparent\n        );\n        opacity: 0;\n        transition: 0.4s ease;\n      }\n      .branch-card:hover {\n        transform: translateY(-10px);\n        border-color: rgba(200, 16, 46, 0.35);\n        box-shadow:\n          0 0 25px rgba(200, 16, 46, 0.15),\n          0 20px 50px rgba(0, 0, 0, 0.65);\n      }\n      .branch-card:hover::before {\n        opacity: 1;\n      }\n      .branch-top {\n        background: linear-gradient(\n          135deg,\n          rgba(255, 255, 255, 0.02),\n          rgba(255, 255, 255, 0.01)\n        );\n        padding: 30px;\n        border-bottom: 1px solid rgba(255, 255, 255, 0.05);\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n      }\n      .branch-top h3 {\n        font-family: var(--font-display);\n        font-size: 1.7rem;\n        letter-spacing: 1px;\n        color: white;\n      }\n      .branch-icon {\n        width: 54px;\n        height: 54px;\n        border-radius: 18px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        background: rgba(200, 16, 46, 0.12);\n        border: 1px solid rgba(200, 16, 46, 0.25);\n        color: var(--red);\n        font-size: 1.1rem;\n        transition: 0.3s ease;\n      }\n      .branch-card:hover .branch-icon {\n        transform: rotate(-8deg) scale(1.08);\n      }\n      .branch-body {\n        padding: 30px;\n      }\n      .status-row {\n        display: inline-flex;\n        align-items: center;\n        gap: 10px;\n        padding: 10px 16px;\n        border-radius: 999px;\n        background: rgba(74, 222, 128, 0.08);\n        border: 1px solid rgba(74, 222, 128, 0.18);\n        color: #4ade80;\n        font-size: 0.82rem;\n        font-weight: 600;\n        margin-bottom: 28px;\n      }\n      .status-row::before {\n        content: "";\n        width: 8px;\n        height: 8px;\n        border-radius: 50%;\n        background: #4ade80;\n        box-shadow: 0 0 10px #4ade80;\n      }\n      .info-row {\n        display: flex;\n        gap: 16px;\n        margin-bottom: 22px;\n        align-items: flex-start;\n      }\n      .info-icon {\n        width: 42px;\n        height: 42px;\n        flex-shrink: 0;\n        border-radius: 14px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        background: rgba(255, 255, 255, 0.03);\n        border: 1px solid rgba(255, 255, 255, 0.05);\n        color: var(--red);\n        font-size: 0.95rem;\n      }\n      .info-content strong {\n        display: block;\n        color: white;\n        font-size: 0.95rem;\n        font-weight: 600;\n        margin-bottom: 4px;\n      }\n      .info-content span {\n        color: #8a8a8a;\n        font-size: 0.85rem;\n      }\n      .btn-dir {\n        width: 100%;\n        margin-top: 12px;\n        border: none;\n        background: linear-gradient(135deg, #b3122d, #e11d48);\n        color: white;\n        padding: 14px;\n        border-radius: 16px;\n        font-family: var(--font-cond);\n        font-size: 0.85rem;\n        letter-spacing: 1.5px;\n        text-transform: uppercase;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        gap: 10px;\n        cursor: pointer;\n        transition: 0.3s ease;\n        box-shadow: 0 10px 25px rgba(200, 16, 46, 0.25);\n      }\n      .btn-dir:hover {\n        transform: translateY(-2px);\n        box-shadow: 0 15px 35px rgba(200, 16, 46, 0.4);\n      }\n      .map-wrap {\n        position: relative;\n        z-index: 2;\n        max-width: 1250px;\n        margin: 0 auto;\n      }\n      .section-tag {\n        font-size: 1.5rem;\n      }\n      .map-header {\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        margin-bottom: 26px;\n      }\n      .map-placeholder {\n        width: 100%;\n        height: 480px;\n        border-radius: 28px;\n        background: linear-gradient(\n          135deg,\n          rgba(18, 18, 18, 0.95),\n          rgba(10, 10, 10, 0.95)\n        );\n        border: 1px solid rgba(255, 255, 255, 0.05);\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        justify-content: center;\n        gap: 16px;\n        color: #777;\n        box-shadow: 0 15px 45px rgba(0, 0, 0, 0.45);\n      }\n      .map-placeholder i {\n        font-size: 4rem;\n        color: rgba(255, 255, 255, 0.1);\n      }\n      .map-placeholder p {\n        font-size: 0.95rem;\n        letter-spacing: 0.5px;\n      }\n      @media (max-width: 1000px) {\n        .branches-grid {\n          grid-template-columns: 1fr;\n        }\n        .branch-card {\n          max-width: 700px;\n          margin: 0 auto;\n        }\n      }\n      @media (max-width: 768px) {\n        .locations-section {\n          padding: 70px 5% 100px;\n        }\n        .branch-top,\n        .branch-body {\n          padding: 24px;\n        }\n        .branch-top h3 {\n          font-size: 1.4rem;\n        }\n        .map-placeholder {\n          height: 320px;\n          border-radius: 22px;\n        }\n      }\n    ',
        }}
      />
      <header className="page-header">
        <div className="page-header-tag">Find Us</div>
        <h1>Our Locations</h1>
        <p>
          Three conveniently located branches to serve you wherever you are.
        </p>
      </header>
      <section className="locations-section">
        <div className="branches-grid">
          <div className="branch-card">
            <div className="branch-top">
              <h3>Head Office</h3>
              <div className="branch-icon">
                <i className="fas fa-city" />
              </div>
            </div>
            <div className="branch-body">
              <div className="status-row">
                Open Now · Mon–Sun 8:00 AM – 10:00 PM
              </div>
              <div className="info-row">
                <div className="info-icon">
                  <i className="fas fa-map-marker-alt" />
                </div>
                <div className="info-content">
                  <strong>Corner Street of 315 &amp; 516</strong>
                  <span>Phnom Penh City</span>
                </div>
              </div>
              <div className="info-row">
                <div className="info-icon">
                  <i className="fas fa-phone" />
                </div>
                <div className="info-content">
                  <strong>+855 774 488 99</strong>
                  <span>Call for reservations</span>
                </div>
              </div>
              <div className="info-row">
                <div className="info-icon">
                  <i className="fas fa-envelope" />
                </div>
                <div className="info-content">
                  <strong>headofficeodemine@gmail.com</strong>
                  <span>We reply within 2 hours</span>
                </div>
              </div>
              <button className="btn-dir">
                <a href="https://www.google.com/maps/place/TK+Avenue+Mall/@11.5835284,104.8989066,17z/data=!3m1!4b1!4m6!3m5!1s0x3109517c0bdcde6b:0x64e2516b4f5ec20a!8m2!3d11.5835284!4d104.8989066!16s%2Fg%2F11crt1d7kg?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D">
                  <i className="fas fa-directions" /> Get Directions
                </a>
              </button>
            </div>
          </div>
          <div className="branch-card">
            <div className="branch-top">
              <h3>Airport Branch</h3>
              <div className="branch-icon">
                <i className="fas fa-plane-arrival" />
              </div>
            </div>
            <div className="branch-body">
              <div className="status-row">Open 24 / 7 — Never Closes</div>
              <div className="info-row">
                <div className="info-icon">
                  <i className="fas fa-map-marker-alt" />
                </div>
                <div className="info-content">
                  <strong>Ta Khmao</strong>
                  <span>Techo International Airport</span>
                </div>
              </div>
              <div className="info-row">
                <div className="info-icon">
                  <i className="fas fa-phone" />
                </div>
                <div className="info-content">
                  <strong>+855 967 655 334</strong>
                  <span>24/7 availability</span>
                </div>
              </div>
              <div className="info-row">
                <div className="info-icon">
                  <i className="fas fa-envelope" />
                </div>
                <div className="info-content">
                  <strong>airportodemine@gmail.com</strong>
                  <span>Priority support line</span>
                </div>
              </div>
              <button className="btn-dir">
                <a href="https://www.google.com/maps/place/Techo+International+Airport/@11.3588601,104.9334971,17z/data=!3m1!4b1!4m6!3m5!1s0x31095d0010ebe32b:0x811002cebf22929a!8m2!3d11.3588601!4d104.9334971!16s%2Fg%2F11mdzptw7y?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D">
                  <i className="fas fa-directions" /> Get Directions
                </a>
              </button>
            </div>
          </div>
          <div className="branch-card">
            <div className="branch-top">
              <h3>Westside Office</h3>
              <div className="branch-icon">
                <i className="fas fa-store" />
              </div>
            </div>
            <div className="branch-body">
              <div className="status-row">
                Open Now · Mon–Sun 9:00 AM – 9:00 PM
              </div>
              <div className="info-row">
                <div className="info-icon">
                  <i className="fas fa-map-marker-alt" />
                </div>
                <div className="info-content">
                  <strong>Ta Phul Road</strong>
                  <span>Krong Siem Reap</span>
                </div>
              </div>
              <div className="info-row">
                <div className="info-icon">
                  <i className="fas fa-phone" />
                </div>
                <div className="info-content">
                  <strong>+855 664 222 23</strong>
                  <span>Call for reservations</span>
                </div>
              </div>
              <div className="info-row">
                <div className="info-icon">
                  <i className="fas fa-envelope" />
                </div>
                <div className="info-content">
                  <strong>westsideodemine@gmail.com</strong>
                  <span>We reply within 2 hours</span>
                </div>
              </div>
              <button className="btn-dir">
                <a href="https://www.google.com/maps/place/Taphul+Rd,+Krong+Siem+Reap/@13.3613644,103.853739,17z/data=!3m1!4b1!4m6!3m5!1s0x3110176c2b247091:0xc2a60e748813fc93!8m2!3d13.3613644!4d103.853739!16s%2Fg%2F1tj5hm19?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D">
                  <i className="fas fa-directions" /> Get Directions
                </a>
              </button>
            </div>
          </div>
        </div>
        {/* Map */}
        <div className="map-wrap">
          <div className="map-header">
            <div>
              <div className="section-tag">Map View</div>
              <img src="image/map.png" alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
