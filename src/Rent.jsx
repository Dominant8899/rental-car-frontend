import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { useLocation, useNavigate } from "react-router-dom";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Receipt } from "./Receipt";
import vehiclesData from "./Vehicledata";

export default function RentVehicle({ user }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([]);

  const [bookings, setBookings] = useState([]); // Track active rentals from backend
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortValue, setSortValue] = useState("default");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // Track active promo details including its true database integer ID
  const [activePromo, setActivePromo] = useState(null);

  // Form Field States for Dates
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");

  // Separated Time Selection States
  const [pickupHour, setPickupHour] = useState("06");
  const [pickupMin, setPickupMin] = useState("00");
  const [pickupAmPm, setPickupAmPm] = useState("AM");

  const [dropoffHour, setDropoffHour] = useState("06");
  const [dropoffMin, setDropoffMin] = useState("00");
  const [dropoffAmPm, setDropoffAmPm] = useState("PM");

  const [paymentMethod, setPaymentMethod] = useState("aba");
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");
  const [receiptData, setReceiptData] = useState(null);

  const pickupDateRef = useRef(null);
  const dropoffDateRef = useRef(null);

  // Dropdown Option Arrays
  const hours = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const minutes = ["00", "15", "30", "45"];

  // Helper function modified to STRICTLY return null if no session is detected
  const getLoggedInUserEmail = () => {
    if (user && user.email) return user.email;

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed && parsed.email) return parsed.email;
      } catch (e) {
        // Not JSON
      }
    }

    const plainEmail =
      localStorage.getItem("email") || localStorage.getItem("userEmail");
    if (plainEmail && plainEmail !== "customer@example.com") {
      return plainEmail;
    }

    return null; // Strict return null if not logged in
  };

  const loadVehicles = async () => {
    try {
      const response = await fetch(
        "https://odemine.pythonanywhere.com/api/vehicles/",
      );
      if (response.ok) {
        const data = await response.json();
        setVehicles(data); // This triggers the UI to update with your backend fleet data
      }
    } catch (err) {
      console.error("Failed to fetch vehicles", err);
    }
  };

  // Fetch live bookings list from backend to know which cars are rented out
  const fetchBookingsList = async () => {
    try {
      const response = await fetch(
        "https://odemine.pythonanywhere.com/api/booking/",
      );
      if (response.ok) {
        const data = await response.json();
        setBookings(Array.isArray(data) ? data : data.results || []);
      }
    } catch (err) {
      console.error("Error fetching booking registry updates:", err);
    }
  };

  useEffect(() => {
    loadVehicles();
    fetchBookingsList();
  }, []);

  const validatePromoCode = (codeName, currentVehicle, pDate, dDate) => {
    const code = (codeName || "").trim().toUpperCase();
    if (!code) return { valid: true, error: "" };

    let diffDays = 0;
    let dayOfWeek = -1; // 0=Sunday, 1=Monday, ..., 5=Friday, 6=Saturday
    if (pDate && dDate) {
      const start = new Date(pDate);
      const end = new Date(dDate);
      const diffTime = Math.abs(end - start);
      diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
      dayOfWeek = start.getDay();
    }

    const activeUserEmail = getLoggedInUserEmail();

    if (code === "LONG30") {
      if (pDate && dDate && diffDays < 10) {
        return {
          valid: false,
          error:
            "Code 'long30' can only be used when booking for 10 days or up.",
        };
      }
    } else if (code === "WEEKEND20") {
      if (currentVehicle && currentVehicle.type !== "ev") {
        return {
          valid: false,
          error: "Code 'weekend20' can only be used for EV cars.",
        };
      }
      if (pDate && dayOfWeek !== 0 && dayOfWeek !== 5 && dayOfWeek !== 6) {
        return {
          valid: false,
          error:
            "Code 'weekend20' applies only to weekend bookings (Friday, Saturday, Sunday).",
        };
      }
    } else if (code === "WEEKDAY25") {
      if (pDate && (dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6)) {
        return {
          valid: false,
          error:
            "Code 'weekday25' applies only to weekday bookings (Monday to Thursday).",
        };
      }
    } else if (code === "NEW50") {
      const hasPreviousBooking = bookings.some(
        (b) => b.email === activeUserEmail,
      );
      if (hasPreviousBooking) {
        return {
          valid: false,
          error:
            "Code 'new50' is strictly for new customers on their first booking.",
        };
      }
    } else if (code === "SUMMERRIDE") {
      if (currentVehicle && currentVehicle.type !== "bike") {
        return {
          valid: false,
          error: "Code 'summerride' can only be used for big bike rentals.",
        };
      }
      if (pDate && dDate && diffDays < 10) {
        return {
          valid: false,
          error:
            "Code 'summerride' requires a rental duration of 10 days or up.",
        };
      }
    } else if (code === "LUXURY15") {
      if (currentVehicle && currentVehicle.price < 500) {
        return {
          valid: false,
          error:
            "Code 'luxury15' is only valid for premium vehicles priced from $500 up.",
        };
      }
    }

    return { valid: true, error: "" };
  };

  useEffect(() => {
    if (location.state) {
      if (location.state.filterCategory) {
        setSelectedFilter(location.state.filterCategory);
      }
      if (location.state.promo) {
        const { code, discount, id } = location.state.promo;
        setActivePromo({
          id: id || null,
          code: code,
          discount: discount / 100,
        });
        setPromoInput(code);
      }
    }
  }, [location.state]);

  useEffect(() => {
    if (activePromo && selectedVehicle) {
      const check = validatePromoCode(
        activePromo.code,
        selectedVehicle,
        pickupDate,
        dropoffDate,
      );
      if (!check.valid) {
        setPromoError(check.error);
        setActivePromo(null);
      } else {
        setPromoError("");
      }
    }
  }, [pickupDate, dropoffDate, activePromo, selectedVehicle]);

  useEffect(() => {
    if (selectedVehicle) {
      const fpPickup = flatpickr(pickupDateRef.current, {
        minDate: "today",
        dateFormat: "Y-m-d",
        onChange: (selectedDates, dateStr) => {
          setPickupDate(dateStr);
          if (fpDropoff) {
            fpDropoff.set("minDate", dateStr);
          }
        },
      });

      const fpDropoff = flatpickr(dropoffDateRef.current, {
        minDate: "today",
        dateFormat: "Y-m-d",
        onChange: (selectedDates, dateStr) => {
          setDropoffDate(dateStr);
        },
      });

      return () => {
        if (fpPickup) fpPickup.destroy();
        if (fpDropoff) fpDropoff.destroy();
      };
    }
  }, [selectedVehicle]);

  const isVehicleCurrentlyRented = (vehicleName) => {
    if (!bookings || bookings.length === 0) return false;

    return bookings.some((b) => {
      const currentBookingVehicle = (b.vehicle || b.vehicle_name || "")
        .trim()
        .toLowerCase();
      const targetVehicleName = (vehicleName || "").trim().toLowerCase();

      const matchesName = currentBookingVehicle === targetVehicleName;
      const currentStatus = (b.status || "").toLowerCase().trim();

      const isCurrentlyActive =
        currentStatus === "renting" || currentStatus === "booking";

      return matchesName && isCurrentlyActive;
    });
  };

  const handleOpenModal = (vehicle) => {
    const activeUserEmail = getLoggedInUserEmail();
    if (!activeUserEmail) {
      alert("Please log in to your account first before renting a vehicle.");
      navigate("/login");
      return;
    }

    setSelectedVehicle(vehicle);
    if (!location.state?.promo) {
      setActivePromo(null);
      setPromoInput("");
    }
    setPickupDate("");
    setDropoffDate("");
    setPromoError("");
  };

  const handleCloseModal = () => {
    setSelectedVehicle(null);
  };

  const calculateTotalCost = () => {
    if (!pickupDate || !dropoffDate || !selectedVehicle) return 0;
    const start = new Date(pickupDate);
    const end = new Date(dropoffDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

    let cost = diffDays * selectedVehicle.price;
    if (activePromo) {
      cost = cost * (1 - activePromo.discount);
    }
    return Math.round(cost);
  };

  // --- CAPTURING BACKEND DB PROMO ID ---
  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (!code) return;

    // Local dictionary matching your coupon rules
    const localPromos = {
      LONG30: { discount: 0.3 },
      WEEKEND20: { discount: 0.2 },
      WEEKDAY25: { discount: 0.25 },
      NEW50: { discount: 0.5 },
      SUMMERRIDE: { discount: 0.2 },
      LUXURY15: { discount: 0.15 },
    };

    if (localPromos[code]) {
      const promoData = localPromos[code];

      // Runs your custom frontend checks (vehicle type, dates, etc.)
      const check = validatePromoCode(
        code,
        selectedVehicle,
        pickupDate,
        dropoffDate,
      );

      if (!check.valid) {
        setPromoError(check.error);
        setActivePromo(null);
        return;
      }

      // Success! Save the applied promo directly to your React state
      setActivePromo({
        id: null, // No database foreign key needed
        code: code,
        discount: promoData.discount,
      });
      setPromoError("");
    } else {
      setPromoError("Invalid promotional coupon code.");
      setActivePromo(null);
    }
  };
  // --- FIXED POST PAYLOAD METHOD ---
  const handleConfirmBooking = async (e) => {
    e.preventDefault();

    const activeUserEmail = getLoggedInUserEmail();
    if (!activeUserEmail) {
      alert("Please log in to your account first before renting a vehicle.");
      navigate("/login");
      return;
    }

    if (!pickupDate || !dropoffDate) {
      alert("Please select both your pick-up and drop-off dates.");
      return;
    }

    const formattedPickupTime = `${pickupHour}:${pickupMin} ${pickupAmPm}`;
    const formattedDropoffTime = `${dropoffHour}:${dropoffMin} ${dropoffAmPm}`;

    const readablePayment =
      paymentMethod === "aba"
        ? "ABA Bank"
        : paymentMethod === "acleda"
          ? "ACLEDA Bank"
          : "On Cash";

    // Ensure unit price is parsed strictly as a base-10 base number
    const basePrice = Number(selectedVehicle.price);
    const cleanUnitPrice = isNaN(basePrice)
      ? parseInt(String(selectedVehicle.price).replace(/[^0-9]/g, ""), 10) || 0
      : basePrice;

    // Calculate final cost cleanly, ensuring an absolute fallback baseline integer
    const computedTotal = calculateTotalCost();
    const cleanTotalCost =
      typeof computedTotal === "number" && !isNaN(computedTotal)
        ? Math.round(computedTotal)
        : 0;

    // Build the payload mapping structural match to standard bookings
    const bookingPayload = {
      email: activeUserEmail,
      vehicle: selectedVehicle.name,
      pickup_date: `${pickupDate} ${formattedPickupTime}`,
      dropoff_date: `${dropoffDate} ${formattedDropoffTime}`,
      unit_price: cleanUnitPrice,
      payment_method: readablePayment,
      total_cost: cleanTotalCost,
      status: "booking",
    };

    // Keep backend completely unaware of the coupon parameter string to avoid 500 collision
    // Your React receipt state below still renders it locally!

    try {
      const response = await fetch(
        "https://odemine.pythonanywhere.com/api/booking/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingPayload),
        },
      );

      if (response.ok) {
        const data = await response.json();
        const receiptDataFormat = {
          id: data.id || "Pending",
          customerEmail: activeUserEmail,
          customerPhone: localStorage.getItem("userPhone") || "No Phone Data",
          customerName: localStorage.getItem("userFullname") || "No Name Data",
          vehicle: data.vehicle || selectedVehicle.name,
          pickupDate: pickupDate,
          pickupTime: formattedPickupTime,
          dropoffDate: dropoffDate,
          dropoffTime: formattedDropoffTime,
          promoCode: activePromo ? activePromo.code : "None",
          discountPercent: activePromo ? activePromo.discount * 100 : 0,
          subTotal: Math.ceil(
            cleanTotalCost / (activePromo ? 1 - activePromo.discount : 1),
          ),
          paymentMethod: data.payment_method || readablePayment,
          totalCost: data.total_cost || cleanTotalCost,
        };

        setReceiptData(receiptDataFormat);
        if (typeof fetchBookingsList === "function") {
          fetchBookingsList();
        }
        handleCloseModal();
      } else {
        alert(
          "Server error window. Please check your network backend container.",
        );
      }
    } catch (err) {
      alert(
        "Could not connect to backend server. Verify your configuration settings.",
      );
    }
  };

  const handleCloseReceipt = () => {
    setReceiptData(null);
  };

  const filteredVehicles = vehicles.filter((v) => {
    if (selectedFilter === "all") return true;
    return v.type === selectedFilter;
  });

  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    if (sortValue === "low-high") return a.price - b.price;
    if (sortValue === "high-low") return b.price - a.price;
    if (sortValue === "az") return a.name.localeCompare(b.name);
    if (sortValue === "za") return b.name.localeCompare(a.name);
    return 0;
  });

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .page-header { padding: 180px 5%; position: relative; z-index: 1; background: linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(10, 10, 10, 0.6) 50%, rgba(10, 10, 10, 0.85) 100%), url("image/gt3.jpg") center/cover no-repeat; }
        .page-header-tag { color: #ff003c; font-size: 1.5rem; }
        .page-header h1 { color: #ff003c; font-size: 3.5rem; }
        .page-header p { color: #aaa; font-size: 20px; font-weight: 600; }
        .rents-section { padding: 80px 5%; background-color: #0a0a0a; color: white; min-height: 100vh;}
        .fil-sort { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; margin-bottom: 50px; }
        .filter-bar { display: flex; flex-wrap: wrap; gap: 12px; }
        .filter-btn { padding: 10px 20px; border-radius: 30px; border: 1px solid #222; background: #141414; color: #888; cursor: pointer; transition: 0.3s ease; }
        .filter-btn:hover, .filter-btn.active { background: #ff003c; color: white; }
        .sort-container { display: flex; align-items: center; gap: 15px; }
        .sort-label { color: #888; }
        .custom-select-wrapper { position: relative; width: 220px; }
        .custom-select-trigger { display: flex; justify-content: space-between; align-items: center; background: #1a1a1a; border: 1px solid #222; padding: 12px 18px; border-radius: 12px; cursor: pointer; transition: 0.3s ease; }
        .custom-select-trigger:hover { border-color: #ff003c; }
        .custom-options { position: absolute; top: 110%; left: 0; width: 100%; background: #161616; border-radius: 12px; overflow: hidden; opacity: 0; visibility: hidden; transform: translateY(-10px); transition: 0.2s ease; z-index: 10; list-style: none; padding:0; border: 1px solid #222;}
        .custom-select-wrapper.open .custom-options { opacity: 1; visibility: visible; transform: translateY(0); }
        .custom-option { padding: 14px 18px; cursor: pointer; transition: 0.2s ease; color: #ccc;}
        .custom-option:hover, .custom-option.selected { background: #ff003c; color: white; }
        .vehicle-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; }
        .vehicle-card { background: #141414; border-radius: 12px; overflow: hidden; border: 1px solid #222; transition: 0.3s ease; }
        .vehicle-card:hover { transform: translateY(-6px); }
        .vehicle-img { height: 240px; background-size: cover; background-position: center; position: relative; }
        .vehicle-avail { position: absolute; top: 15px; right: 15px; background: rgba(73, 248, 73, 0.6); padding: 8px 14px; border-radius: 30px; font-size: 12px; color: black; font-weight: bold;}
        .vehicle-info { padding: 24px; }
        .vehicle-info h3 { font-size: 24px; margin-bottom: 5px;}
        .vehicle-model { color: #888; margin-top: 6px; }
        .vehicle-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 25px; }
        .amount { font-size: 34px; font-weight: bold; }
        .per { color: #888; }
        .btn-rent { background: #ff003c; color: white; border: none; padding: 12px 22px; border-radius: 10px; cursor: pointer; transition: 0.2s ease; font-weight: bold;}
        .btn-rent:hover { background: #cc0030; }
        
        .booking-form { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.85); display: flex; justify-content: center; align-items: center; z-index: 9999; }
        .booking-form-content { background: #111; padding: 25px 25px 40px 25px; border-radius: 16px; width: 420px; max-height: 90vh; overflow-y: auto; position: relative; border: 1px solid #ff003c; }
        .close-btn { position: absolute; top: 15px; right: 20px; font-size: 28px; cursor: pointer; color: #fff; }
        .close-btn:hover { color: #ff003c; }
        .booking-header h2 { color: #ff003c; font-size: 28px; margin-bottom: 5px; }
        .booking-header h3 { font-size: 22px; margin-bottom: 5px; color: #fff; }
        .booking-header p { color: #888; margin-bottom: 25px; }
        
        .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px;}
        .form-group label { font-size: 12px; color: #aaa; text-transform: uppercase; letter-spacing: 1px; }
        .form-group input, .form-group select { background: #0a0a0a; border: 1px solid #333; color: white; padding: 10px; border-radius: 8px; outline: none; font-size: 14px; width: 100%; box-sizing: border-box; }
        .form-group input:focus, .form-group select:focus { border-color: #ff003c; }
        .form-group select option { background: #111; color: #fff; }
        
        .time-select-row { display: flex; gap: 8px; width: 100%; }

        .payment-method { margin-top: 20px; margin-bottom: 20px;}
        .payment-method h4 { color: #fff; margin-bottom: 15px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }
        .payment-options { display: flex; flex-direction: column; gap: 12px; margin-bottom: 15px; }
        .payment-option { display: flex; align-items: center; gap: 10px; cursor: pointer; color: #ccc; font-size: 15px; }
        .payment-option input[type="radio"] { accent-color: #ff003c; transform: scale(1.2); cursor: pointer; }
        
        .qr-box { background: #0a0a0a; padding: 15px; border-radius: 8px; border: 1px dashed #ff003c; margin: 15px auto 0 auto; width: fit-content; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .qr-box img { width: 140px; height: 140px; object-fit: contain; margin-bottom: 8px; border-radius: 4px; }
        .qr-box p { color: #888; font-size: 13px; text-align: center; }
        
        .promo-section { margin-top: 15px; border-top: 1px dashed #2a2a2a; padding-top: 15px;}
        .promo-input-group { display: flex; gap: 10px; margin-top: 5px;}
        .btn-promo { background: #222; border: 1px solid #333; color: #fff; padding: 0 15px; border-radius: 8px; cursor: pointer;}
        .btn-promo:hover { background: #ff003c; border-color: #ff003c;}

        .button-row { display: flex; gap: 15px; margin-top: 20px;}
        .confirm-btn { background: #ff003c; color: white; border: none; padding: 14px; width: 100%; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer; transition: background 0.2s; }
        .confirm-btn:hover { background: #c3002e; }
        .cancel-btn { background: #222; color: white; border: 1px solid #333; padding: 14px; width: 100%; border-radius: 8px; font-size: 16px; cursor: pointer;}

        .flatpickr-calendar { background: #000000 !important; border: 1px solid #ff003c !important; box-shadow: 0 4px 20px rgba(255,0,60,0.2) !important; color: #ff003c !important;}
        .flatpickr-calendar::before, .flatpickr-calendar::after { border-bottom-color: #ff003c !important; }
        .flatpickr-months .flatpickr-month { background: #000000 !important; color: #ff003c !important; fill: #ff003c !important;}
        .flatpickr-current-month select, .flatpickr-current-month input { color: #ff003c !important; background: #000000 !important; }
        .flatpickr-months .flatpickr-prev-month, .flatpickr-months .flatpickr-next-month { color: #ff003c !important; fill: #ff003c !important; }
        .flatpickr-months .flatpickr-prev-month:hover, .flatpickr-months .flatpickr-next-month:hover { color: #fff !important; fill: #fff !important; }
        span.flatpickr-weekday { background: #000000 !important; color: #ffffff !important; font-weight: bold !important; }
        .flatpickr-day { color: #ff003c !important; background: transparent !important; border-radius: 50% !important;}
        .flatpickr-day:hover, .flatpickr-day.prevMonthDay:hover, .flatpickr-day.nextMonthDay:hover { background: #222222 !important; color: #ffffff !important; border-color: #222222 !important; }
        .flatpickr-day.prevMonthDay, .flatpickr-day.nextMonthDay { color: #55111b !important; }
        .flatpickr-day.selected, .flatpickr-day.selected:hover { background: #ff003c !important; color: #ffffff !important; border-color: #ff003c !important; font-weight: bold !important;}
        .flatpickr-day.today { border-color: #ff003c !important; }
        .flatpickr-day.disabled, .flatpickr-day.disabled:hover { color: #222222 !important; background: transparent !important; }
      `,
        }}
      />

      <header className="page-header">
        <div className="page-header-tag">Our Fleet</div>
        <h1>Rent A Vehicle</h1>
        <p>
          Browse our full fleet of EVs, fuel cars, and big bikes. Pick your
          ride.
        </p>
      </header>

      <section className="rents-section">
        <div className="fil-sort">
          <div className="filter-bar">
            <button
              className={`filter-btn ${selectedFilter === "all" ? "active" : ""}`}
              onClick={() => setSelectedFilter("all")}
            >
              All Vehicles
            </button>
            <button
              className={`filter-btn ${selectedFilter === "ev" ? "active" : ""}`}
              onClick={() => setSelectedFilter("ev")}
            >
              <i className="fas fa-bolt" /> EV Cars
            </button>
            <button
              className={`filter-btn ${selectedFilter === "fuel" ? "active" : ""}`}
              onClick={() => setSelectedFilter("fuel")}
            >
              <i className="fas fa-gas-pump" /> Fuel Cars
            </button>
            <button
              className={`filter-btn ${selectedFilter === "bike" ? "active" : ""}`}
              onClick={() => setSelectedFilter("bike")}
            >
              <i className="fas fa-motorcycle" /> Big Bikes
            </button>
          </div>

          <div className="sort-container">
            <span className="sort-label">SORT BY:</span>
            <div
              className={`custom-select-wrapper ${dropdownOpen ? "open" : ""}`}
            >
              <div
                className="custom-select-trigger"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span>
                  {sortValue === "default" && "Default"}
                  {sortValue === "low-high" && "Low to High Price"}
                  {sortValue === "high-low" && "High to Low Price"}
                  {sortValue === "az" && "A-Z"}
                  {sortValue === "za" && "Z-A"}
                </span>
                <i
                  className="fas fa-chevron-down"
                  style={{ fontSize: "12px", color: "#888" }}
                />
              </div>
              <ul className="custom-options">
                <li
                  className={`custom-option ${sortValue === "default" ? "selected" : ""}`}
                  onClick={() => {
                    setSortValue("default");
                    setDropdownOpen(false);
                  }}
                >
                  Default
                </li>
                <li
                  className={`custom-option ${sortValue === "low-high" ? "selected" : ""}`}
                  onClick={() => {
                    setSortValue("low-high");
                    setDropdownOpen(false);
                  }}
                >
                  Low to High Price
                </li>
                <li
                  className={`custom-option ${sortValue === "high-low" ? "selected" : ""}`}
                  onClick={() => {
                    setSortValue("high-low");
                    setDropdownOpen(false);
                  }}
                >
                  High to Low Price
                </li>
                <li
                  className={`custom-option ${sortValue === "az" ? "selected" : ""}`}
                  onClick={() => {
                    setSortValue("az");
                    setDropdownOpen(false);
                  }}
                >
                  A-Z
                </li>
                <li
                  className={`custom-option ${sortValue === "za" ? "selected" : ""}`}
                  onClick={() => {
                    setSortValue("za");
                    setDropdownOpen(false);
                  }}
                >
                  Z-A
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="vehicle-grid">
          {sortedVehicles
            .filter((vehicle) => !isVehicleCurrentlyRented(vehicle.name))
            .map((vehicle) => (
              <div className="vehicle-card" key={vehicle.id}>
                <div
                  className="vehicle-img"
                  style={{
                    backgroundImage: `url(${vehicle.image || "image/gt3.jpg"})`,
                  }}
                >
                  <div className="vehicle-avail">Available</div>
                </div>
                <div className="vehicle-info">
                  <h3>{vehicle.name}</h3>
                  <p className="vehicle-model">Standard Range · 2024</p>
                  <div className="vehicle-footer">
                    <div className="vehicle-price">
                      <div className="amount">${vehicle.price}</div>
                      <div className="per">/ day</div>
                    </div>
                    <button
                      className="btn-rent"
                      onClick={() => handleOpenModal(vehicle)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {selectedVehicle && (
          <div className="booking-form" onClick={handleCloseModal}>
            <div
              className="booking-form-content"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="close-btn" onClick={handleCloseModal}>
                &times;
              </span>
              <div className="booking-header">
                <h2>Book Vehicle</h2>
                <h3>{selectedVehicle.name}</h3>
                <p>${selectedVehicle.price} / day</p>
              </div>

              <form onSubmit={handleConfirmBooking}>
                <div className="form-group">
                  <label>Pick-up Date</label>
                  <input
                    type="text"
                    ref={pickupDateRef}
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    placeholder="Select Pick-up Date"
                    autoComplete="off"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Pick-up Time</label>
                  <div className="time-select-row">
                    <select
                      value={pickupHour}
                      onChange={(e) => setPickupHour(e.target.value)}
                    >
                      {hours.map((h) => (
                        <option key={`ph-${h}`} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>
                    <select
                      value={pickupMin}
                      onChange={(e) => setPickupMin(e.target.value)}
                    >
                      {minutes.map((m) => (
                        <option key={`pm-${m}`} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                    <select
                      value={pickupAmPm}
                      onChange={(e) => setPickupAmPm(e.target.value)}
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Drop-off Date</label>
                  <input
                    type="text"
                    ref={dropoffDateRef}
                    value={dropoffDate}
                    onChange={(e) => setDropoffDate(e.target.value)}
                    placeholder="Select Drop-off Date"
                    autoComplete="off"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Drop-off Time</label>
                  <div className="time-select-row">
                    <select
                      value={dropoffHour}
                      onChange={(e) => setDropoffHour(e.target.value)}
                    >
                      {hours.map((h) => (
                        <option key={`dh-${h}`} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>
                    <select
                      value={dropoffMin}
                      onChange={(e) => setDropoffMin(e.target.value)}
                    >
                      {minutes.map((m) => (
                        <option key={`dm-${m}`} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                    <select
                      value={dropoffAmPm}
                      onChange={(e) => setDropoffAmPm(e.target.value)}
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>

                <div className="payment-method">
                  <h4>Payment Method</h4>
                  <div className="payment-options">
                    <label className="payment-option">
                      <input
                        type="radio"
                        name="payment"
                        value="aba"
                        checked={paymentMethod === "aba"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span>ABA Bank</span>
                    </label>

                    <label className="payment-option">
                      <input
                        type="radio"
                        name="payment"
                        value="acleda"
                        checked={paymentMethod === "acleda"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span>ACLEDA Bank</span>
                    </label>

                    <label className="payment-option">
                      <input
                        type="radio"
                        name="payment"
                        value="cash"
                        checked={paymentMethod === "cash"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span>On Cash</span>
                    </label>
                  </div>

                  {paymentMethod === "aba" && (
                    <div className="qr-box">
                      <img src="/image/aba-qr.JPG" alt="ABA QR Code" />
                      <p>Scan ABA QR to complete payment</p>
                    </div>
                  )}

                  {paymentMethod === "acleda" && (
                    <div className="qr-box">
                      <img src="/image/acleda-qr.PNG" alt="ACLEDA QR Code" />
                      <p>Scan ACLEDA QR to complete payment</p>
                    </div>
                  )}

                  {paymentMethod === "cash" && (
                    <p>Pay on cash whenever pick up the vehicle</p>
                  )}
                </div>

                <div className="promo-section">
                  <label
                    style={{
                      fontSize: "12px",
                      color: "#aaa",
                      textTransform: "uppercase",
                    }}
                  >
                    Promotional Code
                  </label>
                  <div className="promo-input-group">
                    <input
                      type="text"
                      style={{
                        background: "#0a0a0a",
                        border: "1px solid #333",
                        color: "#fff",
                        padding: "10px",
                        borderRadius: "8px",
                        flexGrow: 1,
                      }}
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Enter promo code"
                    />
                    <button
                      type="button"
                      className="btn-promo"
                      onClick={handleApplyPromo}
                    >
                      Apply
                    </button>
                  </div>
                  {activePromo && (
                    <p
                      style={{
                        color: "#49f849",
                        fontSize: "13px",
                        marginTop: "5px",
                      }}
                    >
                      ✓ Coupon Code Applied: {activePromo.code} (
                      {activePromo.discount * 100}% Off)
                    </p>
                  )}
                  {promoError && (
                    <p
                      style={{
                        color: "#ff003c",
                        fontSize: "13px",
                        marginTop: "5px",
                      }}
                    >
                      {promoError}
                    </p>
                  )}
                </div>

                {pickupDate && dropoffDate && (
                  <div
                    style={{
                      marginTop: "20px",
                      padding: "15px",
                      background: "#161616",
                      borderRadius: "8px",
                      textAlign: "right",
                      border: "1px solid #222",
                    }}
                  >
                    <span style={{ color: "#aaa", fontSize: "14px" }}>
                      Estimated Total:{" "}
                    </span>
                    <strong style={{ color: "#ff003c", fontSize: "22px" }}>
                      ${calculateTotalCost()}
                    </strong>
                  </div>
                )}

                <div className="button-row">
                  <button type="submit" className="confirm-btn">
                    Confirm Booking
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <Receipt
          isOpen={receiptData !== null}
          bookingData={receiptData}
          onClose={handleCloseReceipt}
        />
      </section>
    </>
  );
}
