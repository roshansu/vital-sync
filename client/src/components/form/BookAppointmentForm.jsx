import { colors } from "../../constant/style";
import DashIcon from "../DashIcon";
import PaymentCard from './PaymentCard'
import TextInput from "./TextInput";
import AddressSection from './AddressSection'
import ConsultTypeCard from "./ConsultTypeCard";
import SuccessModal from "../SuccessModal";
import { useState } from "react";

export default function BookAppointmentForm({setCurrNav}) {
  const [consultType, setConsultType]   = useState("Online");
  const [payment, setPayment]           = useState("Online Payment");
  const [reason, setReason]             = useState("");
  const [showModal, setShowModal]       = useState(false);
  const [confirmHovered, setConfirmHovered] = useState(false);
  const [cancelHovered, setCancelHovered]   = useState(false);
  const [address, setAddress] = useState({
    line: "", city: "", state: "", pincode: "", landmark: "",
  });

  const [popup, setPopup] = useState({
    show: false,
    type: '',
    message: ''
  })

  // Textarea focus
  const [reasonFocused, setReasonFocused] = useState(false);

  const isHomeVisit = consultType === "Home Visit";

  return (
    <div>
      <style>{`
        
        body { font-family: 'Inter', sans-serif; background: ${colors.surface}; }
        input::placeholder, textarea::placeholder { color: ${colors.outline}70; }
        textarea { resize: none; }
      `}</style>

      <main
        style={{
          minHeight: "100vh",
          background: colors.surface,
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            maxWidth: 680,
            margin: "0 auto",
            background: colors.surfaceContainerLowest,
            borderRadius: 20,
            padding: 40,
            boxShadow: "0 32px 64px -12px rgba(25,28,30,0.07)",
          }}
        >
          {/* ── Header ── */}
          <header style={{ textAlign: "center", marginBottom: 40 }}>
            <h1
              style={{
                fontFamily: "Manrope",
                fontSize: 28,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: colors.onSurface,
                marginBottom: 8,
              }}
            >
              Confirm Your Appointment
            </h1>
            <p style={{ color: colors.onSurfaceVariant, fontSize: 14, fontWeight: 500 }}>
              Please review the details below to finalize your consultation.
            </p>
          </header>

          {/* ── Appointment Summary Card ── */}
          <section
            style={{
              background: colors.surfaceContainerLow,
              borderRadius: 16,
              padding: 28,
              display: "flex",
              gap: 28,
              alignItems: "flex-start",
              marginBottom: 36,
              flexWrap: "wrap",
            }}
          >
            {/* Doctor image */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEqkO_T0LctAPPJ3MV5eNp0sZHe6B_KxC0CMnIUEydVqvIiuPuLFjlt6nOTnkTDnsdd3hBp2URt9jDxjROVl3L6-gK0Ak0Y4OTs05xHYzB4D9IuRpDd8mwKbwOjaUMKYWIlgHtOPZI_rPuGwYOiAa1HNyjhQkrJqZau6oTemoGzZgShpy8G0WTUpm9DLUGJmsiFT8GLg5jtxLY2RVBBMFRVQwvgi9YGfbHx45PBvoGmG22vCQ_rlWSvi1Mek8hceuwrWz0HCWsYDYo"
                alt="Dr. Marcus Thorne"
                style={{ width: 88, height: 88, borderRadius: 14, objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: -6,
                  right: -6,
                  background: colors.primary,
                  borderRadius: 8,
                  padding: 5,
                  display: "flex",
                }}
              >
                <DashIcon name="verified" filled size={14} color={colors.onPrimary} />
              </div>
            </div>

            {/* Doctor info */}
            <div style={{ flex: 1, minWidth: 200 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 16,
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                <div>
                  <h2
                    style={{
                      fontFamily: "Manrope",
                      fontWeight: 700,
                      fontSize: 20,
                      color: colors.onSurface,
                      letterSpacing: "-0.02em",
                      marginBottom: 4,
                    }}
                  >
                    Dr. Marcus Thorne
                  </h2>
                  <p
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: colors.primary,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Cardiology Specialist
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: colors.onSurfaceVariant,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      marginBottom: 4,
                    }}
                  >
                    Total Fee
                  </p>
                  <p
                    style={{
                      fontFamily: "Manrope",
                      fontWeight: 800,
                      fontSize: 22,
                      color: colors.onSurface,
                    }}
                  >
                    $120.00
                  </p>
                </div>
              </div>

              {/* Date + Time chips */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  { icon: "calendar_today", label: "October 28, 2024" },
                  { icon: "schedule",       label: "10:30 AM"         },
                ].map(({ icon, label }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      background: `${colors.surfaceContainerLowest}80`,
                      borderRadius: 10,
                      padding: "10px 12px",
                    }}
                  >
                    <DashIcon name={icon} size={18} color={colors.primary} />
                    <span style={{ fontWeight: 600, fontSize: 13, color: colors.onSurface }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Consultation Type ── */}
          <section style={{ marginBottom: 32 }}>
            <h3
              style={{
                fontFamily: "Manrope",
                fontWeight: 700,
                fontSize: 16,
                color: colors.onSurface,
                marginBottom: 14,
              }}
            >
              Consultation Type
            </h3>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <ConsultTypeCard
                icon="video_chat"
                label="Online"
                value="Online"
                selected={consultType}
                onClick={setConsultType}
              />
              <ConsultTypeCard
                icon="home_health"
                label="Home Visit"
                value="Home Visit"
                selected={consultType}
                onClick={setConsultType}
              />
            </div>

            {/* Inline note for home visit */}
            <div
              style={{
                overflow: "hidden",
                maxHeight: isHomeVisit ? 48 : 0,
                opacity: isHomeVisit ? 1 : 0,
                transition: "max-height 0.3s ease, opacity 0.25s ease",
                marginTop: isHomeVisit ? 10 : 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 12px",
                  background: `${colors.primaryFixed}80`,
                  borderRadius: 10,
                  fontSize: 12,
                  color: colors.onPrimaryFixedVariant,
                  fontWeight: 500,
                }}
              >
                <DashIcon name="info" size={15} color={colors.primaryContainer} />
                Home visits may incur an additional travel fee depending on your location.
              </div>
            </div>
          </section>

          {/* ── Address (only for Home Visit) ── */}
          <AddressSection
            visible={isHomeVisit}
            address={address}
            setAddress={setAddress}
          />

          {/* ── Reason for Visit ── */}
          <section style={{ marginBottom: 32 }}>
            <label
              style={{
                display: "block",
                fontFamily: "Manrope",
                fontWeight: 700,
                fontSize: 16,
                color: colors.onSurface,
                marginBottom: 12,
              }}
            >
              Reason for Visit
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              onFocus={() => setReasonFocused(true)}
              onBlur={() => setReasonFocused(false)}
              placeholder="Briefly describe your symptoms or concern..."
              style={{
                width: "100%",
                background: colors.surfaceContainerLow,
                border: "none",
                borderRadius: 14,
                padding: "14px 16px",
                fontSize: 14,
                fontFamily: "Inter",
                color: colors.onSurface,
                outline: "none",
                boxShadow: reasonFocused
                  ? `0 0 0 2px ${colors.primaryContainer}`
                  : `0 0 0 1px ${colors.outlineVariant}20`,
                transition: "box-shadow 0.2s",
                resize: "none",
                lineHeight: 1.6,
              }}
            />
          </section>

          {/* ── Payment Method ── */}
          <section style={{ marginBottom: 40 }}>
            <h3
              style={{
                fontFamily: "Manrope",
                fontWeight: 700,
                fontSize: 16,
                color: colors.onSurface,
                marginBottom: 14,
              }}
            >
              Payment Method
            </h3>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <PaymentCard
                label="Online Payment"
                value="Online Payment"
                icons={["credit_card", "account_balance_wallet"]}
                selected={payment}
                onClick={setPayment}
              />
              <PaymentCard
                label="Pay at Clinic"
                value="Pay at Clinic"
                icons={["payments"]}
                selected={payment}
                onClick={setPayment}
              />
            </div>
          </section>

          {/* ── Action Buttons ── */}
          <footer style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              onMouseEnter={() => setConfirmHovered(true)}
              onMouseLeave={() => setConfirmHovered(false)}
              onClick={() => setShowModal(true)}
              style={{
                flex: 1,
                padding: "16px",
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
                color: colors.onPrimary,
                fontFamily: "Manrope",
                fontWeight: 700,
                fontSize: 15,
                borderRadius: 12,
                border: "none",
                cursor: "pointer",
                boxShadow: `0 12px 24px -8px ${colors.primary}50`,
                opacity: confirmHovered ? 0.92 : 1,
                transform: confirmHovered ? "translateY(-1px)" : "translateY(0)",
                transition: "opacity 0.15s, transform 0.15s",
              }}
            >
              Confirm Appointment
            </button>
            <button
              onMouseEnter={() => setCancelHovered(true)}
              onMouseLeave={() => setCancelHovered(false)}
              onClick={()=>setCurrNav("appointments")}
              style={{
                padding: "16px 28px",
                background: cancelHovered
                  ? colors.surfaceContainerHighest
                  : colors.surfaceContainerHigh,
                color: colors.onSurface,
                fontFamily: "Manrope",
                fontWeight: 600,
                fontSize: 14,
                borderRadius: 12,
                border: "none",
                cursor: "pointer",
                transition: "background 0.15s",
              }}
            >
              Cancel
            </button>
          </footer>
        </div>

        {/* Support note */}
        <p
          style={{
            textAlign: "center",
            marginTop: 28,
            fontSize: 13,
            color: colors.onSurfaceVariant,
            fontWeight: 500,
          }}
        >
          Need help? Contact our support at{" "}
          <span style={{ color: colors.primary, fontWeight: 700 }}>1-800-ATELIER</span>
        </p>
      </main>

      {popup.show && <SuccessModal message={popup.message} type={popup.type} onClose={() => setShowModal(false)} />}
    </div>
  );
}