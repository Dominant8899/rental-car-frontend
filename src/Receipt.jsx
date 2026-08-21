import React from "react";
import html2pdf from "html2pdf.js";

export const Receipt = ({ isOpen, bookingData, onClose }) => {
  if (!isOpen || !bookingData) return null;

  const hasPromo = bookingData.promoCode && bookingData.promoCode !== "None";

  const handleDownloadPDF = () => {
    const element = document.getElementById("receipt-modal-container");
    if (!element) return;

    const buttonRow = element.querySelector(".receipt-button-row");
    if (buttonRow) buttonRow.style.display = "none";

    const originalMaxWidth = element.style.maxWidth;
    const originalWidth = element.style.width;
    const originalMinHeight = element.style.minHeight;
    const originalHeight = element.style.height;
    const originalBorderRadius = element.style.borderRadius;
    const originalBorder = element.style.border;
    const originalBoxSizing = element.style.boxSizing;

    element.style.maxWidth = "none";
    element.style.width = "100%";
    element.style.minHeight = "296mm";
    element.style.height = "296mm";
    element.style.borderRadius = "0";
    element.style.border = "none";
    element.style.boxSizing = "border-box";

    const opt = {
      margin:       0,
      filename:     `receipt_booking_${bookingData.id || 'receipt'}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { 
        scale: 3, 
        useCORS: true, 
        backgroundColor: '#111111' 
      },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        if (buttonRow) buttonRow.style.display = "flex";
        element.style.maxWidth = originalMaxWidth;
        element.style.width = originalWidth;
        element.style.minHeight = originalMinHeight;
        element.style.height = originalHeight;
        element.style.borderRadius = originalBorderRadius;
        element.style.border = originalBorder;
        element.style.boxSizing = originalBoxSizing;
      })
      .catch((err) => {
        console.error("PDF generation error:", err);
        if (buttonRow) buttonRow.style.display = "flex";
        element.style.maxWidth = originalMaxWidth;
        element.style.width = originalWidth;
        element.style.minHeight = originalMinHeight;
        element.style.height = originalHeight;
        element.style.borderRadius = originalBorderRadius;
        element.style.border = originalBorder;
        element.style.boxSizing = originalBoxSizing;
      });
  };

  return (
    <div style={styles.overlay}>
      <div id="receipt-modal-container" style={styles.container}>
        <div style={styles.header}>
          <div style={styles.successIcon}>
            <i className="fas fa-check" />
          </div>
          <h2 style={styles.title}>Booking Confirmed!</h2>
          <p style={styles.subtitle}>Thank you for renting with ODEMINE</p>
        </div>
        <hr style={styles.divider} />

        {/* Customer Details */}
        <div style={styles.detailsGroup}>
          <div style={styles.row}>
            <span style={styles.label}>Customer Name:</span>
            <span style={styles.value}>{bookingData.customerName || "N/A"}</span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>Email:</span>
            <span style={styles.value}>{bookingData.customerEmail || "N/A"}</span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>Phone:</span>
            <span style={styles.value}>{bookingData.customerPhone || "N/A"}</span>
          </div>
        </div>

        <hr style={styles.divider} />

        {/* Receipt Details */}
        <div style={styles.detailsGroup}>
          <div style={styles.row}>
            <span style={styles.label}>Vehicle:</span>
            <span style={styles.value}>{bookingData.vehicle}</span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>Pick-up:</span>
            <span style={styles.value}>
              {bookingData.pickupDate} at {bookingData.pickupTime}
            </span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>Drop-off:</span>
            <span style={styles.value}>
              {bookingData.dropoffDate} at {bookingData.dropoffTime}
            </span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>Payment Method:</span>
            <span style={styles.value}>{bookingData.paymentMethod}</span>
          </div>
        </div>

        <hr style={styles.divider} />

        {/* Expanded Price Breakdown Breakdown Section */}
        <div style={styles.detailsGroup}>
          <div style={styles.row}>
            <span style={styles.label}>Sub Total:</span>
            <span style={styles.value}>${bookingData.subTotal}</span>
          </div>

          {hasPromo && (
            <>
              <div style={styles.row}>
                <span style={styles.label}>Promo Code:</span>
                <span style={{ ...styles.value, color: "#49f849" }}>
                  {bookingData.promoCode}
                </span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Discount:</span>
                {/* Removed color: '#49f849' so it defaults to white, and keeping value clean */}
                <span style={styles.value}>
                  -{bookingData.discountPercent}%
                </span>
              </div>
            </>
          )}
        </div>

        <hr style={styles.divider} />

        {/* Total Cost Section */}
        <div style={styles.totalRow}>
          <span style={styles.totalLabel}>Total Paid</span>
          <span style={styles.totalAmount}>${bookingData.totalCost}</span>
        </div>

        {/* Action Buttons */}
        <div className="receipt-button-row" style={{ display: "flex", gap: "10px" }}>
          <button style={{ ...styles.button, flex: 1, backgroundColor: "#222", border: "1px solid #333" }} onClick={onClose}>
            Done
          </button>
          <button style={{ ...styles.button, flex: 1 }} onClick={handleDownloadPDF}>
            <i className="fas fa-download" style={{ marginRight: "6px" }} /> Download
          </button>
        </div>
      </div>
    </div>
  );
};

// Clean inline styles matching your app's red & black theme
const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10000,
    padding: "20px",
  },
  container: {
    backgroundColor: "#111111",
    color: "#ffffff",
    border: "1px solid #ff003c",
    borderRadius: "16px",
    padding: "30px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.75)",
    display: "flex",
    flexDirection: "column",
    fontFamily: "sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  successIcon: {
    backgroundColor: "rgba(73, 248, 73, 0.2)",
    color: "#49f849",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    textAlign: "center",
    lineHeight: "50px",
    fontSize: "20px",
    margin: "0 auto 12px auto",
  },
  title: {
    color: "#ff003c",
    fontSize: "22px",
    margin: "0 0 6px 0",
    fontWeight: "bold",
  },
  subtitle: {
    color: "#aaa",
    fontSize: "14px",
    margin: 0,
  },
  divider: {
    border: "none",
    borderTop: "1px dashed #2a2a2a",
    margin: "15px 0",
  },
  detailsGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
  },
  label: {
    color: "#888",
  },
  value: {
    color: "#ffffff",
    fontWeight: "500",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "10px 0 25px 0",
  },
  totalLabel: {
    fontSize: "16px",
    fontWeight: "600",
  },
  totalAmount: {
    fontSize: "26px",
    color: "#ff003c",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#ff003c",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "14px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
};
