import React from 'react';
import { useState } from "react";
export default function Contact() {
    const [showSuccess, setShowSuccess] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState("Select a topic");
    const [isOpen, setIsOpen] = useState(false);
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      setShowSuccess(true);
  
      e.target.reset();
  
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    };
  
    const handleTopicSelect = (topic) => {
      setSelectedTopic(topic);
      setIsOpen(false);
    };
  return (
    <>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Contact Us | Odemine</title>
  <link rel="stylesheet" href="style.css" />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
  />
  <style
    dangerouslySetInnerHTML={{
      __html:
        '\n      .page-header {\n    padding: 180px 5%;\n        position: relative;\n        z-index: 1;\n    background:\n          linear-gradient(\n            135deg,\n            rgba(10, 10, 10, 0.95) 0%,\n            rgba(10, 10, 10, 0.6) 50%,\n            rgba(10, 10, 10, 0.85) 100%\n          ),\n          url("image/audi.webp") center/cover no-repeat;\n      }\n      .page-header-tag {\n        color: var(--red);\n        font-size: 1.5rem;\n      }\n      .page-header h1 {\n        color: var(--red);\n      }\n      .page-header p {\n        color: var(--red);\n        font-size: 20px;\n        font-weight: 600;\n      }\n      .contact-section {\n        padding: 80px 5% 120px;\n        display: flex;\n      }\n      .contact-layout {\n        display: grid;\n        grid-template-columns: 1fr 1fr;\n        gap: 64px;\n        max-width: 1100px;\n        margin: 0 auto;\n      }\n\n      /* Left side info */\n      .contact-info .section-title {\n        margin-bottom: 12px;\n        font-size: 3.5rem;\n      }\n      .contact-info .section-tag {\n        font-size: 1.5rem;\n      }\n      .contact-info > p {\n        color: var(--muted);\n        line-height: 1.8;\n        margin-bottom: 40px;\n        font-size: 1.1rem;\n      }\n\n      .contact-item {\n        display: flex;\n        gap: 16px;\n        margin-bottom: 28px;\n        align-items: flex-start;\n      }\n      .contact-item-icon {\n        width: 44px;\n        height: 44px;\n        flex-shrink: 0;\n        background: rgba(200, 16, 46, 0.1);\n        border: 1px solid rgba(200, 16, 46, 0.2);\n        border-radius: var(--radius);\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        color: var(--red);\n        font-size: 1.3rem;\n      }\n      .contact-item-text strong {\n        display: block;\n        font-size: 1.1rem;\n        color: var(--white);\n        margin-bottom: 4px;\n      }\n      .contact-item-text span {\n        color: var(--muted);\n        font-size: 1.1rem;\n      }\n\n      .contact-socials {\n        margin-top: 40px;\n        padding-top: 32px;\n        border-top: 1px solid var(--border);\n      }\n      .contact-socials p {\n        color: var(--muted);\n        font-size: 0.85rem;\n        margin-bottom: 14px;\n        text-transform: uppercase;\n        letter-spacing: 1px;\n        font-family: var(--font-cond);\n      }\n\n      /* Form */\n      .contact-form-wrap {\n        background: var(--surface);\n        border: 1px solid var(--red);\n        border-radius: var(--radius-lg);\n        padding: 44px;\n      }\n      .form-title {\n        font-family: var(--font-display);\n        font-size: 2rem;\n        letter-spacing: 1.5px;\n        margin-bottom: 4px;\n      }\n      .form-sub {\n        color: var(--muted);\n        font-size: 1.1rem;\n        margin-bottom: 32px;\n      }\n\n      .form-row {\n        display: grid;\n        grid-template-columns: 1fr 1fr;\n        gap: 18px;\n      }\n      .form-group {\n        margin-bottom: 20px;\n      }\n      .form-group label {\n        display: block;\n        font-family: var(--font-cond);\n        font-size: 1.1rem;\n        letter-spacing: 1px;\n        text-transform: uppercase;\n        color: var(--muted);\n        margin-bottom: 8px;\n      }\n      .form-group input,\n      .form-group textarea {\n        width: 100%;\n        background: var(--surface2);\n        border: 1px solid var(--border);\n        border-radius: var(--radius);\n        padding: 13px 16px;\n        color: var(--white);\n        font-family: var(--font-body);\n        font-size: 0.93rem;\n        transition:\n          border-color var(--transition),\n          box-shadow var(--transition);\n      }\n      .form-group input:focus,\n      .form-group textarea:focus {\n        outline: none;\n        border-color: var(--red);\n        box-shadow: 0 0 0 3px var(--red-glow);\n      }\n      .form-group input::placeholder,\n      .form-group textarea::placeholder {\n        color: #555;\n      }\n      .topic-container {\n        width: 100%;\n        margin-bottom: 20px;\n        margin-bottom: 30px;\n        font-family: "Roboto Condensed", sans-serif;\n        text-transform: uppercase;\n        letter-spacing: 0.5px;\n      }\n\n      .topic-label {\n        display: block;\n        font-family: var(--font-cond);\n        font-size: 1.1rem;\n        letter-spacing: 1px;\n        text-transform: uppercase;\n        color: var(--muted);\n        margin-bottom: 8px;\n      }\n      .custom-select-wrapper {\n        position: relative;\n        width: 100%;\n      }\n\n      .custom-select-trigger {\n        width: 100%;\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        background: var(--surface2);\n        border: 1px solid var(--border);\n        border-radius: var(--radius);\n        padding: 13px 16px;\n        color: var(--muted);\n        font-family: var(--font-body);\n        font-size: 0.93rem;\n        cursor: pointer;\n        transition: all 0.3s ease;\n      }\n\n      .custom-select-trigger:hover {\n        border-color: var(--red);\n        color: white;\n        transform: translateY(-2px);\n        box-shadow: 0 6px 15px rgba(139, 0, 26, 0.3);\n      }\n\n      .custom-select-trigger .arrow {\n        transition: transform 0.3s ease;\n      }\n\n      .custom-select-wrapper.open .custom-select-trigger .arrow {\n        transform: rotate(180deg);\n      }\n\n      .custom-options {\n        position: absolute;\n        display: block;\n        top: calc(100% + 8px);\n        left: 0;\n        right: 0;\n        background-color: #1a1a1a;\n        border: 1px solid rgba(255, 255, 255, 0.05);\n        border-radius: 12px;\n        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);\n        padding: 6px 0;\n        margin: 0;\n        list-style: none;\n        opacity: 0;\n        visibility: hidden;\n        transform: translateY(-10px);\n        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n        z-index: 100;\n      }\n\n      .custom-select-wrapper.open .custom-options {\n        opacity: 1;\n        visibility: visible;\n        transform: translateY(0);\n      }\n\n      .custom-option {\n        position: relative;\n        padding: 12px 20px;\n        color: #b3b3b3;\n        font-size: 14px;\n        cursor: pointer;\n        transition: all 0.2s ease;\n      }\n\n      .custom-option:hover {\n        color: var(--white);\n        background-color: #8b001a;\n        padding-left: 24px;\n      }\n\n      .custom-option.selected {\n        color: var(--white);\n        font-weight: 600;\n        background-color: rgba(139, 0, 26, 0.2);\n      }\n      .form-group textarea {\n        resize: vertical;\n        min-height: 120px;\n      }\n      .btn-submit {\n        width: 100%;\n        background: var(--red);\n        color: var(--white);\n        padding: 15px;\n        border-radius: var(--radius);\n        font-family: var(--font-cond);\n        font-size: 0.9rem;\n        font-weight: 700;\n        letter-spacing: 2px;\n        text-transform: uppercase;\n        border: none;\n        cursor: pointer;\n        transition: all var(--transition);\n        margin-top: 8px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        gap: 10px;\n      }\n      .btn-submit:hover {\n        background: var(--red-dark);\n        transform: translateY(-2px);\n        box-shadow: 0 8px 24px var(--red-glow);\n      }\n\n      .success-msg {\n        display: none;\n        background: rgba(74, 222, 128, 0.08);\n        border: 1px solid rgba(74, 222, 128, 0.25);\n        border-radius: var(--radius);\n        padding: 14px 18px;\n        color: #4ade80;\n        font-size: 0.9rem;\n        margin-top: 16px;\n        text-align: center;\n      }\n\n      @media (max-width: 900px) {\n        .contact-layout {\n          grid-template-columns: 1fr;\n        }\n        .form-row {\n          grid-template-columns: 1fr;\n        }\n      }\n    '
    }}
  />
  <header className="page-header">
    <div className="page-header-tag">Reach Out</div>
    <h1>Contact Us</h1>
    <p>Have a question or ready to book? We'd love to hear from you.</p>
  </header>
  <section className="contact-section">
    <div className="contact-layout">
      {/* Left info */}
      <div className="contact-info">
        <div className="section-tag">Get In Touch</div>
        <h2 className="section-title">We're Here For You</h2>
        <div className="divider" />
        <p>
          Whether you need help choosing the right vehicle, have a question
          about our offers, or just want to make a booking — our team is ready
          to assist.
        </p>
        <div className="contact-item">
          <div className="contact-item-icon">
            <i className="fas fa-phone" />
          </div>
          <div className="contact-item-text">
            <strong>Phone</strong>
            <span>+855 (967) 655-334</span>
          </div>
        </div>
        <div className="contact-item">
          <div className="contact-item-icon">
            <i className="fas fa-envelope" />
          </div>
          <div className="contact-item-text">
            <strong>Email</strong>
            <span>odemine@gmail.com</span>
          </div>
        </div>
        <div className="contact-item">
          <div className="contact-item-icon">
            <i className="fas fa-clock" />
          </div>
          <div className="contact-item-text">
            <strong>Business Hours</strong>
            <span>Mon–Sun · 8:00 AM – 10:00 PM</span>
          </div>
        </div>
        <div className="contact-item">
          <div className="contact-item-icon">
            <i className="fas fa-headset" />
          </div>
          <div className="contact-item-text">
            <strong>24/7 Emergency Line</strong>
            <span>+855 (77) 478-899</span>
          </div>
        </div>
      </div>
      {/* Form */}
      <div className="contact-form-wrap">
        <div className="form-title">Send a Message</div>
        <p className="form-sub">
          Fill out the form and we'll get back to you within 2 hours.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" placeholder="John" required="" />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" placeholder="Doe" required="" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="john@example.com" required="" />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="+855 (967) 655-334" />
            </div>
          </div>
          <div className="form-group">
            <div className="topic-container">
              <span className="topic-label">Topic:</span>
              <div className={`custom-select-wrapper ${isOpen ? "open" : ""}`}>
                <div
                      className="custom-select-trigger"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                  <span>{selectedTopic}</span>
                  <svg
                    className="arrow"
                    width={12}
                    height={8}
                    viewBox="0 0 12 8"
                    fill="none"
                  >
                    <path
                      d="M1 1.5L6 6.5L11 1.5"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <ul className="custom-options">

                      <li
                        className="custom-option"
                        onClick={() => handleTopicSelect("License & ID Requirements")}
                      >
                        License & ID Requirements
                      </li>

                      <li
                        className="custom-option"
                        onClick={() => handleTopicSelect("Deposit & Payment Policy")}
                      >
                        Deposit & Payment Policy
                      </li>

                      <li
                        className="custom-option"
                        onClick={() => handleTopicSelect("Pick-up / Drop-off Flexibility")}
                      >
                        Pick-up / Drop-off Flexibility
                      </li>

                      <li
                        className="custom-option"
                        onClick={() => handleTopicSelect("Changing a Booking")}
                      >
                        Changing a Booking
                      </li>

                      <li
                        className="custom-option"
                        onClick={() => handleTopicSelect("Accidents or Breakdowns")}
                      >
                        Accidents or Breakdowns
                      </li>

                      <li
                        className="custom-option"
                        onClick={() => handleTopicSelect("Insurance Coverage")}
                      >
                        Insurance Coverage
                      </li>

                      <li
                        className="custom-option"
                        onClick={() => handleTopicSelect("Fuel Policy")}
                      >
                        Fuel Policy
                      </li>

                    </ul>
              </div>
            </div>
          </div>
          {/* MESSAGE */}
          <div className="form-group">
                <label>Message</label>
                <textarea placeholder="Tell us how we can help..." />
              </div>
          {/* BUTTON */}
          <button type="submit" className="btn-submit">
                <i className="fas fa-paper-plane"></i>
                Send Message
              </button>
              {/* SUCCESS */}
          {showSuccess && (
                <div className="success-msg" style={{ display: "block" }}>
                  <i className="fas fa-check-circle"></i>
                  {" "}Message sent! We'll be in touch shortly.
                </div>
              )}
        </form>
      </div>
    </div>
  </section>
</>

  )
}
