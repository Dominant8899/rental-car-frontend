import React from "react";

export default function Bigbikes() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style
        dangerouslySetInnerHTML={{
          __html:
            '\n    * {\n      box-sizing: border-box;\n      margin: 0;\n      padding: 0;\n    }\n    body {\n      font-family: "Roboto Condensed", sans-serif;\n      line-height: 1.6;\n      background-color: black;\n    }\n    .page-header {\n      padding : 180px 5%;\n      position: relative;\n      z-index: 1;\n      background:\n        linear-gradient(\n          135deg,\n          rgba(10, 10, 10, 0.95) 0%,\n          rgba(10, 10, 10, 0.6) 50%,\n          rgba(10, 10, 10, 0.85) 100%\n        ),\n        url("image/marcducati.png") center/cover no-repeat;\n    }\n    .page-header-tag {\n      color: var(--red);\n      font-size: 1.5rem;\n    }\n    .page-header h1 {\n      color: var(--red);\n    }\n    .page-header p {\n      color: var(--red);\n      font-size: 18px;\n      font-weight: 600;\n    }\n    .bike-section {\n      width: min(1200px, 95%);\n      margin: 20px auto;\n      padding: 35px 40px;\n      border-radius: 24px;\n      background: rgba(18, 18, 18, 0.88);\n      border: 1px solid rgba(255, 0, 0, 0.12);\n      backdrop-filter: blur(12px);\n      box-shadow:\n        0 0 25px rgba(255, 0, 0, 0.08),\n        0 10px 30px rgba(0, 0, 0, 0.45);\n      transition: 0.35s ease;\n    }\n    .bike-section:hover {\n      transform: translateY(-4px);\n      border-color: rgba(255, 0, 0, 0.25);\n      box-shadow:\n        0 0 30px rgba(255, 0, 0, 0.12),\n        0 15px 40px rgba(0, 0, 0, 0.6);\n    }\n    .bike-section h2 {\n      font-size: 1.6rem;\n      color: var(--red);\n      margin-bottom: 18px;\n      padding: 0;\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      font-weight: 700;\n      letter-spacing: 0.5px;\n      position: relative;\n    }\n    .bike-section h2::before {\n      content: "";\n      width: 5px;\n      height: 28px;\n      border-radius: 10px;\n      background: var(--red);\n    }\n    .bike-section p {\n      color: #d4d4d4;\n      font-size: 1rem;\n      line-height: 1.9;\n      padding: 0;\n      margin-bottom: 18px;\n    }\n    .bike-section ul {\n      list-style: none;\n      padding: 0;\n      margin-top: 10px;\n    }\n    .bike-section li {\n      position: relative;\n      color: #e8e8e8;\n      padding-left: 28px;\n      margin-bottom: 14px;\n      font-size: 1rem;\n      transition: 0.2s ease;\n    }\n    .bike-section h3,\n    b {\n      color: var(--red);\n    }\n    .bike-section li:hover {\n      transform: translateX(4px);\n      color: white;\n    }\n    .bike-section li::before {\n      content: "";\n      position: absolute;\n      left: 0;\n      top: 10px;\n      width: 10px;\n      height: 10px;\n      border-radius: 50%;\n      background: var(--red);\n      box-shadow: 0 0 10px rgba(255, 59, 59, 0.7);\n    }\n    @media (max-width: 768px) {\n      .bike-section {\n        padding: 28px 22px;\n        border-radius: 18px;\n      }\n      .bike-section h2 {\n        font-size: 1.3rem;\n      }\n      .bike-section p,\n      .bike-section li {\n        font-size: 0.95rem;\n        line-height: 1.8;\n      }\n    }\n  ',
        }}
      />
      <header className="page-header">
        <h1>Big Bikes</h1>
        <p>
          Motorcycles with larger engines (typically over 400cc) and higher
          horsepower.
        </p>
      </header>
      <div className="bike-section">
        <h2>1. The Chemistry &amp; Fluid Dynamics (Creating the Charge)</h2>
        <p>
          An engine doesn't just burn liquid gasoline; liquid gas doesn't
          explode easily. It has to be atomized (turned into a fine mist of
          microscopic droplets) and mixed with oxygen at a very precise ratio:
          roughly 14.7 grams of air to 1 gram of fuel (known as the
          stoichiometric ratio).
        </p>
        <ul>
          <li>
            <b>In a Carburetor (Bernoulli's Principle):</b> As the engine's
            piston moves down, it creates a vacuum. Air is sucked through a
            narrow restriction in the carburetor called a venturi. Because the
            tube narrows, the air is forced to speed up drastically. This
            high-speed air creates a low-pressure zone (vacuum) right over a
            tiny tube connected to the fuel bowl. Atmospheric pressure pushes
            the liquid fuel up out of the tube, where the rushing air tears it
            apart into a fine mist.
          </li>
          <li>
            <b>In Fuel Injection (Electronic Control):</b> Modern bikes use
            sensors to measure air temperature, engine speed (RPM), and throttle
            position. A computer (ECU) calculates the exact fuel needed and
            signals an electromagnetic injector nozzle. This nozzle forces fuel
            through microscopic holes at high pressure (often over 40 PSI),
            shooting a perfectly atomized mist directly into the intake port
            right behind the valve.
          </li>
        </ul>
      </div>
      <div className="bike-section">
        <h2>2. Mechanical Synchronization (The Valvetrain)</h2>
        <p>
          Inside the cylinder head, the intake and exhaust valves must open and
          close with microscopic precision relative to the piston’s position. If
          a valve is open at the wrong microsecond, the piston will violently
          smash into it, destroying the engine.
        </p>
        <ul>
          <li>
            <b>The Camshaft:</b> Positioned at the top of the engine (usually
            Dual Overhead Cams, or DOHC), the camshaft features egg-shaped
            lobes. As the camshaft spins, the high point of these lobes pushes
            down on the valves (or on rocker arms) to force them open against
            heavy steel springs.
          </li>
          <li>
            <b>The Timing Chain:</b> The camshaft is locked in perfect sync with
            the bottom of the engine via a heavy-duty steel timing chain
            connected directly to the crankshaft. For every two rotations of the
            crankshaft, the camshaft rotates exactly once.
          </li>
        </ul>
      </div>
      <div className="bike-section">
        <h2>3. Micro-Physics of the 4 Strokes</h2>
        <p>
          Let's zoom into the combustion chamber to see the exact mechanical
          physics of a single cycle at 6,000 RPM (where this entire 4-stroke
          process happens 50 times <i>every second</i>).
        </p>
        <ul>
          <h4>I. The Intake Stroke</h4>
          <li>
            <b>Mechanics:</b> The intake camshaft lobe pushes the intake valve
            down into the cylinder. The piston moves downward from Top Dead
            Center (TDC) to Bottom Dead Center (BDC).
          </li>
          <li>
            <b>Physics:</b> This downward motion increases the volume inside the
            cylinder, creating a powerful vacuum. The outside atmospheric
            pressure forces the air-fuel mix into this low-pressure void.
          </li>
          <h4>II. The Compression Stroke</h4>
          <li>
            <b>Mechanics:</b> The camshaft rotates past its lobe, allowing the
            heavy valve springs to snap the intake valve shut. The piston is
            driven upward by the momentum of the flywheel.
          </li>
          <li>
            <b>Physics:</b> The air-fuel mixture is trapped. As the piston
            rises, it squeezes the volume down by a ratio of about 10:1 or 12:1
            (the compression ratio). Squeezing these molecules together causes
            their temperature to skyrocket, making the molecules highly volatile
            and ready to ignite.
          </li>
          <h4>III. The Power Stroke (Combustion)</h4>
          <li>
            <b>Mechanics:</b> A fraction of a degree before the piston reaches
            the absolute top, the motorcycle's ignition coil sends a massive
            pulse of electricity (up to 40,000 volts) across the tiny gap of the
            spark plug.
          </li>
          <li>
            <b>Physics:</b> This spark creates a plasma arc that ignites the
            compressed gas. It doesn't instantly detonate; instead, a flame
            front expands outward from the plug at incredible speeds. The
            intense heat causes the gases to expand rapidly, creating massive
            pressure (often exceeding 1,000 PSI) that violently hammers the
            piston downward. This downward kinetic energy is what drives the
            motorcycle.
          </li>
          <h4>IV. The Exhaust Stroke</h4>
          <li>
            <b>Mechanics:</b> As the piston nears the bottom, the exhaust
            camshaft lobe pushes the exhaust valve open. The piston's upward
            momentum forces it back up.
          </li>
          <li>
            <b>Physics:</b> The piston acts like a plunger, physically sweeping
            the spent, superheated carbon monoxide and leftover byproducts out
            through the exhaust port, through the catalytic converter (which
            cleans up toxins), and out the muffler.
          </li>
        </ul>
      </div>
      <div className="bike-section">
        <h2>4. The Crankcase (Converting Linear to Rotational Motion)</h2>
        <p>
          The piston moves in a straight line: straight up, straight down. To
          turn a wheel, this must become circular motion.
        </p>
        <ul>
          <li>
            <b>The Connecting Rod:</b> The piston is attached to a steel rod via
            a wrist pin. The bottom of this rod clamps around a journal on the
            <b>crankshaft.</b>
          </li>
          <li>
            <b>The Crank Offset:</b> The camshaft is locked in perfect sync with
            the bottom of the engine via a heavy-duty steel timing chain
            connected directly to the crankshaft. For every two rotations of the
            crankshaft, the camshaft rotates exactly once.
          </li>
        </ul>
      </div>
      <div className="bike-section">
        <h2>5. The Transmission &amp; Wet Clutch (Managing the Power)</h2>
        <p>
          A motorcycle engine spins way too fast (usually 3,000 to 12,000+ RPM)
          to be connected directly to a wheel. If it were, the bike would try to
          launch at 60 MPH instantly and stall.
        </p>
        <ul>
          <h3>How the Clutch Works Actually</h3>
          <p>Most bikes use a multi-plate wet clutch bathed in engine oil.</p>
          <li>
            Inside a basket, there is a stack of alternating rings: Friction
            Plates (keyed to the engine's crankshaft) and
            <b>Steel Plates</b> (keyed to the transmission input shaft).
          </li>
          <li>
            Heavy springs tightly crush these plates together. Friction locks
            them into a single solid unit, transferring power from the engine to
            the transmission.
          </li>
          <li>
            When you pull the handlebar lever, a pushrod physically pushes
            against the springs, releasing the pressure. The plates separate and
            slip past each other, allowing the engine to idle while the wheels
            remain completely still.
          </li>
          <h3>How the Gearbox Works Actually</h3>
          <p>
            Motorcycles use a constant-mesh, sequential gearbox. Unlike a manual
            car where gears slide into each other, all the gear pairs inside a
            motorcycle transmission are always interlocking and spinning.
          </p>
          <li>
            The gears themselves spin freely on the shafts until you shift.
          </li>
          <li>
            When you click the foot shifter, it rotates a metal cylinder with
            grooves cut into it called a <b>shift drum</b>.
          </li>
          <li>
            The grooves move <b>shift forks</b> sideways. These forks slide
            heavy metal collars called <b>dogs</b> along the shaft.
          </li>
          <li>
            The dogs have protruding teeth that lock into the side of a spinning
            gear, locking that specific gear ratio to the drive shaft, sending
            that specific speed and torque profile out to your chain, belt, or
            shaft drive.
          </li>
        </ul>
      </div>
    </>
  );
}
