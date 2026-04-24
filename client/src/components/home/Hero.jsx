import { customStyles, colors } from "../../constant/style";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left copy */}
        <div className="lg:col-span-6 space-y-8">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full"
            style={{ background: colors.primaryFixed }}
          >
            <span
              className="material-symbols-outlined icon-filled"
              style={{ fontSize: 14, color: colors.onPrimaryFixedVariant }}
            >
              verified
            </span>
            <span
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ fontFamily: "Inter", color: colors.onPrimaryFixedVariant }}
            >
              v2.4 Precision Update
            </span>
          </div>

          <h1
            className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1]"
            style={{ fontFamily: "Manrope", color: colors.onSurface }}
          >
            Smart Appointment & <br />
            <span style={{ color: colors.primaryContainer }}>Healthcare Platform</span>
          </h1>

          <p
            className="text-lg leading-relaxed max-w-lg"
            style={{ color: colors.onSurfaceVariant }}
          >
            Precision serenity for modern healthcare. Streamline operations, empower clinical
            staff, and enhance patient outcomes with our integrated platform.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
          <Link to={'/signup'}>
            <button className="primary-gradient text-white px-8 py-4 rounded-lg font-bold shadow-lg hover:opacity-95 transition-all flex items-center gap-2">
              Get Started
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                arrow_forward
              </span>
            </button>
          </Link>  
          <Link to={'/login'}>
            <button
              className="px-8 py-4 rounded-lg font-bold transition-all"
              style={{
                background: colors.surfaceContainerHigh,
                color: colors.onSurface,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = colors.surfaceContainerHighest)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = colors.surfaceContainerHigh)
              }
            >
              Book Appointment
            </button>
          </Link>
          </div>
        </div>

        {/* Right visual */}
        <div className="lg:col-span-6 relative">
          <div
            className="glass-panel relative rounded-xl overflow-hidden p-4 flex items-center justify-center"
            style={{ aspectRatio: "4/3" }}
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEUiAnHHBYtaYtPuWxGlrELJgPzIi815My2BgEU5TCvh3KaTjFWQjNaLoMu6ESJi1QAwwjRMYB4izV4Hlw7P89pB7IpZSmg-Wt0mdLZvR_j7RZjJBavJZa4nhFKi9D6Q70z5hm0ZPXJKo6ergmNjhjMAAYOjiEF9c8aXyPwKXBL5ih4qrBI9uUPqwT4QsCFbFe6DgKDbT5_7ZwNpLtRGARlv-sUXAC7DxCD-m-45MfiI4PGUVsmKGGpWxZ1D9bn9p98q66U7aobV09"
              alt="Clinical Dashboard Preview"
              className="w-full h-full object-cover rounded-lg shadow-2xl"
            />

            {/* Floating vitals card */}
            <div
              className="glass-panel absolute -bottom-6 -left-6 p-6 rounded-xl shadow-xl w-64 hidden md:block"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                  style={{ background: colors.tertiaryContainer }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                    ecg
                  </span>
                </div>
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-tighter"
                    style={{ color: colors.onSurfaceVariant }}
                  >
                    Live Vitals
                  </p>
                  <p
                    className="text-sm font-bold"
                    style={{ color: colors.onSurface }}
                  >
                    Patient Room 402
                  </p>
                </div>
              </div>
              {/* Mini bar chart */}
              <div className="h-12 w-full flex items-end gap-1">
                {[60, 80, 40, 90, 50].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm"
                    style={{
                      background: colors.tertiary,
                      height: `${h}%`,
                      opacity: 0.4 + i * 0.15,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}