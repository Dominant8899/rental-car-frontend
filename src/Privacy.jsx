import React from "react";

export default function Privacy() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style
        dangerouslySetInnerHTML={{
          __html:
            '\n    * {\n      box-sizing: border-box;\n      margin: 0;\n      padding: 0;\n    }\n    body {\n      font-family: "Roboto Condensed", sans-serif;\n      line-height: 1.6;\n      /* background-color: black; */\n    }\n    .head {\n      padding: 120px 5%;\n      position: relative;\n      background-image: url("image/f1.jpg");\n      background-size: cover;\n      background-position: center;\n      background-attachment: fixed;\n      z-index: 1;\n    }\n    .head::before {\n      content: "";\n      position: absolute;\n      inset: 0;\n      background: rgba(5, 5, 5, 0.75);\n      z-index: -1;\n    }\n    .page-header {\n      position: relative;\n      z-index: 2;\n      background: transparent !important;\n      height: auto;\n    }\n    .page-header-tag {\n      color: var(--red);\n      font-size: 1.5rem;\n    }\n    .page-header h1 {\n      color: var(--red);\n    }\n    .page-header p {\n      color: var(--red);\n      font-size: 18px;\n      font-weight: 600;\n    }\n    .policy-section {\n      width: min(1200px, 95%);\n      margin: 20px auto;\n      padding: 35px 40px;\n      border-radius: 24px;\n      background: rgba(18, 18, 18, 0.88);\n      border: 1px solid rgba(255, 0, 0, 0.12);\n      backdrop-filter: blur(12px);\n      box-shadow:\n        0 0 25px rgba(255, 0, 0, 0.08),\n        0 10px 30px rgba(0, 0, 0, 0.45);\n      transition: 0.35s ease;\n    }\n    .policy-section:hover {\n      transform: translateY(-4px);\n      border-color: rgba(255, 0, 0, 0.25);\n      box-shadow:\n        0 0 30px rgba(255, 0, 0, 0.12),\n        0 15px 40px rgba(0, 0, 0, 0.6);\n    }\n    .policy-section h2 {\n      font-size: 1.6rem;\n      color: var(--red);\n      margin-bottom: 18px;\n      padding: 0;\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      font-weight: 700;\n      letter-spacing: 0.5px;\n      position: relative;\n    }\n    .policy-section h2::before {\n      content: "";\n      width: 5px;\n      height: 28px;\n      border-radius: 10px;\n      background: var(--red);\n    }\n    .policy-section p {\n      color: #d4d4d4;\n      font-size: 1rem;\n      line-height: 1.9;\n      padding: 0;\n      margin-bottom: 18px;\n    }\n    .policy-section ul {\n      list-style: none;\n      padding: 0;\n      margin-top: 10px;\n    }\n    .policy-section li {\n      position: relative;\n      color: #e8e8e8;\n      padding-left: 28px;\n      margin-bottom: 14px;\n      font-size: 1rem;\n      transition: 0.2s ease;\n    }\n    .policy-section li:hover {\n      transform: translateX(4px);\n      color: white;\n    }\n    .policy-section li::before {\n      content: "";\n      position: absolute;\n      left: 0;\n      top: 10px;\n      width: 10px;\n      height: 10px;\n      border-radius: 50%;\n      background: var(--red);\n      box-shadow: 0 0 10px rgba(255, 59, 59, 0.7);\n    }\n    .policy-section a {\n      color: var(--red);\n      text-decoration: none;\n      font-weight: 600;\n      position: relative;\n      transition: 0.25s ease;\n    }\n    .policy-section a::after {\n      content: "";\n      position: absolute;\n      left: 0;\n      bottom: -3px;\n      width: 0%;\n      height: 2px;\n      background: #ff3b3b;\n      transition: 0.3s ease;\n    }\n\n    .policy-section a:hover {\n      color: var(--red);\n    }\n\n    .policy-section a:hover::after {\n      width: 100%;\n    }\n    @media (max-width: 768px) {\n      .policy-section {\n        padding: 28px 22px;\n        border-radius: 18px;\n      }\n      .policy-section h2 {\n        font-size: 1.3rem;\n      }\n      .policy-section p,\n      .policy-section li {\n        font-size: 0.95rem;\n        line-height: 1.8;\n      }\n    }\n  ',
        }}
      />
      <div className="head">
        <header className="page-header">
          <h1>Privacy Policy</h1>
          <p>Last update 16 January 2026.</p>
        </header>
      </div>
      <div className="policy-section">
        <h2>1. Information We Collect</h2>
        <p>
          We collect information that you provide directly to us, including:
        </p>
        <ul>
          <li>
            Personal identification information (name, email, phone number)
          </li>
          <li>Driver's license and insurance information</li>
          <li>Payment and billing information</li>
          <li>Rental history and preferences</li>
        </ul>
      </div>
      <div className="policy-section">
        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Process your rental reservations and payments</li>
          <li>Communicate with you about your rentals</li>
          <li>Send you promotional offers and updates (with your consent)</li>
          <li>Improve our services and customer experience</li>
        </ul>
      </div>
      <div className="policy-section">
        <h2>3. Information Sharing</h2>
        <p>
          We do not sell or rent your personal information to third parties. We
          may share your information with trusted service providers who assist
          us in operating our business, provided they agree to keep this
          information confidential.
        </p>
      </div>
      <div className="policy-section">
        <h2>4. Data Security</h2>
        <p>
          We implement appropriate security measures to protect your personal
          information from unauthorized access, alteration, disclosure, or
          destruction. However, no method of transmission over the Internet is
          100% secure.
        </p>
      </div>
      <div className="policy-section">
        <h2>5. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access and receive a copy of your personal data</li>
          <li>Correct inaccurate or incomplete information</li>
          <li>Request deletion of your personal data</li>
          <li>Opt-out of marketing communications</li>
          <li>Object to processing of your personal data</li>
        </ul>
      </div>
      <div className="policy-section">
        <h2>6. Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. We will notify
          you of any changes by posting the new policy on this page and updating
          the "Last Updated" date.
        </p>
      </div>
      <div className="policy-section">
        <h2>7. Contact Us</h2>
        <p>
          If you have any questions about this privacy policy, please contact us
          at
          <a href="mailto:privacy@odemine.com">odemine@gmail.com</a> or call us
          at
          <a href="tel:+15551234567">+855 96 765 5334</a>.
        </p>
      </div>
    </>
  );
}
