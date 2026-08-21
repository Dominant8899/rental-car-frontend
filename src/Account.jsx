import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Account({ user, handleLogout }) {
  const navigate = useNavigate();
  const [rentalHistory, setRentalHistory] = useState([]);

  // Profile information states
  const [profileData, setProfileData] = useState({
    id: null, // 🟢 Tracks primary key to build accurate update endpoints
    fullName: "",
    phone: "",
    email: user?.email || "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchProfileAndHistory();
  }, [user, navigate]);

  const fetchProfileAndHistory = async () => {
    try {
      // 1. Fetch User Profile Info from your backend
      const profileRes = await fetch(
        "https://odemine.pythonanywhere.com/api/customer/",
      );
      if (profileRes.ok) {
        const data = await profileRes.json();

        // 🟢 FIX: Instead of taking data[0], search for the logged-in email!
        const profile = Array.isArray(data)
          ? data.find(
              (c) => c.email?.toLowerCase() === user.email?.toLowerCase(),
            )
          : data;

        if (profile) {
          setProfileData({
            id: profile.id, // 🟢 Save database primary key row ID
            fullName: profile.fullname || "Odemine Customer",
            phone: profile.phone || "Not provided",
            email: profile.email || user.email,
          });
        } else {
          // Fallback if this email doesn't have a profile record in the database yet
          setProfileData({
            id: null,
            fullName: "Gech",
            phone: "0967655334",
            email: user.email,
          });
        }
      }

      // 2. Fetch Rental Bookings Ledger Records
      const res = await fetch(
        "https://odemine.pythonanywhere.com/api/booking/",
      );
      if (res.ok) {
        const data = await res.json();
        const historyData = Array.isArray(data) ? data : data.results || [];

        // Filter out bookings that belong only to the active authenticated client session
        const myHistory = historyData.filter(
          (item) =>
            item.user_email?.toLowerCase() === user.email?.toLowerCase() ||
            item.email?.toLowerCase() === user.email?.toLowerCase(),
        );
        setRentalHistory(myHistory);
      }
    } catch (err) {
      console.error("Error retrieving historical table records:", err);
    }
  };

  // Handle updates to profile metadata inputs
  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      // 🟢 Build clean endpoint string routing directly to specific user item record ID
      const targetUrl = profileData.id
        ? `https://odemine.pythonanywhere.com/api/customer/${profileData.id}/`
        : "https://odemine.pythonanywhere.com/api/customer/update/";

      // Try PUT request method to update model instance fields completely
      let response = await fetch(targetUrl, {
        method: profileData.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: profileData.email,
          fullname: profileData.fullName,
          phone: profileData.phone,
        }),
      });

      // 🟢 Fallback alternative if API constraints prefer standard ModelViewSet PATCH operations
      if (!response.ok && profileData.id) {
        response = await fetch(targetUrl, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullname: profileData.fullName,
            phone: profileData.phone,
          }),
        });
      }

      if (response.ok) {
        setIsEditing(false);
      } else {
        alert("Failed to sync structural changes to backend.");
      }
    } catch (err) {
      console.error("Profile payload update failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      style={{
        background: "#0a0a0a",
        color: "#fff",
        minHeight: "90vh",
        padding: "60px 5%",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Top Workspace Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #1a1a1a",
            paddingBottom: "20px",
            marginBottom: "40px",
          }}
        >
          <h1
            style={{
              fontSize: "2.2rem",
              fontWeight: "bold",
              fontFamily: "sans-serif",
            }}
          >
            Client Account Workspace
          </h1>
          <button
            onClick={handleLogout}
            style={{
              background: "#ff003c",
              color: "#fff",
              fontFamily: "'Barlow Condensed', sans-serif",
              border: "none",
              padding: "12px 24px",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer",
              textTransform: "uppercase",
              fontSize: "0.85rem",
              letterSpacing: "1px",
            }}
          >
            Logout
          </button>
        </div>

        {/* Updated Profile Card Section with Editable Parameters */}
        <div style={{ marginBottom: "50px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <h3
              style={{
                color: "#ff003c",
                fontSize: "14px",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                margin: 0,
                fontWeight: "bold",
              }}
            >
              Profile Metadata
            </h3>

            {isEditing ? (
              <div>
                <button
                  onClick={() => setIsEditing(false)}
                  style={{
                    background: "transparent",
                    color: "#aaa",
                    border: "1px solid #333",
                    padding: "6px 14px",
                    borderRadius: "4px",
                    marginRight: "10px",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  disabled={isSaving}
                  style={{
                    background: "#00ff66",
                    color: "#000",
                    border: "none",
                    padding: "6px 14px",
                    borderRadius: "4px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  {isSaving ? "Saving..." : "Save Info"}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  background: "transparent",
                  color: "#fff",
                  border: "1px solid #ff003c",
                  padding: "6px 14px",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "12px",
                  transition: "0.2s",
                }}
              >
                Edit Info
              </button>
            )}
          </div>

          <div
            style={{
              background: "#111",
              padding: "24px",
              borderRadius: "12px",
              border: "1px solid #222",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
              }}
            >
              <div>
                <label
                  style={{
                    color: "#666",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "5px",
                  }}
                >
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.fullName}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        fullName: e.target.value,
                      })
                    }
                    style={{
                      background: "#1a1a1a",
                      color: "#fff",
                      border: "1px solid #333",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                ) : (
                  <span style={{ fontSize: "16px", color: "#fff" }}>
                    {profileData.fullName}
                  </span>
                )}
              </div>

              <div>
                <label
                  style={{
                    color: "#666",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "5px",
                  }}
                >
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                    style={{
                      background: "#1a1a1a",
                      color: "#fff",
                      border: "1px solid #333",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                ) : (
                  <span style={{ fontSize: "16px", color: "#fff" }}>
                    {profileData.phone}
                  </span>
                )}
              </div>

              <div>
                <label
                  style={{
                    color: "#666",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "5px",
                  }}
                >
                  Email Address
                </label>
                <span style={{ fontSize: "16px", color: "#aaa" }}>
                  {profileData.email}
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: "10px",
                    color: "#444",
                    marginTop: "2px",
                  }}
                >
                  (Unique Key ID)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div>
          <h3
            style={{
              color: "#ff003c",
              fontSize: "14px",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Rental History Logs
          </h3>
          <p style={{ color: "#666", fontSize: "13px", marginBottom: "25px" }}>
            Track active customer car rentals, checkout pipelines, and
            transaction cycles.
          </p>

          <div
            style={{
              overflowX: "auto",
              background: "#111",
              borderRadius: "12px",
              border: "1px solid #222",
              padding: "10px",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr style={{ borderBottom: "1px solid #222" }}>
                  <th
                    style={{
                      padding: "18px 12px",
                      color: "#888",
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Vehicle
                  </th>
                  <th
                    style={{
                      padding: "18px 12px",
                      color: "#888",
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Type
                  </th>
                  <th
                    style={{
                      padding: "18px 12px",
                      color: "#888",
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Timeline
                  </th>
                  <th
                    style={{
                      padding: "18px 12px",
                      color: "#888",
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Unit Price
                  </th>
                  <th
                    style={{
                      padding: "18px 12px",
                      color: "#888",
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Promocode
                  </th>
                  <th
                    style={{
                      padding: "18px 12px",
                      color: "#888",
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Gross Price
                  </th>
                  <th
                    style={{
                      padding: "18px 12px",
                      color: "#888",
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Payment Method
                  </th>
                  <th
                    style={{
                      padding: "18px 12px",
                      color: "#888",
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Rental Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {rentalHistory.map((log) => (
                  <tr
                    key={log.id}
                    style={{ borderBottom: "1px solid #161616" }}
                  >
                    <td
                      style={{
                        padding: "20px 12px",
                        fontWeight: "bold",
                        color: "#fff",
                        verticalAlign: "middle",
                      }}
                    >
                      {log.vehicle || log.vehicle_name || "N/A"}
                    </td>
                    <td
                      style={{
                        padding: "20px 12px",
                        color: "#ccc",
                        verticalAlign: "middle",
                      }}
                    >
                      {log.vehicle_type || "Car"}
                    </td>
                    <td
                      style={{
                        padding: "20px 12px",
                        color: "#aaa",
                        fontSize: "13px",
                        lineHeight: "1.6",
                        verticalAlign: "middle",
                      }}
                    >
                      <div>{log.pickup_date?.split(" ")[0] || "N/A"}</div>
                      <div style={{ fontSize: "11px", color: "#666" }}>
                        {log.pickup_date?.split(" ").slice(1).join(" ") || ""}
                      </div>
                      <div style={{ color: "#666", margin: "2px 0" }}>↓ to</div>
                      <div>{log.dropoff_date?.split(" ")[0] || "N/A"}</div>
                      <div style={{ fontSize: "11px", color: "#666" }}>
                        {log.dropoff_date?.split(" ").slice(1).join(" ") || ""}
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "20px 12px",
                        color: "#fff",
                        verticalAlign: "middle",
                      }}
                    >
                      ${log.unit_price || log.price || "0"}
                    </td>
                    <td
                      style={{
                        padding: "20px 12px",
                        color: "#ccc",
                        verticalAlign: "middle",
                      }}
                    >
                      {log.promo_code || "None"}
                    </td>
                    <td
                      style={{
                        padding: "20px 12px",
                        fontWeight: "bold",
                        color: "#ff003c",
                        fontSize: "15px",
                        verticalAlign: "middle",
                      }}
                    >
                      ${log.total_cost || "0"}
                    </td>
                    <td
                      style={{
                        padding: "20px 12px",
                        color: "#ccc",
                        verticalAlign: "middle",
                      }}
                    >
                      {log.payment_method || "ABA Bank"}
                    </td>
                    <td
                      style={{ padding: "20px 12px", verticalAlign: "middle" }}
                    >
                      {(() => {
                        // Normalize status string to lowercase for safe matching
                        const currentStatus = (
                          log.status || "booking"
                        ).toLowerCase();

                        let text = "BOOKING";
                        let icon = "⏳ ";
                        let bgColor = "rgba(255, 0, 60, 0.1)";
                        let color = "#ff003c";
                        let borderColor = "rgba(255, 0, 60, 0.3)";

                        if (currentStatus === "renting") {
                          text = "RENTING";
                          icon = "🔑 ";
                          bgColor = "rgba(0, 255, 102, 0.06)";
                          color = "#00ff66";
                          borderColor = "rgba(0, 255, 102, 0.2)";
                        } else if (currentStatus === "rented") {
                          text = "RENTED";
                          icon = "✓ ";
                          bgColor = "rgba(255, 255, 255, 0.05)";
                          color = "#aaa";
                          borderColor = "#333";
                        }

                        return (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              padding: "8px 16px",
                              borderRadius: "6px",
                              fontSize: "12px",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                              letterSpacing: "0.8px",
                              background: bgColor,
                              color: color,
                              border: `1px solid ${borderColor}`,
                            }}
                          >
                            <span>{icon}</span>
                            {text}
                          </span>
                        );
                      })()}
                    </td>
                  </tr>
                ))}

                {rentalHistory.length === 0 && (
                  <tr>
                    <td
                      colSpan="8"
                      style={{
                        padding: "40px",
                        textTransform: "initial",
                        textAlign: "center",
                        color: "#555",
                        fontStyle: "italic",
                      }}
                    >
                      No past transactional history data nodes associated with
                      this profile instance.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
