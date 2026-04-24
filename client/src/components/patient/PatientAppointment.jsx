import { useState } from "react";
import { DEPARTMENTS, DAYS, MONTHS, DOCTORS } from "../../constant/constData";
import DashIcon from "../DashIcon";
import { colors } from "../../constant/style";
import MiniCalendar from '../MiniCalendar'
import DoctorCard from '../DoctorCard'
import AppointmentForm from "../form/AppointmentForm";

export default function PatientAppointment({setCurrNav}) {
  const [activeDept, setActiveDept] = useState("All Departments");
  const [search, setSearch]         = useState("");
  const [location, setLocation]     = useState("");
  const [searchFocused, setSearchFocused]   = useState(false);
  const [locationFocused, setLocationFocused] = useState(false);
  const [showForm, setShowForm] = useState(false)

  const inputBase = (focused) => ({
    width: "100%",
    background: "transparent",
    border: "none",
    outline: "none",
    fontSize: 14,
    fontWeight: 500,
    color: colors.onSurface,
    fontFamily: "Inter",
    padding: "12px 0",
    boxShadow: focused ? `inset 0 -2px 0 ${colors.primaryContainer}` : "none",
    transition: "box-shadow 0.2s",
  });

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background: ${colors.surface}; }
        input::placeholder { color: ${colors.outline}80; }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        ::-webkit-scrollbar { height: 4px; width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${colors.outlineVariant}; border-radius: 4px; }
      `}</style>

      <main
        style={{
          marginLeft: 256,
          minHeight: "100vh",
          background: colors.surface,
          padding: "48px",
          fontFamily: "Inter",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* ── Search Header ── */}
          <section style={{ marginBottom: 48 }}>
            <div style={{ marginBottom: 28 }}>
              <h2 style={{
                fontFamily: "Manrope", fontSize: 30, fontWeight: 800,
                letterSpacing: "-0.03em", color: colors.onSurface, marginBottom: 6,
              }}>
                Find Your Specialist
              </h2>
              <p style={{ color: colors.onSurfaceVariant, fontSize: 14 }}>
                Browse our network of world-class medical professionals.
              </p>
            </div>

            {/* Search bar */}
            <div style={{
              display: "flex",
              alignItems: "center",
              background: colors.surfaceContainerLowest,
              borderRadius: 14,
              padding: "0 8px",
              boxShadow: "0 4px 24px rgba(25,28,30,0.06)",
              gap: 0,
            }}>
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, padding: "0 12px" }}>
                <DashIcon name="person_search" size={20} color={colors.primary} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  placeholder="Search doctor, specialty or disease..."
                  style={inputBase(searchFocused)}
                />
              </div>
              <div style={{ width: 1, height: 32, background: `${colors.outlineVariant}50` }} />
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, padding: "0 12px" }}>
                <DashIcon name="location_on" size={20} color={colors.primary} />
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onFocus={() => setLocationFocused(true)}
                  onBlur={() => setLocationFocused(false)}
                  placeholder="City or Medical Center"
                  style={inputBase(locationFocused)}
                />
              </div>
              <button style={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
                color: colors.onPrimary,
                border: "none",
                borderRadius: 10,
                padding: "12px 28px",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                fontFamily: "Manrope",
                margin: 6,
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <DashIcon name="search" size={18} color={colors.onPrimary} />
                Search
              </button>
            </div>
          </section>

          {/* ── Department Filters ── */}
          <section style={{ marginBottom: 40, overflowX: "auto", paddingBottom: 8 }}>
            <div style={{ display: "flex", gap: 10, whiteSpace: "nowrap" }}>
              {DEPARTMENTS.map((dept) => {
                const active = activeDept === dept;
                return (
                  <button
                    key={dept}
                    onClick={() => setActiveDept(dept)}
                    style={{
                      padding: "10px 20px",
                      borderRadius: 9999,
                      border: "none",
                      background: active ? colors.primaryContainer : colors.surfaceContainerLow,
                      color: active ? colors.onPrimaryContainer : colors.onSurfaceVariant,
                      fontWeight: active ? 700 : 500,
                      fontSize: 13,
                      cursor: "pointer",
                      transition: "all 0.15s",
                      fontFamily: "Inter",
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = colors.surfaceContainerHigh; }}
                    onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = colors.surfaceContainerLow; }}
                  >
                    {dept}
                  </button>
                );
              })}
            </div>
          </section>

          {/* ── Doctors Grid ── */}
          <section style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 28,
          }}>
            {DOCTORS.map((doc) => (
              <DoctorCard key={doc.id} setCurrNav={setCurrNav} doctor={doc} />
            ))}
          </section>
        </div>
      </main>

    </>
  );
}