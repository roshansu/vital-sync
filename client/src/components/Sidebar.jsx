import NavLink from './NavLink'
import DashIcon from './DashIcon';
import { colors } from '../constant/style';
import {patientNav} from '../constant/constData'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';


export default function Sidebar({ activeId, setCurrNav, currNav }) {
  const [active, setActive] = useState(activeId);
  const [logoutHovered, setLogoutHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleNav = (id) => {
    setActive(id);
    setCurrNav(id);
  };

  useEffect(()=>{
    setActive(currNav)
  },[currNav])

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${colors.outlineVariant}; border-radius: 4px; }
      `}</style>

      <button
          onClick={() => setIsOpen(true)}
          className="md:hidden fixed top-1 left-1 z-50 p-1 text-2xl "
      >
        ☰
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}


      <aside
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          height: "100vh",
          // width: 256,
          background: colors.surfaceContainerLow,
          display: "flex",
          flexDirection: "column",
          padding: 16,
          gap: 4,
          zIndex: 50,
          transition: "width 0.3s",
          fontFamily: "Inter",
        }}

        className={`fixed top-0 left-0 h-screen w-64 bg-white z-50 shadow-lg
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:shadow-none`}
      >
        {/* ── Brand ─────────────────────────────────────────────────────────── */}
        <Link to={'/'}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "24px 12px",
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(0,74,198,0.3)",
              flexShrink: 0,
            }}
          >
            <DashIcon name="medical_services" filled size={20} color={colors.onPrimary} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <span
              style={{
                fontSize: 18,
                fontWeight: 800,
                fontFamily: "Manrope",
                color: colors.onSurface,
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              Vital Sync
            </span>
            <span
              style={{
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: colors.outline,
                marginTop: 4,
              }}
            >
              Precision Serenity
            </span>
          </div>
        </div>
        </Link>

        {/* ── New Consultation CTA ──────────────────────────────────────────── */}
        {/* <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            width: "100%",
            padding: "12px 16px",
            background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
            color: colors.onPrimary,
            fontWeight: 600,
            fontSize: 13,
            fontFamily: "Inter",
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,74,198,0.2)",
            marginBottom: 16,
            transition: "opacity 0.2s, transform 0.1s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <DashIcon name="add" size={20} color={colors.onPrimary} />
          New Consultation
        </button> */}

        {/* ── Primary Nav ───────────────────────────────────────────────────── */}
        <nav
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            overflowY: "auto",
          }}
        >
          {patientNav.map((item) => (
            <NavLink
              key={item.id}
              item={item}
              isActive={active === item.id}
              onClick={handleNav}
            />
          ))}

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: `${colors.outlineVariant}50`,
              margin: "12px 16px",
            }}
          />

          {/* Settings */}
          <NavLink
            item={{ id: "settings", label: "Settings", icon: "settings" }}
            isActive={active === "settings"}
            onClick={handleNav}
          />
        </nav>

        {/* ── Footer: User + Logout ─────────────────────────────────────────── */}
        <div
          style={{
            marginTop: "auto",
            paddingTop: 12,
            borderTop: `1px solid ${colors.outlineVariant}40`,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {/* User card */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 12px",
              borderRadius: 12,
              background: `${colors.surfaceContainerLowest}80`,
            }}
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkx-urR2A4d0egJcJbmh5sJvsz15uTQVefmA5laD6kzpVePZ8DAMAGBGlx6NCvGHUqrUaT2nx9COpfmHCqfmYCu1A41-zusDY4N2Fn1WChLh8JpD4t0i7vhn0i4_G_gEVhPQI3khXeczjfSAu_WrPa6iIDDV8FTuisBv3LGVfKMNVmSjEOAHiipax45VmsC7uig1_hWe6C5NCUZXdyNHXdctOhnGJ_UKHIdOK8kqjcDCBCH0nHemexSB9nwQ4umYuc9T_bTFKB-SXC"
              alt="Dr. Julian Vance"
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                objectFit: "cover",
                border: `2px solid ${colors.surfaceContainerLowest}`,
                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                flexShrink: 0,
              }}
            />
            <div style={{ overflow: "hidden" }}>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  fontFamily: "Manrope",
                  color: colors.onSurface,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  lineHeight: 1.2,
                }}
              >
                Dr. Julian Vance
              </p>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: "#64748b",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  marginTop: 2,
                }}
              >
                Chief Administrator
              </p>
            </div>
          </div>

          {/* Logout */}
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            onMouseEnter={() => setLogoutHovered(true)}
            onMouseLeave={() => setLogoutHovered(false)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 16px",
              borderRadius: 10,
              textDecoration: "none",
              background: logoutHovered ? `${colors.errorContainer}50` : "transparent",
              transition: "background 0.15s",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <DashIcon
                name="logout"
                size={20}
                color={logoutHovered ? colors.error : "#64748b"}
              />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: "Inter",
                  color: logoutHovered ? colors.error : "#64748b",
                  transition: "color 0.15s",
                }}
              >
                Logout
              </span>
            </div>
            <DashIcon
              name="chevron_right"
              size={16}
              color={logoutHovered ? colors.error : "#64748b"}
              style={{ opacity: logoutHovered ? 0.7 : 0.3 }}
            />
          </a>
        </div>
      </aside>
    </>
  );
}
