import React from "react";

export default function Evcar() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style
        dangerouslySetInnerHTML={{
          __html:
            '\n    * {\n      box-sizing: border-box;\n      margin: 0;\n      padding: 0;\n    }\n    body {\n      font-family: "Roboto Condensed", sans-serif;\n      line-height: 1.6;\n      background-color: black;\n    }\n    .page-header {\n      padding : 180px 5%;\n      position: relative;\n      z-index: 1;\n      background:\n        linear-gradient(\n          135deg,\n          rgba(10, 10, 10, 0.95) 0%,\n          rgba(10, 10, 10, 0.6) 50%,\n          rgba(10, 10, 10, 0.85) 100%\n        ),\n        url("image/bydev.webp") center/cover no-repeat;\n        height: auto;\n    }\n    .page-header-tag {\n      color: var(--red);\n      font-size: 1.5rem;\n    }\n    .page-header h1 {\n      color: var(--red);\n    }\n    .page-header p {\n      color: var(--red);\n      font-size: 18px;\n      font-weight: 600;\n    }\n    .ev-section {\n      width: min(1200px, 95%);\n      margin: 20px auto;\n      padding: 35px 40px;\n      border-radius: 24px;\n      background: rgba(18, 18, 18, 0.88);\n      border: 1px solid rgba(255, 0, 0, 0.12);\n      backdrop-filter: blur(12px);\n      box-shadow:\n        0 0 25px rgba(255, 0, 0, 0.08),\n        0 10px 30px rgba(0, 0, 0, 0.45);\n      transition: 0.35s ease;\n    }\n    .ev-section:hover {\n      transform: translateY(-4px);\n      border-color: rgba(255, 0, 0, 0.25);\n      box-shadow:\n        0 0 30px rgba(255, 0, 0, 0.12),\n        0 15px 40px rgba(0, 0, 0, 0.6);\n    }\n    .ev-section h2 {\n      font-size: 1.6rem;\n      color: var(--red);\n      margin-bottom: 18px;\n      padding: 0;\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      font-weight: 700;\n      letter-spacing: 0.5px;\n      position: relative;\n    }\n    .ev-section h2::before {\n      content: "";\n      width: 5px;\n      height: 28px;\n      border-radius: 10px;\n      background: var(--red);\n    }\n    .ev-section p {\n      color: #d4d4d4;\n      font-size: 1rem;\n      line-height: 1.9;\n      padding: 0;\n      margin-bottom: 18px;\n    }\n    .ev-section ul {\n      list-style: none;\n      padding: 0;\n      margin-top: 10px;\n    }\n    .ev-section li {\n      position: relative;\n      color: #e8e8e8;\n      padding-left: 28px;\n      margin-bottom: 14px;\n      font-size: 1rem;\n      transition: 0.2s ease;\n    }\n    .ev-section b {\n      color: var(--red);\n    }\n    .ev-section li:hover {\n      transform: translateX(4px);\n      color: white;\n    }\n    .ev-section li::before {\n      content: "";\n      position: absolute;\n      left: 0;\n      top: 10px;\n      width: 10px;\n      height: 10px;\n      border-radius: 50%;\n      background: var(--red);\n      box-shadow: 0 0 10px rgba(255, 59, 59, 0.7);\n    }\n    @media (max-width: 768px) {\n      .ev-section {\n        padding: 28px 22px;\n        border-radius: 18px;\n      }\n      .ev-section h2 {\n        font-size: 1.3rem;\n      }\n      .ev-section p,\n      .ev-section li {\n        font-size: 0.95rem;\n        line-height: 1.8;\n      }\n    }\n  ',
        }}
      />
      <header className="page-header">
        <h1>Ev Car</h1>
        <p>
          Runs entirely or partially on electricity instead of burning petrol or
          diesel.
        </p>
      </header>
      <div className="ev-section">
        <h2>1. How they work</h2>
        <p>
          Electric cars operate with remarkably fewer moving parts than
          traditional vehicles.
        </p>
        <ul>
          <li>
            <b>Battery:</b> The heart of the car, which stores electricity
            (usually in lithium-ion cells).
          </li>
          <li>
            <b>Motor:</b> Takes power from the battery and converts it into
            rotational force to turn the wheels.
          </li>
          <li>
            <b>Regenerative Braking:</b> When you take your foot off the
            accelerator or press the brakes, the motor acts as a generator. It
            slows the car down and sends that recovered kinetic energy back to
            the battery to extend your driving range.
          </li>
          <li>
            <b>Single Speed:</b> Most EVs don't have multi-speed gearboxes.
            Acceleration and reverse are handled seamlessly through software and
            motor direction.
          </li>
        </ul>
      </div>
      <div className="ev-section">
        <h2>2. Common EV Types</h2>
        <p>
          While "EV" usually refers to a fully battery-powered car, the term
          encompasses a few different powertrain technologies:
        </p>
        <ul>
          <li>
            <b>Battery Electric Vehicles (BEVs):</b> Fully electric cars that
            run entirely on a battery and must be plugged in to recharge. They
            have no tailpipe or fuel tank.
          </li>
          <li>
            <b>Plug-in Hybrid Electric Vehicles (PHEVs):</b> Feature both an
            electric motor (with a smaller battery) and a traditional petrol or
            diesel engine. You can charge them for short, daily electric drives,
            but the combustion engine takes over on longer trips.
          </li>
          <li>
            <b>Hybrid Electric Vehicles (HEVs):</b> Regular hybrids (like the
            standard Toyota Prius) that use a small battery to assist the engine
            but cannot be plugged in.
          </li>
        </ul>
      </div>
      <div className="ev-section">
        <h2>3. Benefits of Driving an EV</h2>
        <ul>
          <li>
            <b>Cheaper "Fuel":</b> Charging with electricity is often
            significantly cheaper than constantly paying for petrol.
          </li>
          <li>
            <b>Lower Maintenance:</b> Because there are no spark plugs, oil
            changes, or complex exhaust systems, electric cars typically require
            far less routine upkeep.
          </li>
          <li>
            <b>Instant Torque:</b> Electric motors provide maximum pulling power
            the moment you press the pedal, making the car feel incredibly
            responsive.
          </li>
        </ul>
      </div>
    </>
  );
}
