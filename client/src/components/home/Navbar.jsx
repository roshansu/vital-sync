import { colors } from "../../constant/style";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getUserData } from "../../lib/setLocalData";

export default function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = getUserData()
  return (
    <nav
      className="fixed top-0 w-full z-50 transition-all duration-300"
      style={{ background: "rgba(247,249,251,0.80)", backdropFilter: "blur(20px)" }}
    >
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined icon-filled text-2xl"
            style={{ color: colors.primaryContainer }}
          >
            clinical_notes
          </span>
          <span
            className="text-xl font-bold tracking-tighter"
            style={{ fontFamily: "Manrope", color: colors.onSurface }}
          >
            Vital Sync
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {["Features", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="opacity-70 hover:opacity-100 transition-opacity duration-300 text-sm font-semibold tracking-tight"
              style={{ fontFamily: "Manrope", color: colors.onSurface }}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* <button
            onClick={() => setDarkMode(!darkMode)}
            className="material-symbols-outlined p-2 rounded-full transition-colors hover:bg-gray-200"
            style={{ color: colors.onSurfaceVariant }}
          >
            {darkMode ? "light_mode" : "dark_mode"}
          </button> */}
          { user?   
            <Link to={`/${user?.role}`} >
              <button
                  className="primary-gradient text-white px-6 py-2 rounded-lg text-sm font-semibold shadow-sm hover:opacity-90 active:scale-95 transition-all"
                >
                    Dashboard
              </button>
            </Link>
            :
            <div className="hidden md:flex items-center gap-2">
            <Link to={'/login'}>
              <button
                className="px-5 py-2 text-sm font-semibold opacity-70 hover:opacity-100 transition-opacity"
                style={{ color: colors.onSurface }}
              >
                Login
              </button>
            </Link>
            <Link to={'/signup'}>
              <button
                className="primary-gradient text-white px-6 py-2 rounded-lg text-sm font-semibold shadow-sm hover:opacity-90 active:scale-95 transition-all"
              >
                Get Started
              </button>
            </Link>
            </div>
          }
          {/* Mobile menu toggle */}
          { !user && (<button
            className="md:hidden material-symbols-outlined p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: colors.onSurface }}
          >
            {menuOpen ? "close" : "menu"}
          </button>) }
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden px-8 pb-4 flex flex-col gap-4"
          style={{ background: "rgba(247,249,251,0.95)" }}
        >
          {["Features", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-semibold opacity-70 hover:opacity-100 transition-opacity"
              style={{ fontFamily: "Manrope", color: colors.onSurface }}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <div className="flex gap-2 pt-2">
            <Link to={'/login'}>
            <button
              className="px-5 py-2 text-sm font-semibold opacity-70 hover:opacity-100 transition-opacity"
              style={{ color: colors.onSurface }}
            >
              Login
            </button>
            </Link>
            <Link to={'/signup'}>
            <button className="primary-gradient text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm hover:opacity-90 transition-all">
              Get Started
            </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
