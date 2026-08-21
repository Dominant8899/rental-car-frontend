import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Offer() {
  const navigate = useNavigate();
  const [promos, setPromos] = useState([]);

  useEffect(() => {
    // Replace with your actual PythonAnywhere API endpoint URL
    fetch("https://odemine.pythonanywhere.com/api/promocode/")
      .then((res) => res.json())
      .then((data) => {
        // Only display active promo codes
        const activePromos = data.filter((p) => p.status === "active");
        setPromos(activePromos);
      })
      .catch((err) => console.error("Error fetching promos:", err));
  }, []);

  const handleApplyOffer = (category, promoCode, discountPercentage) => {
    console.log("Applying offer:", promoCode);

    navigate("/rents", {
      state: {
        filterCategory: category,
        promo: {
          code: promoCode,
          discount: discountPercentage,
        },
      },
    });
  };

  const getFilterCategory = (codename) => {
    const code = codename.toLowerCase();
    if (code.includes("weekend")) return "ev";
    if (code.includes("summer")) return "bike";
    return "all";
  };

  return (
    <div className="offers-page-wrapper">
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Special Offers | Odemine</title>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .offers-page-wrapper {
              font-family: 'Poppins', sans-serif;
              background-color: #0a0a0a;
              color: #ffffff;
              min-height: 100vh;
            }
            .offers-page-wrapper .page-header {
              padding: 180px 5%;
              position: relative;
              z-index: 1;
              background: linear-gradient(135deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.6) 50%, rgba(10,10,10,0.85) 100%), url('/image/bmw.png') center/cover no-repeat;
            }
            .offers-page-wrapper .page-header-tag {
              color: var(--red, #ff003c);
              font-size: 1.5rem;
            }
            .offers-page-wrapper .page-header h1 {
              color: var(--red, #ff003c);
              font-size: 3.5rem;
              margin: 10px 0;
            }   
            .offers-page-wrapper .page-header p {
              color: #aaa;
              font-size: 20px;
              font-weight: 600;
            }
            .offers-page-wrapper .offers-section {
              padding: 80px 5% 100px;
            }
            .offers-page-wrapper .offers-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 24px;
              max-width: 1200px;
              margin: 0 auto;
              align-items: stretch;
            }
            .offers-page-wrapper .offer-card {
              display: flex;
              flex-direction: column;
              background: var(--surface, #151515);
              border: 1px solid var(--border, #222);
              border-radius: 15px;
              overflow: hidden;
              height: 100%;
              position: relative;
              transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
            }
            .offers-page-wrapper .offer-card:hover {
              transform: translateY(-10px);
              border-color: rgba(200,16,46,0.4);
              box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 0 7px rgba(200,16,46,0.2);
            }
            .offers-page-wrapper .offer-top {
              padding: 45px 28px 24px;
              border-bottom: 1px solid var(--border, #222);
              position: relative;
            }
            .offers-page-wrapper .offer-tag {
              font-family: 'Roboto Condensed', sans-serif;
              font-size: 0.65rem;
              letter-spacing: 2.5px;
              text-transform: uppercase;
              color: var(--red, #ff003c);
              display: flex;
              align-items: center;
              gap: 6px;
              margin-bottom: 16px;
            }
            .offers-page-wrapper .offer-top h2 {
              font-family: 'Roboto Condensed', sans-serif;
              font-size: 1.9rem;
              color: #fff;
              line-height: 1.2;
              margin: 0;
            }
            .offers-page-wrapper .offer-discount-pill {
              position: absolute;
              top: 0; right: 0;
              background: var(--red, #ff003c);
              color: #fff;
              font-family: 'Roboto Condensed', sans-serif;
              font-size: 1.2rem;
              letter-spacing: 1px;
              padding: 15px;
              border-radius: 0 0 0 15px;
              line-height: 1.2;
            }
            .offers-page-wrapper .offer-body {
              padding: 28px;
              display: flex;
              flex-direction: column;
              flex-grow: 1;
            }
            .offers-page-wrapper .offer-desc {
              color: #888;
              font-size: 0.93rem;
              line-height: 1.7;
              flex-grow: 1;
              margin-bottom: 24px;
            }
            .offers-page-wrapper .promo-box {
              background: #202020;
              border: 1px dashed rgba(200,16,46,0.35);
              border-radius: 6px;
              padding: 12px 18px;
              margin: 20px 0;
              text-align: center;
            }
            .offers-page-wrapper .promo-box .code {
              font-family: 'Roboto Condensed', sans-serif;
              font-size: 1.3rem;
              letter-spacing: 2px;
              color: var(--red, #ff003c);
              font-weight: bold;
            }
            .offers-page-wrapper .btn-apply {
              width: 100%;
              background: var(--red, #ff003c);
              color: #fff;
              padding: 14px;
              border: none;
              border-radius: 6px;
              font-family: 'Roboto Condensed', sans-serif;
              font-size: 0.85rem;
              font-weight: 700;
              letter-spacing: 2px;
              text-transform: uppercase;
              margin-top: auto;
              cursor: pointer;
              transition: background 0.3s ease, transform 0.3s ease;
            }
            .offers-page-wrapper .btn-apply:hover {
              background: #cc0030;
              transform: translateY(-2px);
            }
            .offers-page-wrapper .featured-tag {
              position: absolute;
              top: 10px; left: 17px;
              background: var(--red, #ff003c);
              color: #fff;
              font-family: 'Roboto Condensed', sans-serif;
              font-size: 0.65rem;
              letter-spacing: 2px;
              text-transform: uppercase;
              padding: 4px 12px;
              border-radius: 5px;
            }
            @media (max-width: 900px) {
              .offers-page-wrapper .offers-grid { grid-template-columns: 1fr 1fr; }
            }
            @media (max-width: 600px) {
              .offers-page-wrapper .offers-grid { grid-template-columns: 1fr; }
            }
          `,
        }}
      />
      <header className="page-header">
        <div className="page-header-tag">Limited Time</div>
        <h1>Special Offers</h1>
        <p>Save more on your next rental with our exclusive deals.</p>
      </header>

      <section className="offers-section">
        <div className="offers-grid">
          {promos.map((p) => {
            // Determine the category based on the promo code name
            const category = getFilterCategory(p.code || "");

            return (
              <div className="offer-card" key={p.id}>
                <div className="offer-top">
                  {/* Show recommended tag if it's the Luxury package or long-term */}
                  {p.code === "LUXURY15" && (
                    <div className="featured-tag">★ Highly Recommend</div>
                  )}
                  {p.code === "LONG30" && (
                    <div className="featured-tag">★ Best Deal</div>
                  )}

                  <div className="offer-tag">
                    <i className="fas fa-circle" /> Special Offer
                  </div>
                  <h2>{p.name}</h2>
                  <div className="offer-discount-pill">
                    {p.discount_percentage}
                    <sup>%</sup>
                    <sub>OFF</sub>
                  </div>
                </div>

                <div className="offer-body">
                  <p className="offer-desc">
                    {p.description ||
                      "Limited time deal. Grab it before it expires!"}
                  </p>
                  <div className="promo-box">
                    <div className="code">{p.code}</div>
                  </div>
                  <button
                    className="btn-apply"
                    onClick={() =>
                      handleApplyOffer(category, p.code, p.discount_percentage)
                    }
                  >
                    APPLY THIS OFFER
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
