import React, { useState, useEffect } from "react";
import { Receipt } from "../Receipt";

const VEHICLES_API_URL = "https://rental-car-yvjh.onrender.com/api/vehicles/";
const BOOKINGS_API_URL = "https://rental-car-yvjh.onrender.com/api/booking/";
const CUSTOMER_API_URL = "https://rental-car-yvjh.onrender.com/api/customer/";
const PROMOS_API_URL = "https://rental-car-yvjh.onrender.com/api/promocode/";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  // Form Input States for Vehicles
  const [newVehicleName, setNewVehicleName] = useState("");
  const [newVehicleType, setNewVehicleType] = useState("ev");
  const [newVehiclePrice, setNewVehiclePrice] = useState("");
  const [newVehicleImage, setNewVehicleImage] = useState("");
  const [editingVehicleId, setEditingVehicleId] = useState(null);

  // Inline Bookings Edit States
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [editPickup, setEditPickup] = useState("");
  const [editDropoff, setEditDropoff] = useState("");
  const [editCost, setEditCost] = useState("");
  const [editStatus, setEditStatus] = useState("");

  // Promo Code States
  const [promos, setPromos] = useState([]);
  const [newPromoName, setNewPromoName] = useState("");
  const [newPromoCode, setNewPromoCode] = useState("");
  const [newPromoDiscount, setNewPromoDiscount] = useState("");
  const [newPromoDescription, setNewPromoDescription] = useState("");
  const [newPromoStatus, setNewPromoStatus] = useState("active");
  const [editingPromoId, setEditingPromoId] = useState(null);

  // Receipt View & Download States
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  // --- 1. INITIAL LOADING SYNC FROM BACKEND ---
  useEffect(() => {
    fetchBackendBookings();
    fetchBackendVehicles();
    fetchBackendCustomers();
    fetchBackendPromos();
  }, []);

  // Fetch all customers from the Django database
  const fetchBackendCustomers = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(CUSTOMER_API_URL, { headers });
      if (res.ok) {
        const rawData = await res.json();
        const data = rawData.results ? rawData.results : rawData;

        if (Array.isArray(data)) {
          const standardizedCustomers = data.map((c) => ({
            id: c.id,
            fullname: c.fullname || "Standard Customer",
            phone: c.phone || "No Phone Data",
            email: c.email || "No Email Provided",
            isSuspended: c.is_suspended ?? false,
          }));
          setCustomers(standardizedCustomers);
        } else {
          setCustomers([]);
        }
      }
    } catch (error) {
      console.error("Error linking to customer backend:", error);
    }
  };

  const fetchBackendVehicles = async () => {
    try {
      const res = await fetch(VEHICLES_API_URL);
      if (res.ok) {
        const rawData = await res.json();
        const data = rawData.results ? rawData.results : rawData;

        if (Array.isArray(data)) {
          const standardizedVehicles = data.map((v) => ({
            id: v.id,
            name: v.name || "Unknown Asset",
            price: v.price || 0,
            type: v.type || "ev",
            image: v.image || "",
          }));
          setVehicles(standardizedVehicles);
        } else {
          setVehicles([]);
        }
      }
    } catch (error) {
      console.error("Failed connecting to REST vehicles backend:", error);
    }
  };

  const fetchBackendBookings = async () => {
    try {
      const res = await fetch(BOOKINGS_API_URL);

      if (!res.ok) {
        throw new Error(`HTTP Error Status: ${res.status}`);
      }

      const data = await res.json();
      const rawBookings = data.results ? data.results : data;

      if (!Array.isArray(rawBookings)) {
        console.error("Expected an array but received:", rawBookings);
        return;
      }

      const standardized = rawBookings.map((b, idx) => ({
        id: b.id || `booking-fallback-${idx}`,
        email: b.email || "unknown@client.com",
        vehicle: b.vehicle || "Unknown Fleet Asset",
        pickupDate: b.pickup_date || "N/A",
        dropoffDate: b.dropoff_date || "N/A",
        unitPrice: b.unit_price || 0,
        promoCode: b.promo_code || "None",
        paymentMethod: b.payment_method || "On Cash",
        totalCost: parseInt(b.total_cost || 0),
        status: b.status || "active",
      }));

      const chronologicalBookings = [...standardized].sort((a, b) => {
        const idA =
          typeof a.id === "number"
            ? a.id
            : parseInt(String(a.id).replace(/\D/g, "")) || 0;
        const idB =
          typeof b.id === "number"
            ? b.id
            : parseInt(String(b.id).replace(/\D/g, "")) || 0;
        return idB - idA;
      });

      setBookings(chronologicalBookings);
    } catch (error) {
      console.error(
        "React failed connecting to Booking API backend:",
        error.message,
      );
    }
  };

  const fetchBackendPromos = async () => {
    try {
      const res = await fetch(PROMOS_API_URL);
      if (res.ok) {
        const rawData = await res.json();
        const data = rawData.results ? rawData.results : rawData;
        if (Array.isArray(data)) {
          setPromos(data);
        } else {
          setPromos([]);
        }
      }
    } catch (error) {
      console.error("Error linking to promocode backend app:", error);
    }
  };

  const handleSaveOrAddPromo = async (e) => {
    e.preventDefault();
    if (!newPromoName || !newPromoCode || !newPromoDiscount) return;

    const cleanBaseUrl = PROMOS_API_URL.endsWith("/")
      ? PROMOS_API_URL.slice(0, -1)
      : PROMOS_API_URL;

    const payload = {
      name: newPromoName.trim(),
      code: newPromoCode.trim().toUpperCase(),
      discount_percentage: parseInt(newPromoDiscount, 10),
      description: newPromoDescription.trim(),
      status: newPromoStatus,
    };

    try {
      if (editingPromoId) {
        const res = await fetch(`${cleanBaseUrl}/${editingPromoId}/`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          fetchBackendPromos();
          clearPromoFormState();
        } else {
          const errData = await res.json().catch(() => null);
          alert(`Update Rejected:\n${JSON.stringify(errData)}`);
        }
      } else {
        const res = await fetch(cleanBaseUrl + "/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          fetchBackendPromos();
          clearPromoFormState();
        } else {
          const errData = await res.json().catch(() => null);
          alert(`Creation Rejected:\n${JSON.stringify(errData)}`);
        }
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const startEditPromo = (promo) => {
    setEditingPromoId(promo.id);
    setNewPromoName(promo.name || "");
    setNewPromoCode(promo.code || "");
    setNewPromoDiscount(promo.discount_percentage || "");
    setNewPromoDescription(promo.description || "");
    setNewPromoStatus(promo.status || "active");
  };

  const clearPromoFormState = () => {
    setEditingPromoId(null);
    setNewPromoName("");
    setNewPromoCode("");
    setNewPromoDiscount("");
    setNewPromoDescription("");
    setNewPromoStatus("active");
  };

  const handleDeletePromo = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this promotional code?")
    ) {
      try {
        const res = await fetch(`${PROMOS_API_URL}${id}/`, {
          method: "DELETE",
        });
        if (res.ok) {
          fetchBackendPromos();
        } else {
          alert("Failed to delete the promotional code from the database.");
        }
      } catch (error) {
        console.error("Error executing delete operation:", error);
      }
    }
  };

  const updateInlineCost = (pickup, dropoff, vehicleName) => {
    if (!pickup || !dropoff) return;

    const start = new Date(pickup.split(" ")[0]);
    const end = new Date(dropoff.split(" ")[0]);

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) return;

    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

    const vehicleMatch = vehicles.find(
      (v) => v.name?.toLowerCase() === vehicleName?.toLowerCase(),
    );

    const pricePerDay = vehicleMatch ? vehicleMatch.price : 60;
    setEditCost(diffDays * pricePerDay);
  };

  const handleSaveOrAddVehicle = async (e) => {
    e.preventDefault();
    if (!newVehicleName || !newVehiclePrice) return;

    const vehiclePayload = {
      name: newVehicleName,
      type: newVehicleType,
      price: parseInt(newVehiclePrice, 10),
      image: newVehicleImage || "/image/xiaomi-su7.jpg",
    };

    const token = localStorage.getItem("userToken");
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    try {
      if (editingVehicleId) {
        const res = await fetch(`${VEHICLES_API_URL}${editingVehicleId}/`, {
          method: "PATCH",
          headers: headers,
          body: JSON.stringify(vehiclePayload),
        });
        if (res.ok) {
          fetchBackendVehicles();
          clearFormState();
        }
      } else {
        const res = await fetch(VEHICLES_API_URL, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(vehiclePayload),
        });
        if (res.ok) {
          fetchBackendVehicles();
          clearFormState();
        }
      }
    } catch (error) {
      console.error("Database storage mutation failed:", error);
    }
  };

  const startEditMode = (vehicle) => {
    setEditingVehicleId(vehicle.id);
    setNewVehicleName(vehicle.name || "");
    setNewVehicleType(vehicle.type || "ev");
    setNewVehiclePrice(vehicle.price || "");
    setNewVehicleImage(vehicle.image || "");
  };

  const clearFormState = () => {
    setEditingVehicleId(null);
    setNewVehicleName("");
    setNewVehicleType("ev");
    setNewVehiclePrice("");
    setNewVehicleImage("");
  };

  const handleDeleteVehicle = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vehicle line?"))
      return;

    const token = localStorage.getItem("userToken");
    const headers = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;

    try {
      const res = await fetch(`${VEHICLES_API_URL}${id}/`, {
        method: "DELETE",
        headers: headers,
      });

      if (res.ok) {
        setVehicles(vehicles.filter((v) => v.id !== id));
        if (editingVehicleId === id) clearFormState();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRentOutBooking = async (id) => {
    try {
      const res = await fetch(`${BOOKINGS_API_URL}${id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "renting" }),
      });
      if (res.ok) {
        setBookings(
          bookings.map((b) => (b.id === id ? { ...b, status: "renting" } : b)),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFinishBooking = async (id) => {
    try {
      const res = await fetch(`${BOOKINGS_API_URL}${id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rented" }),
      });
      if (res.ok) {
        setBookings(
          bookings.map((b) => (b.id === id ? { ...b, status: "rented" } : b)),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleStartEditBooking = (id, booking) => {
    setEditingBookingId(id);
    setEditPickup(booking.pickupDate || "");
    setEditDropoff(booking.dropoffDate || "");
    setEditCost(booking.totalCost || "");
    setEditStatus(booking.status || "booking");
  };

  const handleSaveBookingEdits = async (id) => {
    const patchPayload = {
      pickup_date: editPickup,
      dropoff_date: editDropoff,
      total_cost: parseInt(editCost) || 0,
      status: editStatus,
    };

    try {
      const res = await fetch(`${BOOKINGS_API_URL}${id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patchPayload),
      });
      if (res.ok) {
        setBookings(
          bookings.map((b) =>
            b.id === id
              ? {
                  ...b,
                  pickupDate: editPickup,
                  dropoffDate: editDropoff,
                  totalCost: parseInt(editCost),
                  status: editStatus,
                }
              : b,
          ),
        );
        setEditingBookingId(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelBooking = async (id) => {
    if (!window.confirm("Are you sure you want to drop this booking record?"))
      return;
    try {
      const res = await fetch(`${BOOKINGS_API_URL}${id}/`, {
        method: "DELETE",
      });
      if (res.ok) {
        setBookings(bookings.filter((b) => b.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenReceiptModal = (booking) => {
    const pickupParts = booking.pickupDate
      ? booking.pickupDate.split(" ")
      : ["N/A", "N/A"];
    const pickupDateStr = pickupParts[0];
    const pickupTimeStr = pickupParts.slice(1).join(" ") || "12:00 AM";

    const dropoffParts = booking.dropoffDate
      ? booking.dropoffDate.split(" ")
      : ["N/A", "N/A"];
    const dropoffDateStr = dropoffParts[0];
    const dropoffTimeStr = dropoffParts.slice(1).join(" ") || "12:00 PM";

    const start = new Date(pickupDateStr);
    const end = new Date(dropoffDateStr);
    const diffDays =
      Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24)) || 1;
    const baseCost = diffDays * (booking.unitPrice || 60);
    const totalCost = booking.totalCost || 0;

    let discountPercent = 0;
    if (baseCost > 0 && totalCost < baseCost) {
      discountPercent = Math.round(((baseCost - totalCost) / baseCost) * 100);
    }
    if (discountPercent < 0) discountPercent = 0;

    const customerObj = synchronizedCustomers.find(
      (c) => c.email?.toLowerCase() === booking.email?.toLowerCase(),
    );
    const customerPhone = customerObj ? customerObj.phone : "No Phone Data";
    const customerName = customerObj ? customerObj.fullname : "No Name Data";

    const receiptDataFormat = {
      id: booking.id,
      customerEmail: booking.email,
      customerPhone: customerPhone,
      customerName: customerName,
      vehicle: booking.vehicle,
      pickupDate: pickupDateStr,
      pickupTime: pickupTimeStr,
      dropoffDate: dropoffDateStr,
      dropoffTime: dropoffTimeStr,
      promoCode: booking.promoCode || "None",
      discountPercent: discountPercent,
      subTotal: baseCost,
      paymentMethod: booking.paymentMethod || "On Cash",
      totalCost: totalCost,
      unitPrice: booking.unitPrice || 60,
    };

    setSelectedReceipt(receiptDataFormat);
    setIsReceiptOpen(true);
  };

  const handleCloseReceiptModal = () => {
    setSelectedReceipt(null);
    setIsReceiptOpen(false);
  };

  const handleDownloadReceipt = () => {
    if (!selectedReceipt) return;

    const start = new Date(selectedReceipt.pickupDate);
    const end = new Date(selectedReceipt.dropoffDate);
    const diffDays =
      Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24)) || 1;

    const receiptText = `
========================================
           ODEMINE CAR RENTAL           
            OFFICIAL RECEIPT            
========================================
Receipt ID:     #${selectedReceipt.id}
Client Email:   ${selectedReceipt.email}
Vehicle:        ${selectedReceipt.vehicle}
Daily Rate:     $${selectedReceipt.unitPrice}/day
Duration:       ${diffDays} Day(s)

Pick-up:        ${selectedReceipt.pickupDate} at ${selectedReceipt.pickupTime}
Drop-off:       ${selectedReceipt.dropoffDate} at ${selectedReceipt.dropoffTime}
----------------------------------------
Subtotal:       $${selectedReceipt.subTotal}
Promo Code:     ${selectedReceipt.promoCode || "None"}
Discount:       -${selectedReceipt.discountPercent}%
----------------------------------------
TOTAL PAID:     $${selectedReceipt.totalCost}
Payment Method: ${selectedReceipt.paymentMethod}
----------------------------------------
   Thank you for renting with ODEMINE!  
========================================
`;

    const blob = new Blob([receiptText.trim()], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `receipt_booking_${selectedReceipt.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleToggleSuspendUser = async (customerObj) => {
    try {
      const token = localStorage.getItem("userToken");
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(
        `${CUSTOMER_API_URL}${customerObj.id}/toggle_suspend/`,
        {
          method: "PATCH",
          headers: headers,
        },
      );

      if (res.ok) {
        const responseData = await res.json();
        setCustomers(
          customers.map((c) =>
            c.id === customerObj.id
              ? { ...c, isSuspended: responseData.is_suspended }
              : c,
          ),
        );
      } else {
        console.error("Failed to update suspension status on backend");
      }
    } catch (error) {
      console.error("Error processing suspension change:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to permanently remove this customer profile?",
      )
    )
      return;

    try {
      const token = localStorage.getItem("userToken");
      const headers = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`${CUSTOMER_API_URL}${id}/`, {
        method: "DELETE",
        headers: headers,
      });

      if (res.ok) {
        setCustomers(customers.filter((c) => c.id !== id));
      } else {
        console.error("Failed to delete customer from database");
      }
    } catch (error) {
      console.error("Error executing user deletion:", error);
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    window.location.href = "/";
  };

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalCost || 0), 0);
  const recentBookings = bookings.slice(0, 5);

  // --- FRONTEND CLEAN UP MATRIX DYNAMICS ---
  // Injects missing guest booking emails transparently into the mapped display arrays
  const synchronizedCustomers = [...customers];

  bookings.forEach((booking) => {
    if (!booking.email) return;
    
    const customerExists = customers.some(
      (c) => c.email?.toLowerCase() === booking.email?.toLowerCase()
    );

    if (!customerExists) {
      const alreadyAdded = synchronizedCustomers.some(
        (c) => c.email?.toLowerCase() === booking.email?.toLowerCase()
      );

      if (!alreadyAdded) {
        synchronizedCustomers.push({
          id: `guest-${booking.id}`,
          fullname: booking.email.split("@")[0], 
          phone: "Guest Checkout",
          email: booking.email,
          isSuspended: false,
        });
      }
    }
  });

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
        :root { --red: #ff003c; --surface: #141414; --surface2: #1a1a1a; --border: #262626; --muted: #888888; --white: #ffffff; --radius-lg: 12px; }
        .dashboard-layout { display: flex; min-height: 100vh; background-color: #0a0a0a; color: var(--white); font-family: 'Inter', sans-serif; }
        .sidebar { width: 260px; background-color: var(--surface); border-right: 1px solid var(--border); display: flex; flex-direction: column; padding: 30px 20px; position: fixed; height: 100vh; left: 0; top: 0; z-index: 100; box-sizing: border-box; }
        .sidebar-brand { font-family: 'Roboto Condensed', sans-serif; font-size: 24px; font-weight: bold; color: var(--red); letter-spacing: 1px; margin-bottom: 40px; padding-left: 10px; text-transform: uppercase; }
        .sidebar-menu { list-style: none; display: flex; flex-direction: column; gap: 8px; padding: 0; margin: 0; flex-grow: 1; }
        .sidebar-item button { width: 100%; background: transparent; border: none; color: var(--muted); padding: 14px 16px; border-radius: 8px; text-align: left; font-size: 15px; font-weight: 500; cursor: pointer; display: flex; align-items: center; gap: 12px; transition: all 0.2s; }
        .sidebar-item button:hover, .sidebar-item.active button { background-color: rgba(255, 0, 60, 0.1); color: var(--white); }
        .sidebar-item.active button { border-left: 4px solid var(--red); border-radius: 0 8px 8px 0; padding-left: 12px; }
        .sidebar-footer { margin-top: auto; padding-top: 15px; border-top: 1px solid var(--border); }
        .logout-btn-sidebar { width: 100%; background: transparent; color: #ff4444; border: 1px solid rgba(255, 68, 68, 0.2); padding: 12px 16px; border-radius: 8px; cursor: pointer; font-size: 15px; font-weight: 600; display: flex; align-items: center; gap: 12px; transition: all 0.2s ease-in-out; }
        .logout-btn-sidebar:hover { background: var(--red); color: white; border-color: var(--red); }
        .main-content { flex: 1; margin-left: 260px; padding: 40px 4%; box-sizing: border-box; }
        .view-header { margin-bottom: 35px; border-bottom: 1px solid var(--border); padding-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end; }
        .view-header h1 { font-family: 'Roboto Condensed', sans-serif; font-size: 32px; color: var(--red); letter-spacing: 1px; text-transform: uppercase; }
        .view-header p { color: var(--muted); font-size: 14px; margin-top: 4px; }
        .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 40px; }
        .metric-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px; }
        .metric-title { font-family: 'Roboto Condensed', sans-serif; font-size: 14px; color: var(--red); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
        .metric-number { font-family: 'Roboto Condensed', sans-serif; font-size: 36px; font-weight: bold; }
        .panel-box { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px; }
        .panel-title-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .panel-title-row h3 { font-family: 'Roboto Condensed', sans-serif; color: var(--red); text-transform: uppercase; font-size: 20px; }
        .admin-table { width: 100%; border-collapse: collapse; text-align: left; }
        .admin-table th { font-family: 'Roboto Condensed', sans-serif; color: var(--muted); text-transform: uppercase; font-size: 13px; padding: 12px 16px; border-bottom: 1px solid var(--border); }
        .admin-table td { padding: 14px 16px; border-bottom: 1px solid #1f1f1f; font-size: 14px; vertical-align: middle; }
        .status-badge { padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: bold; text-transform: uppercase; display: inline-flex; align-items: center; }
        .status-rented { background: rgba(255, 0, 60, 0.15); color: var(--red); border: 1px solid rgba(255, 0, 60, 0.3); }
        .status-available { background: rgba(40, 167, 69, 0.15); color: #28a745; border: 1px solid rgba(40, 167, 69, 0.3); }
        .status-suspended { background: rgba(255, 152, 0, 0.15); color: #ff9800; border: 1px solid rgba(255, 152, 0, 0.3); }
        .status-grey { background: rgba(136, 136, 136, 0.15); color: var(--muted); border: 1px solid rgba(136, 136, 136, 0.3); }
        .btn-edit-action { background: transparent; color: #ccff00; border: 1px solid rgba(204, 255, 0, 0.3); padding: 6px 12px; border-radius: 6px; cursor: pointer; transition: all 0.2s; margin-right: 8px; }
        .btn-edit-action:hover { background: #ccff00; color: #000; }
        .btn-delete { background: transparent; color: var(--muted); border: 1px solid var(--border); padding: 6px 12px; border-radius: 6px; cursor: pointer; transition: all 0.2s; }
        .btn-delete:hover { background: var(--red); color: white; border-color: var(--red); }
        .btn-action-suspend { background: transparent; color: #ff9800; border: 1px solid rgba(255, 152, 0, 0.4); padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: 500; margin-right: 8px; transition: all 0.2s; }
        .btn-action-suspend:hover { background: #ff9800; color: black; }
        .btn-rentout { background: transparent; color: #28a745; border: 1px solid rgba(40, 167, 69, 0.4); padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: 500; margin-right: 8px; transition: all 0.2s; }
        .btn-rentout:hover { background: #28a745; color: white; }
        .btn-receipt { background: transparent; color: #00e5ff; border: 1px solid rgba(0, 229, 255, 0.3); padding: 6px 12px; border-radius: 6px; cursor: pointer; transition: all 0.2s; margin-right: 8px; }
        .btn-receipt:hover { background: #00e5ff; color: #000; }
        .inline-input { background: #0a0a0a; border: 1px solid var(--border); color: white; padding: 4px 8px; border-radius: 4px; outline: none; font-size: 13px; max-width: 110px; margin-bottom: 4px; display: block; }
        .inline-input:focus { border-color: var(--red); }
        .add-vehicle-form { display: grid; grid-template-columns: repeat(4, 1fr) auto; gap: 12px; background: var(--surface2); padding: 20px; border-radius: 8px; margin-bottom: 25px; align-items: flex-end; border: 1px solid var(--border); }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-group label { font-size: 12px; color: var(--muted); text-transform: uppercase; }
        .form-group input, .form-group select { background: #0a0a0a; border: 1px solid var(--border); color: white; padding: 10px; border-radius: 6px; outline: none; height: 38px; box-sizing: border-box; }
        .form-group select { cursor: pointer; }
        .form-group input:focus, .form-group select:focus { border-color: var(--red); }
        .btn-submit-car { background: var(--red); color: white; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; height: 38px; }
        .btn-cancel-edit { background: #333; color: white; border: none; padding: 10px 15px; border-radius: 6px; font-weight: 600; cursor: pointer; height: 38px; margin-right: 5px; }
      `,
        }}
      />

      <div className="dashboard-layout">
        <aside className="sidebar">
          <div className="sidebar-brand">Odemine Panel</div>
          <ul className="sidebar-menu">
            <li
              className={`sidebar-item ${activeTab === "overview" ? "active" : ""}`}
            >
              <button onClick={() => setActiveTab("overview")}>
                <i className="fas fa-chart-pie" /> Overview
              </button>
            </li>
            <li
              className={`sidebar-item ${activeTab === "vehicles" ? "active" : ""}`}
            >
              <button onClick={() => setActiveTab("vehicles")}>
                <i className="fas fa-car" /> Vehicles
              </button>
            </li>
            <li
              className={`sidebar-item ${activeTab === "bookings" ? "active" : ""}`}
            >
              <button onClick={() => setActiveTab("bookings")}>
                <i className="fas fa-calendar-check" /> Bookings
              </button>
            </li>
            <li
              className={`sidebar-item ${activeTab === "customers" ? "active" : ""}`}
            >
              <button onClick={() => setActiveTab("customers")}>
                <i className="fas fa-users" /> Customers
              </button>
            </li>
            <li
              className={`sidebar-item ${activeTab === "promos" ? "active" : ""}`}
            >
              <button onClick={() => setActiveTab("promos")}>
                <i className="fas fa-tags" /> Promos
              </button>
            </li>
          </ul>
          <div className="sidebar-footer">
            <button className="logout-btn-sidebar" onClick={handleAdminLogout}>
              <i className="fas fa-sign-out-alt"></i> Log Out
            </button>
          </div>
        </aside>

        <main className="main-content">
          {activeTab === "overview" && (
            <div>
              <div className="view-header">
                <div>
                  <h1>Overview Metrics</h1>
                  <p>Real-time telemetry and operation overview charts.</p>
                </div>
              </div>
              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-title">Total Fleet</div>
                  <div className="metric-number">{vehicles.length}</div>
                </div>
                <div className="metric-card">
                  <div className="metric-title">Active Orders</div>
                  <div className="metric-number">{bookings.length}</div>
                </div>
                <div className="metric-card">
                  <div className="metric-title">Clients Base</div>
                  <div className="metric-number">{synchronizedCustomers.length}</div>
                </div>
                <div className="metric-card">
                  <div className="metric-title">Revenue</div>
                  <div className="metric-number">
                    ${totalRevenue.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="panel-box" style={{ marginTop: "30px" }}>
                <div className="panel-title-row">
                  <h3>Recent Bookings activity</h3>
                  <button
                    onClick={() => setActiveTab("bookings")}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--red)",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "14px",
                    }}
                  >
                    View All{" "}
                    <i
                      className="fas fa-arrow-right"
                      style={{ marginLeft: "5px" }}
                    ></i>
                  </button>
                </div>
                {recentBookings.length === 0 ? (
                  <p style={{ color: "var(--muted)", padding: "10px 0" }}>
                    No recent activity records found.
                  </p>
                ) : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Customer Email</th>
                        <th>Vehicle Model</th>
                        <th>Rental Window Timeline</th>
                        <th>Total Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBookings.map((b, idx) => (
                        <tr key={b.id || idx}>
                          <td style={{ fontWeight: "600" }}>{b.email}</td>
                          <td>{b.vehicle}</td>
                          <td style={{ fontSize: "13px", color: "#ccc" }}>
                            {b.pickupDate}{" "}
                            <i
                              className="fas fa-long-arrow-alt-right"
                              style={{ color: "var(--red)", margin: "0 5px" }}
                            />{" "}
                            {b.dropoffDate}
                          </td>
                          <td
                            style={{ fontWeight: "bold", color: "var(--red)" }}
                          >
                            ${b.totalCost}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {activeTab === "vehicles" && (
            <div>
              <div className="view-header">
                <div>
                  <h1>Vehicle Management</h1>
                  <p>
                    Register new units into the data array fleet or strike
                    assets down.
                  </p>
                </div>
              </div>

              <form
                className="add-vehicle-form"
                onSubmit={handleSaveOrAddVehicle}
              >
                <div className="form-group">
                  <label>Vehicle Title</label>
                  <input
                    type="text"
                    value={newVehicleName}
                    onChange={(e) => setNewVehicleName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Power Train Type</label>
                  <select
                    value={newVehicleType}
                    onChange={(e) => setNewVehicleType(e.target.value)}
                  >
                    <option value="ev">EV Car</option>
                    <option value="fuel">Fuel Combustion</option>
                    <option value="bike">Super Bike</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Price Per Day ($)</label>
                  <input
                    type="number"
                    value={newVehiclePrice}
                    onChange={(e) => setNewVehiclePrice(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Image Address Path</label>
                  <input
                    type="text"
                    value={newVehicleImage}
                    onChange={(e) => setNewVehicleImage(e.target.value)}
                    placeholder="/image/filename.jpg"
                  />
                </div>
                <div style={{ display: "flex" }}>
                  {editingVehicleId && (
                    <button
                      type="button"
                      className="btn-cancel-edit"
                      onClick={clearFormState}
                    >
                      Cancel
                    </button>
                  )}
                  <button type="submit" className="btn-submit-car">
                    {editingVehicleId ? "Save Asset" : "Add Asset"}
                  </button>
                </div>
              </form>

              <div className="panel-box">
                <div className="panel-title-row">
                  <h3>Active Assets Fleet ({vehicles.length})</h3>
                </div>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Asset Model</th>
                      <th>Class Type</th>
                      <th>Daily Rate</th>
                      <th>Availability Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicles.map((v) => {
                      const isRented = bookings.some(
                        (b) =>
                          b.vehicle?.toLowerCase() === v.name?.toLowerCase() &&
                          b.status !== "rented",
                      );
                      const displayType = v.type || "ev";
                      const isCurrentlyEditingThisRow =
                        editingVehicleId === v.id;

                      return (
                        <tr key={v.id}>
                          <td>{v.id}</td>
                          <td style={{ fontWeight: "600" }}>{v.name}</td>
                          <td>
                            <span className="status-badge status-available">
                              {displayType.toUpperCase()}
                            </span>
                          </td>
                          <td>${v.price}/day</td>
                          <td>
                            <span
                              className={`status-badge ${isRented ? "status-rented" : "status-available"}`}
                            >
                              <i
                                className="fas fa-circle"
                                style={{ fontSize: "8px", marginRight: "6px" }}
                              />
                              {isRented ? "Rented Out" : "Available"}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: "flex", gap: "6px" }}>
                              <button
                                type="button"
                                className="btn-action-suspend"
                                onClick={() => startEditMode(v)}
                                style={
                                  isCurrentlyEditingThisRow
                                    ? {
                                        borderColor: "#ccff00",
                                        color: "#ccff00",
                                      }
                                    : {}
                                }
                              >
                                <i className="fas fa-edit" />{" "}
                                {isCurrentlyEditingThisRow
                                  ? "Editing..."
                                  : "Edit"}
                              </button>
                              <button
                                type="button"
                                className="btn-delete"
                                onClick={() => handleDeleteVehicle(v.id)}
                              >
                                <i className="fas fa-trash-alt" /> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "bookings" && (
            <div>
              <div className="view-header">
                <div>
                  <h1>Reservation Bookings Logs</h1>
                  <p>
                    Track active customer car rentals, checkout pipelines, and
                    transaction cycles.
                  </p>
                </div>
              </div>

              <div className="panel-box">
                <div className="panel-title-row">
                  <h3>All Registered Order Receipts ({bookings.length})</h3>
                </div>
                {bookings.length === 0 ? (
                  <p
                    style={{
                      color: "var(--muted)",
                      padding: "20px 0",
                      textAlign: "center",
                    }}
                  >
                    <i
                      className="fas fa-calendar-times"
                      style={{ marginRight: "8px", fontSize: "18px" }}
                    />
                    No active rental system reservations found.
                  </p>
                ) : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Client</th>
                        <th>Asset</th>
                        <th>Timeline</th>
                        <th>Unit Price</th>
                        <th>Promocode</th>
                        <th>Gross Price</th>
                        <th>Payment Method</th>
                        <th>Rental Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b, idx) => {
                        const isEditingThisBooking = editingBookingId === b.id;

                        return (
                          <tr key={b.id || idx}>
                            <td>#{idx + 1}</td>
                            <td style={{ fontWeight: "600", color: "#ccc" }}>
                              {b.email}
                            </td>
                            <td style={{ fontWeight: "600" }}>{b.vehicle}</td>
                            <td style={{ fontSize: "13px", color: "#ccc" }}>
                              {isEditingThisBooking ? (
                                <>
                                  <input
                                    type="text"
                                    className="inline-input"
                                    value={editPickup}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setEditPickup(val);
                                      updateInlineCost(
                                        val,
                                        editDropoff,
                                        b.vehicle,
                                      );
                                    }}
                                    placeholder="Pickup"
                                  />
                                  <input
                                    type="text"
                                    className="inline-input"
                                    value={editDropoff}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setEditDropoff(val);
                                      updateInlineCost(
                                        editPickup,
                                        val,
                                        b.vehicle,
                                      );
                                    }}
                                    placeholder="Dropoff"
                                  />
                                </>
                              ) : (
                                <>
                                  <div>{b.pickupDate}</div>
                                  <div
                                    style={{
                                      fontSize: "11px",
                                      color: "var(--muted)",
                                      margin: "2px 0",
                                    }}
                                  >
                                    <i
                                      className="fas fa-arrow-down"
                                      style={{ marginRight: "4px" }}
                                    />{" "}
                                    to
                                  </div>
                                  <div>{b.dropoffDate}</div>
                                </>
                              )}
                            </td>
                            <td>{b.unitPrice}</td>
                            <td>{b.promoCode}</td>
                            <td
                              style={{
                                fontWeight: "bold",
                                color: "var(--red)",
                                fontSize: "15px",
                              }}
                            >
                              {isEditingThisBooking ? (
                                <input
                                  type="number"
                                  className="inline-input"
                                  value={editCost}
                                  onChange={(e) => setEditCost(e.target.value)}
                                  style={{
                                    color: "var(--red)",
                                    fontWeight: "bold",
                                  }}
                                />
                              ) : (
                                `$${b.totalCost}`
                              )}
                            </td>
                            <td>
                              <span>{b.paymentMethod}</span>
                            </td>
                            <td>
                              {isEditingThisBooking ? (
                                <select
                                  className="inline-input"
                                  value={editStatus}
                                  onChange={(e) =>
                                    setEditStatus(e.target.value)
                                  }
                                  style={{
                                    cursor: "pointer",
                                    height: "30px",
                                    color: "#fff",
                                    background: "#111",
                                  }}
                                >
                                  <option value="booking">Booking</option>
                                  <option value="renting">Renting</option>
                                  <option value="rented">Rented</option>
                                </select>
                              ) : b.status === "renting" ? (
                                <span className="status-badge status-available">
                                  <i
                                    className="fas fa-key"
                                    style={{
                                      fontSize: "9px",
                                      marginRight: "6px",
                                    }}
                                  />{" "}
                                  Renting
                                </span>
                              ) : b.status === "rented" ? (
                                <span className="status-badge status-grey">
                                  <i
                                    className="fas fa-check-circle"
                                    style={{
                                      fontSize: "9px",
                                      marginRight: "6px",
                                    }}
                                  />{" "}
                                  Rented
                                </span>
                              ) : (
                                <span className="status-badge status-rented">
                                  <i
                                    className="fas fa-spinner fa-spin"
                                    style={{
                                      fontSize: "9px",
                                      marginRight: "6px",
                                    }}
                                  />{" "}
                                  Booking
                                </span>
                              )}
                            </td>
                            <td>
                              <div style={{ display: "flex", gap: "6px" }}>
                                <button
                                  type="button"
                                  className="btn-receipt"
                                  onClick={() => handleOpenReceiptModal(b)}
                                  title="View & Download Receipt"
                                >
                                  <i className="fas fa-file-invoice-dollar" />
                                </button>

                                {isEditingThisBooking ? (
                                  <>
                                    <button
                                      type="button"
                                      className="btn-rentout"
                                      onClick={() =>
                                        handleSaveBookingEdits(b.id)
                                      }
                                    >
                                      <i className="fas fa-save" /> Save
                                    </button>
                                    <button
                                      type="button"
                                      className="btn-delete"
                                      onClick={() => setEditingBookingId(null)}
                                    >
                                      Cancel
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      type="button"
                                      className="btn-edit-action"
                                      onClick={() =>
                                        handleStartEditBooking(b.id, b)
                                      }
                                    >
                                      <i className="fas fa-edit" />
                                    </button>
                                    <button
                                      type="button"
                                      className="btn-delete"
                                      onClick={() => handleCancelBooking(b.id)}
                                    >
                                      <i className="fas fa-trash-alt" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {activeTab === "customers" && (
            <div className="panel-box">
              <div className="panel-title-row">
                <h3>Registered User Directory ({synchronizedCustomers.length})</h3>
              </div>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Phone Number</th>
                    <th>Email Account Identity</th>
                    <th>Status Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {synchronizedCustomers.map((c, idx) => (
                    <tr key={c.id || idx}>
                      <td style={{ fontWeight: "600" }}>{c.fullname}</td>
                      <td>{c.phone}</td>
                      <td>{c.email}</td>
                      <td>
                        <span
                          className={`status-badge ${c.isSuspended ? "status-suspended" : "status-available"}`}
                        >
                          {c.isSuspended ? "SUSPENDED" : "CUSTOMER"}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn-action-suspend"
                          onClick={() => handleToggleSuspendUser(c)}
                          disabled={typeof c.id === 'string' && c.id.startsWith('guest-')}
                          style={typeof c.id === 'string' && c.id.startsWith('guest-') ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                        >
                          <i
                            className={
                              c.isSuspended
                                ? "fas fa-user-check"
                                : "fas fa-user-slash"
                            }
                          />{" "}
                          {c.isSuspended ? "Unsuspend" : "Suspend"}
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDeleteUser(c.id)}
                          disabled={typeof c.id === 'string' && c.id.startsWith('guest-')}
                          style={typeof c.id === 'string' && c.id.startsWith('guest-') ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                        >
                          <i className="fas fa-trash-alt" /> Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "promos" && (
            <div>
              <div className="view-header">
                <div>
                  <h1>Promo Code Management</h1>
                  <p>
                    {editingPromoId
                      ? "Edit and save your promotional code details."
                      : "Create new discount codes and manage active statuses."}
                  </p>
                </div>
              </div>

              <form
                className="add-vehicle-form"
                onSubmit={handleSaveOrAddPromo}
                style={{ gridTemplateColumns: "repeat(5, 1fr) auto" }}
              >
                <div className="form-group">
                  <label>Promo Name</label>
                  <input
                    type="text"
                    value={newPromoName}
                    onChange={(e) => setNewPromoName(e.target.value)}
                    placeholder="e.g. Long Term Rental"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Promo Code</label>
                  <input
                    type="text"
                    value={newPromoCode}
                    onChange={(e) => setNewPromoCode(e.target.value)}
                    placeholder="e.g. SAVE30"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Discount Percent (%)</label>
                  <input
                    type="number"
                    value={newPromoDiscount}
                    onChange={(e) => setNewPromoDiscount(e.target.value)}
                    placeholder="e.g. 30"
                    min="1"
                    max="100"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description Note</label>
                  <input
                    type="text"
                    value={newPromoDescription}
                    onChange={(e) => setNewPromoDescription(e.target.value)}
                    placeholder="e.g. Summer special discount"
                  />
                </div>
                <div className="form-group">
                  <label>Initial Status</label>
                  <select
                    value={newPromoStatus}
                    onChange={(e) => setNewPromoStatus(e.target.value)}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div style={{ display: "flex", gap: "6px" }}>
                  {editingPromoId && (
                    <button
                      type="button"
                      className="btn-cancel-edit"
                      onClick={clearPromoFormState}
                    >
                      Cancel
                    </button>
                  )}
                  <button type="submit" className="btn-submit-car">
                    {editingPromoId ? "Save Promo" : "Create Promo"}
                  </button>
                </div>
              </form>

              <div className="panel-box">
                <div className="panel-title-row">
                  <h3>Active Promo Codes Registry ({promos.length})</h3>
                </div>
                {promos.length === 0 ? (
                  <p
                    style={{
                      color: "var(--muted)",
                      padding: "20px 0",
                      textAlign: "center",
                    }}
                  >
                    <i
                      className="fas fa-tags"
                      style={{ marginRight: "8px", fontSize: "18px" }}
                    />
                    No promotional codes registered yet.
                  </p>
                ) : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Promo Name</th>
                        <th>Code Name</th>
                        <th>Discount %</th>
                        <th>Description</th>
                        <th>Status State</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {promos.map((p) => {
                        const isCurrentlyEditingThisRow =
                          editingPromoId === p.id;

                        return (
                          <tr key={p.id}>
                            <td style={{ fontWeight: "600" }}>
                              {p.name || "-"}
                            </td>
                            <td
                              style={{
                                fontWeight: "bold",
                                fontSize: "16px",
                                color: "var(--red)",
                              }}
                            >
                              {p.code}
                            </td>
                            <td style={{ fontWeight: "600" }}>
                              {p.discount_percentage}%
                            </td>
                            <td style={{ color: "#aaa", fontSize: "13px" }}>
                              {p.description || "-"}
                            </td>
                            <td>
                              <span
                                className={`status-badge ${p.status === "active" ? "status-available" : "status-grey"}`}
                              >
                                <i
                                  className="fas fa-circle"
                                  style={{
                                    fontSize: "8px",
                                    marginRight: "6px",
                                  }}
                                />
                                {p.status === "active" ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td>
                              <div style={{ display: "flex", gap: "6px" }}>
                                <button
                                  type="button"
                                  className="btn-action-suspend"
                                  onClick={() => startEditPromo(p)}
                                  style={
                                    isCurrentlyEditingThisRow
                                      ? {
                                          borderColor: "#ccff00",
                                          color: "#ccff00",
                                        }
                                      : {}
                                  }
                                >
                                  <i className="fas fa-edit" />{" "}
                                  {isCurrentlyEditingThisRow
                                    ? "Editing..."
                                    : "Edit"}
                                </button>
                                <button
                                  type="button"
                                  className="btn-delete"
                                  onClick={() => handleDeletePromo(p.id)}
                                >
                                  <i className="fas fa-trash-alt" /> Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
      <Receipt
        isOpen={isReceiptOpen}
        bookingData={selectedReceipt}
        onClose={handleCloseReceiptModal}
      />
    </>
  );
}