import { useState } from "react";
import MedicineRow from './MedicineRow'
import Icon from "../appointment/Icon";
import { MEDICINES } from "../../constant/constData";
import { colors } from "../../constant/style";


const LIFESTYLE = [
  "Adopt a low-sodium diet (under 2300mg/day).",
  "Engage in 30 minutes of light walking daily.",
  "Monitor blood pressure every morning and log it.",
];

export default function PrescriptionDetail({ setCurrNav, prescriptionData }) {
  const [printHovered, setPrintHovered]       = useState(false);
  const [downloadHovered, setDownloadHovered] = useState(false);
  const [backHovered, setBackHovered]         = useState(false);

  return (
    <>
      <style>{`
        body { font-family: 'Inter', sans-serif; background: ${colors.surface}; }
        h1, h2, h3 { font-family: 'Manrope', sans-serif; }
        @media print {
          .no-print { display: none !important; }
          .print-full { margin-left: 0 !important; padding: 24px !important; }
        }
      `}</style>

      <main
        className="print-full min-h-screen"
        style={{ background: colors.surface, fontFamily: "Inter" }}
      >
        <div className="max-w-5xl mx-auto p-4 md:p-8 lg:p-10">

          {/* ── Action Bar ── */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 no-print">
            {/* Back + ID */}
            <div className="flex items-center gap-4">
              <button
                onClick={()=>setCurrNav('prescriptions')}
                onMouseEnter={() => setBackHovered(true)}
                onMouseLeave={() => setBackHovered(false)}
                className="group flex items-center gap-1 text-sm font-medium transition-colors"
                style={{
                  color: backHovered ? colors.primary : "#64748b",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Icon
                  name="arrow_back"
                  size={18}
                  color={backHovered ? colors.primary : "#64748b"}
                  className={`transition-transform ${backHovered ? "-translate-x-0.5" : ""}`}
                />
                Back to List
              </button>
              <div
                className="hidden sm:block h-4 w-px"
                style={{ background: `${colors.outlineVariant}50` }}
              />
            </div>

            {/* Print + Download */}
            {/* <div className="flex items-center gap-3">
              <button
                onMouseEnter={() => setPrintHovered(true)}
                onMouseLeave={() => setPrintHovered(false)}
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                style={{
                  background: printHovered ? colors.surfaceContainerHighest : colors.surfaceContainerHigh,
                  color: colors.onSurface,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "Inter",
                }}
              >
                <Icon name="print" size={18} color={colors.onSurface} />
                <span className="hidden sm:inline">Print</span>
              </button>
              <button
                onMouseEnter={() => setDownloadHovered(true)}
                onMouseLeave={() => setDownloadHovered(false)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold text-white transition-all"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "Manrope",
                  boxShadow: downloadHovered
                    ? `0 8px 20px ${colors.primary}40`
                    : `0 4px 12px ${colors.primary}25`,
                  opacity: downloadHovered ? 0.92 : 1,
                  transform: downloadHovered ? "translateY(-1px)" : "translateY(0)",
                }}
              >
                <Icon name="download" size={18} color={colors.onPrimary} />
                <span>Download PDF</span>
              </button>
            </div> */}
          </div>

          {/* ── Header Bento ── */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mb-8">
            {/* Doctor card */}
            <div
              className="md:col-span-8 rounded-xl p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 relative overflow-hidden"
              style={{
                background: colors.surfaceContainerLowest,
                boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
              }}
            >
              {/* Decorative blob */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
                style={{
                  background: `${colors.primary}08`,
                  marginRight: -64,
                  marginTop: -64,
                }}
              />

              {/* Avatar */}
              <div
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden flex-shrink-0 border-4"
                style={{
                  borderColor: colors.surfaceContainerLowest,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                }}
              >
                <img
                  src={prescriptionData.doctor?.imageUrl || "https://img.magnific.com/free-vector/user-circles-set_78370-4704.jpg"}
                  alt={prescriptionData.doctor.firstName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="relative z-10">
                <h1
                  className="text-2xl md:text-3xl font-extrabold tracking-tight mb-1"
                  style={{ fontFamily: "Manrope", color: colors.onSurface }}
                >
                  Dr. {prescriptionData.doctor.firstName+" "+prescriptionData.doctor.lastName}
                </h1>
                <p
                  className="text-xs font-bold uppercase tracking-wider mb-4"
                  style={{ color: colors.primary }}
                >
                  {prescriptionData.doctor.doctorId?.specialization[0]} · {prescriptionData.doctor.doctorId?.qualification[0]}.
                </p>
                <div className="flex flex-wrap items-center gap-4 md:gap-6">
                  {[
                    { icon: "calendar_month", label: `Issued: ${new Date(prescriptionData.createdAt).toDateString()} ` },
                    { icon: "schedule",       label: "Validity: 30 Days"    },
                  ].map(({ icon, label }) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <Icon name={icon} size={15} color="#94a3b8" />
                      <span className="text-sm font-semibold" style={{ color: "#475569" }}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Status card */}
            <div
              className="md:col-span-4 rounded-xl p-6 md:p-8 flex flex-col items-center justify-center text-center"
              style={{
                background: colors.surfaceContainerLowest,
                boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
              }}
            >
              <span
                className="text-[10px] uppercase font-bold tracking-widest mb-4"
                style={{ color: "#94a3b8" }}
              >
                Prescription Status
              </span>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                style={{ background: "#f0fdf4", color: "#15803d" }}>
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#22c55e" }}
                />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Active &amp; Verified
                </span>
              </div>
              <p className="text-xs italic" style={{ color: "#94a3b8" }}>
                Digitally signed
              </p>
            </div>
          </div>

          {/* ── Medicines Section ── */}
          <div
            className="rounded-xl overflow-hidden mb-8"
            style={{
              background: colors.surfaceContainerLowest,
              boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
            }}
          >
            {/* Section header */}
            <div
              className="px-6 md:px-8 py-5 flex flex-wrap items-center justify-between gap-3 border-b"
              style={{
                background: colors.surfaceContainerLow,
                borderColor: `${colors.outlineVariant}25`,
              }}
            >
              <h2
                className="text-base md:text-lg font-bold tracking-tight"
                style={{ fontFamily: "Manrope", color: colors.onSurface }}
              >
                Structured Medication List
              </h2>
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{
                  background: `${colors.primary}14`,
                  color: colors.primary,
                }}
              >
                {prescriptionData.medicines.length} Items Prescribed
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                {/* Desktop thead */}
                <thead className="hidden md:table-header-group">
                  <tr
                    style={{
                      borderBottom: `1px solid ${colors.outlineVariant}20`,
                    }}
                  >
                    {["Medicine Name", "Dosage", "Frequency", "Duration", "Route"].map(
                      (h, i) => (
                        <th
                          key={h}
                          className={`px-6 lg:px-8 py-4 text-[10px] uppercase tracking-widest font-bold ${
                            i === 4 ? "text-right" : ""
                          }`}
                          style={{ color: "#94a3b8" }}
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody
                  style={{ borderTop: `1px solid ${colors.outlineVariant}15` }}
                >
                  {prescriptionData.medicines.map((med, idx) => (
                    <MedicineRow key={med.id} med={med} isLast={idx === prescriptionData.medicines.length - 1} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Notes & Instructions ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* General Instructions */}
            <div
              className="rounded-xl p-6 md:p-8 border-l-4"
              style={{
                background: colors.surfaceContainerLowest,
                borderLeftColor: colors.primary,
                boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Icon name="info" size={20} color={colors.primary} />
                <h3
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: "#64748b" }}
                >
                  General Instructions
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed font-medium"
                style={{ color: "#475569" }}
              >
                {prescriptionData.instructions}
              </p>
            </div>

            {/* Dietary & Lifestyle */}
            <div
              className="rounded-xl p-6 md:p-8 border-l-4"
              style={{
                background: colors.surfaceContainerLowest,
                borderLeftColor: colors.tertiary,
                boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Icon name="health_and_safety" size={20} color={colors.tertiary} />
                <h3
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: "#64748b" }}
                >
                  Dietary &amp; Lifestyle Advice
                </h3>
              </div>
              <ul className="space-y-3">
                {prescriptionData.dietTags.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <Icon
                      name="check_circle"
                      filled
                      size={14}
                      color={colors.tertiary}
                      className="mt-0.5 flex-shrink-0"
                    />
                    <span className="text-sm" style={{ color: "#475569" }}>
                      {tip}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Footer Meta ── */}
        </div>
      </main>
    </>
  );
}
