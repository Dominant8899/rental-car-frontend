import React from "react";

export default function Fuel() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style
        dangerouslySetInnerHTML={{
          __html:
            '\n    * {\n      box-sizing: border-box;\n      margin: 0;\n      padding: 0;\n    }\n    body {\n      font-family: "Roboto Condensed", sans-serif;\n      line-height: 1.6;\n      background-color: black;\n    }\n    .page-header {\n      padding : 180px 5%;\n      position: relative;\n      z-index: 1;\n      background:\n        linear-gradient(\n          135deg,\n          rgba(10, 10, 10, 0.95) 0%,\n          rgba(10, 10, 10, 0.6) 50%,\n          rgba(10, 10, 10, 0.85) 100%\n        ),\n        url("image/200t.webp") center/cover no-repeat;\n    }\n    .page-header-tag {\n      color: var(--red);\n      font-size: 1.5rem;\n    }\n    .page-header h1 {\n      color: var(--red);\n    }\n    .page-header p {\n      color: var(--red);\n      font-size: 18px;\n      font-weight: 600;\n    }\n    .fuel-section {\n      width: min(1200px, 95%);\n      margin: 20px auto;\n      padding: 35px 40px;\n      border-radius: 24px;\n      background: rgba(18, 18, 18, 0.88);\n      border: 1px solid rgba(255, 0, 0, 0.12);\n      backdrop-filter: blur(12px);\n      box-shadow:\n        0 0 25px rgba(255, 0, 0, 0.08),\n        0 10px 30px rgba(0, 0, 0, 0.45);\n      transition: 0.35s ease;\n    }\n    .fuel-section:hover {\n      transform: translateY(-4px);\n      border-color: rgba(255, 0, 0, 0.25);\n      box-shadow:\n        0 0 30px rgba(255, 0, 0, 0.12),\n        0 15px 40px rgba(0, 0, 0, 0.6);\n    }\n    .fuel-section h2 {\n      font-size: 1.6rem;\n      color: var(--red);\n      margin-bottom: 18px;\n      padding: 0;\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      font-weight: 700;\n      letter-spacing: 0.5px;\n      position: relative;\n    }\n    .fuel-section h2::before {\n      content: "";\n      width: 5px;\n      height: 28px;\n      border-radius: 10px;\n      background: var(--red);\n    }\n    .fuel-section p {\n      color: #d4d4d4;\n      font-size: 1rem;\n      line-height: 1.9;\n      padding: 0;\n      margin-bottom: 18px;\n    }\n    .fuel-section ul {\n      list-style: none;\n      padding: 0;\n      margin-top: 10px;\n    }\n    .fuel-section li {\n      position: relative;\n      color: #e8e8e8;\n      padding-left: 28px;\n      margin-bottom: 14px;\n      font-size: 1rem;\n      transition: 0.2s ease;\n    }\n    .fuel-section b {\n      color: var(--red);\n    }\n    .fuel-section li:hover {\n      transform: translateX(4px);\n      color: white;\n    }\n    .fuel-section li::before {\n      content: "";\n      position: absolute;\n      left: 0;\n      top: 10px;\n      width: 10px;\n      height: 10px;\n      border-radius: 50%;\n      background: var(--red);\n      box-shadow: 0 0 10px rgba(255, 59, 59, 0.7);\n    }\n    @media (max-width: 768px) {\n      .fuel-section {\n        padding: 28px 22px;\n        border-radius: 18px;\n      }\n      .fuel-section h2 {\n        font-size: 1.3rem;\n      }\n      .fuel-section p,\n      .fuel-section li {\n        font-size: 0.95rem;\n        line-height: 1.8;\n      }\n    }\n  ',
        }}
      />
      <header className="page-header">
        <h1>Fuel Car</h1>
        <p>
          Conventional vehicle powered by an Internal Combustion Engine (ICE)
          that runs on refined petroleum products like gasoline or diesel
        </p>
      </header>
      <div className="fuel-section">
        <h2>1. How a Fuel System Works</h2>
        <p>
          The journey of the fuel follows a simple, highly precise mechanical
          pipeline:
        </p>
        <ul>
          <li>
            <b>Storage:</b> Liquid fuel (gasoline or diesel) is safely stored in
            the car's fuel tank, usually located near the rear of the vehicle.
          </li>
          <li>
            <b>Delivery:</b> The fuel pump pulls the fuel out of the tank and
            pushes it through the fuel lines toward the engine.
          </li>
          <li>
            <b>Filtration:</b> The fuel passes through a fuel filter, which
            strips out dirt, debris, and impurities before it reaches the
            engine.
          </li>
          <li>
            <b>Combustion:</b> The fuel is delivered to fuel injectors, which
            spray a precise mist of fuel into the engine's cylinders. Here, the
            fuel mixes with air, gets compressed, and is ignited to create
            power.
          </li>
        </ul>
      </div>
      <div className="fuel-section">
        <h2>2. Common Fuel Types</h2>
        <ul>
          <li>
            <b>Gasoline:</b> The most common fuel for passenger cars. It uses a
            spark plug to ignite the highly compressed air-fuel mixture, causing
            it to burn rapidly and push the engine pistons.
          </li>
          <li>
            <b>Diesel:</b> Commonly used in heavy-duty trucks and larger SUVs.
            Instead of spark plugs, diesel engines compress the air so tightly
            that it generates enough heat to spontaneously ignite the fuel when
            injected.
          </li>
          <li>
            <b>Flex-Fuel (E85):</b> Some flexible-fuel engines are designed to
            run on a mix of regular gasoline and up to 83% ethanol (a
            plant-based fuel).
          </li>
        </ul>
      </div>
      <div className="fuel-section">
        <h2>3. Pros and Cons</h2>
        <ul>
          <li>
            <b>Pros:</b> Fuel cars can be refilled in just a few minutes at a
            station and generally offer longer driving ranges before needing to
            refuel.
          </li>
          <li>
            <b>Cons:</b> They rely on fossil fuels, produce tailpipe emissions
            (greenhouse gases and air pollution), and require more moving parts
            (like oil changes and exhaust systems) compared to electric
            vehicles.
          </li>
        </ul>
      </div>
    </>
  );
}
