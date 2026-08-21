import React from "react";

export default function Term() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style
        dangerouslySetInnerHTML={{
          __html:
            '\n    * {\n      box-sizing: border-box;\n      margin: 0;\n      padding: 0;\n    }\n    body {\n      font-family: "Roboto Condensed", sans-serif;\n      line-height: 1.6;\n      background-color: black;\n    }\n    .head {\n      padding: 120px 5%;\n      position: relative;\n      background-image: url("image/amgmax.webp");\n      background-size: cover;\n      background-position: center;\n      background-attachment: fixed;\n      z-index: 1;\n    }\n    .head::before {\n      content: "";\n      position: absolute;\n      inset: 0;\n      background: rgba(5, 5, 5, 0.75);\n      z-index: -1;\n    }\n    .page-header {\n      position: relative;\n      z-index: 2;\n      background: transparent !important;\n      height: auto;\n    }\n    .page-header-tag {\n      color: var(--red);\n      font-size: 1.5rem;\n    }\n    .page-header h1 {\n      color: var(--red);\n    }\n    .page-header p {\n      color: var(--red);\n      font-size: 18px;\n      font-weight: 600;\n    }\n    .term-section {\n      width: min(1200px, 95%);\n      margin: 20px auto;\n      padding: 35px 40px;\n      border-radius: 24px;\n      background: rgba(18, 18, 18, 0.88);\n      border: 1px solid rgba(255, 0, 0, 0.12);\n      backdrop-filter: blur(12px);\n      box-shadow:\n        0 0 25px rgba(255, 0, 0, 0.08),\n        0 10px 30px rgba(0, 0, 0, 0.45);\n      transition: 0.35s ease;\n    }\n    .term-section:hover {\n      transform: translateY(-4px);\n      border-color: rgba(255, 0, 0, 0.25);\n      box-shadow:\n        0 0 30px rgba(255, 0, 0, 0.12),\n        0 15px 40px rgba(0, 0, 0, 0.6);\n    }\n    .term-section h2 {\n      font-size: 1.6rem;\n      color: var(--red);\n      margin-bottom: 18px;\n      padding: 0;\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      font-weight: 700;\n      letter-spacing: 0.5px;\n      position: relative;\n    }\n    .term-section h2::before {\n      content: "";\n      width: 5px;\n      height: 28px;\n      border-radius: 10px;\n      background: var(--red);\n    }\n    .term-section p {\n      color: #d4d4d4;\n      font-size: 1rem;\n      line-height: 1.9;\n      padding: 0;\n      margin-bottom: 18px;\n    }\n    .term-section ul {\n      list-style: none;\n      padding: 0;\n      margin-top: 10px;\n    }\n    .term-section li {\n      position: relative;\n      color: #e8e8e8;\n      padding-left: 28px;\n      margin-bottom: 14px;\n      font-size: 1rem;\n      transition: 0.2s ease;\n    }\n    .term-section li:hover {\n      transform: translateX(4px);\n      color: white;\n    }\n    .term-section li::before {\n      content: "";\n      position: absolute;\n      left: 0;\n      top: 10px;\n      width: 10px;\n      height: 10px;\n      border-radius: 50%;\n      background: var(--red);\n      box-shadow: 0 0 10px rgba(255, 59, 59, 0.7);\n    }\n    .term-section a {\n      color: var(--red);\n      text-decoration: none;\n      font-weight: 600;\n      position: relative;\n      transition: 0.25s ease;\n    }\n    .term-section a::after {\n      content: "";\n      position: absolute;\n      left: 0;\n      bottom: -3px;\n      width: 0%;\n      height: 2px;\n      background: #ff3b3b;\n      transition: 0.3s ease;\n    }\n\n    .term-section a:hover {\n      color: var(--red);\n    }\n\n    .term-section a:hover::after {\n      width: 100%;\n    }\n    @media (max-width: 768px) {\n      .term-section {\n        padding: 28px 22px;\n        border-radius: 18px;\n      }\n      .term-section h2 {\n        font-size: 1.3rem;\n      }\n      .term-section p,\n      .term-section li {\n        font-size: 0.95rem;\n        line-height: 1.8;\n      }\n    }\n  ',
        }}
      />
      <div className="head">
        <header className="page-header">
          <h1>Terms and Conditions</h1>
          <p>Last update 16 January 2026.</p>
        </header>
      </div>
      <div className="term-section">
        <h2>1. Rental Agreement</h2>
        <p>
          By renting a vehicle from Odemine, you agree to comply with all terms
          and conditions outlined in this agreement. The rental period begins
          when you receive the vehicle and ends when you return it to our
          designated location.
        </p>
      </div>
      <div className="term-section">
        <h2>2. Driver Requirements</h2>
        <p>All drivers must meet the following requirements:</p>
        <ul>
          <li>
            Be at least 21 years old (25 for luxury vehicles and big bikes)
          </li>
          <li>Hold a valid driver's license for at least 2 years</li>
          <li>Provide valid identification and proof of insurance</li>
          <li>Pass our verification process</li>
        </ul>
      </div>
      <div className="term-section">
        <h2>3. Payment Terms</h2>
        <p>
          Payment is due at the time of rental. We accept major credit cards and
          debit cards. A security deposit may be required depending on the
          vehicle category. The deposit will be refunded upon successful return
          of the vehicle in its original condition.
        </p>
      </div>
      <div className="term-section">
        <h2>4. Insurance Coverage</h2>
        <p>
          All rentals include basic insurance coverage. Additional coverage
          options are available for purchase. Renters are responsible for any
          damages not covered by insurance.
        </p>
      </div>
      <div className="term-section">
        <h2>5. Cancellation Policy</h2>
        <p>
          Cancellations made 48 hours before the rental start time will receive
          a full refund. Cancellations made within 48 hours may be subject to a
          cancellation fee.
        </p>
      </div>
      <div className="term-section">
        <h2>6. Vehicle Use</h2>
        <p>Rental vehicles must not be used for:</p>
        <ul>
          <li>Illegal activities</li>
          <li>Racing or competitive events</li>
          <li>Towing or pushing other vehicles</li>
          <li>Transporting hazardous materials</li>
          <li>Subletting or unauthorized commercial use</li>
        </ul>
      </div>
      <div className="term-section">
        <h2>7. Liability</h2>
        <p>
          Renters are liable for all traffic violations, parking tickets, and
          toll charges incurred during the rental period. Any damage to the
          vehicle must be reported immediately.
        </p>
      </div>
    </>
  );
}
