import TopNav from './TopNav'
import ActivityItem from './ActivityItem'
import { useState } from 'react';
import Icon from '../appointment/Icon';
import QuickAction from './QuickAction'
import { colors } from '../../constant/style';
import StatCard from './StatCard'

const RECENT_ACTIVITY = [
  { id: 1, type: "admission",   name: "James Holden",      note: "Admitted — Cardiology Ward",          time: "8:42 AM",  dot: "#004ac6" },
  { id: 2, type: "appointment", name: "Dr. Elena Rossi",   note: "Consultation scheduled — Pediatrics", time: "9:15 AM",  dot: "#495c95" },
  { id: 3, type: "discharge",   name: "Priya Nair",        note: "Discharged — Post-Op clear",          time: "10:00 AM", dot: "#16a34a" },
  { id: 4, type: "alert",       name: "ICU Unit 3",        note: "Bed capacity at 90% — Review needed", time: "10:30 AM", dot: "#dc2626" },
  { id: 5, type: "appointment", name: "Dr. Marcus Thorne", note: "Follow-up confirmed — Neurology",     time: "11:05 AM", dot: "#495c95" },
];

const STATS = [
  { label: "Total Patients",   value: "1,284",  icon: "person",            trend: "+12%", up: true  },
  { label: "Total Doctors",    value: "86",     icon: "medical_information",trend: "+2",   up: true  },
  { label: "Today's Appts",    value: "42",     icon: "calendar_today",    trend: "-3%",  up: false },
  { label: "Total Revenue",    value: "$12,490",icon: "monetization_on",   trend: "+8%",  up: true  },
];

export default function AdminDashboard() {
  const [search, setSearch]               = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [fabHovered, setFabHovered]       = useState(false);

  return (
    <>
      <style>{`
        body { font-family: 'Inter', sans-serif; background: ${colors.surface}; color: ${colors.onSurface}; }
        input::placeholder { color: #94a3b8; }
        @media (max-width: 768px) {
          .main-offset { margin-left: 0 !important; }
          .topnav-offset { margin-left: 0 !important; }
        }
      `}</style>

      {/* ── Fixed top nav ── */}
      <TopNav
        search={search}
        setSearch={setSearch}
        searchFocused={searchFocused}
        setSearchFocused={setSearchFocused}
      />

      {/* ── Main canvas ── */}
      <main
        className="main-offset min-h-screen pb-24"
        style={{ background: colors.surface, fontFamily: "Inter" }}
      >
        <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10">

          {/* ── Page header ── */}
          <section className="space-y-1">
            <h1
              className="text-3xl md:text-4xl font-extrabold tracking-tight"
              style={{ fontFamily: "Manrope", color: colors.onSurface }}
            >
              Command Center
            </h1>
            <p className="text-sm md:text-base" style={{ color: colors.onSurfaceVariant }}>
              Overview of system activity and hospital vitals for today.
            </p>
          </section>

          {/* ── Summary stat cards ── */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {STATS.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </section>

          {/* ── Quick actions ── */}
          <section className="flex flex-wrap gap-3">
            <QuickAction icon="person_add"     label="Add Patient"         primary />
            <QuickAction icon="person_add_alt" label="Add Doctor"          primary />
            <QuickAction icon="visibility"     label="View Appointments"           />
            <QuickAction icon="bar_chart"      label="View Reports"                />
          </section>

          {/* ── Main grid ── */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">

            {/* ── Recent Activity (8 cols) ── */}
            <div className="lg:col-span-8 space-y-0">
              <div
                className="rounded-xl overflow-hidden border"
                style={{
                  background: colors.surfaceContainerLowest,
                  borderColor: `${colors.outlineVariant}18`,
                  boxShadow: "0 4px 24px rgba(25,28,30,0.05)",
                }}
              >
                {/* Header */}
                <div
                  className="px-6 py-5 flex items-center justify-between border-b"
                  style={{ borderColor: `${colors.outlineVariant}18` }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: colors.primaryFixed }}
                    >
                      <Icon name="timeline" size={17} color={colors.primary} />
                    </div>
                    <div>
                      <h3
                        className="font-bold text-base"
                        style={{ fontFamily: "Manrope", color: colors.onSurface }}
                      >
                        Recent Activity
                      </h3>
                      <p className="text-[11px]" style={{ color: "#94a3b8" }}>
                        Live hospital event stream
                      </p>
                    </div>
                  </div>
                  <button
                    className="text-xs font-bold transition-colors"
                    style={{
                      color: colors.primary,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "Inter",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                    onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                  >
                    View All
                  </button>
                </div>

                {/* Activity list */}
                <div className="p-6">
                  {RECENT_ACTIVITY.map((item, idx) => (
                    <ActivityItem
                      key={item.id}
                      item={item}
                      isLast={idx === RECENT_ACTIVITY.length - 1}
                    />
                  ))}
                </div>

                {/* Footer */}
                <div
                  className="px-6 py-4 border-t flex items-center justify-between"
                  style={{
                    background: `${colors.surfaceContainerLow}60`,
                    borderColor: `${colors.outlineVariant}18`,
                  }}
                >
                  <p className="text-xs font-medium" style={{ color: "#94a3b8" }}>
                    Showing last 5 events · Auto-refreshes every 60s
                  </p>
                  <div
                    className="flex items-center gap-1.5"
                    style={{ color: "#22c55e" }}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: "#22c55e", animation: "pulse 2s infinite" }}
                    />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Live
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Today's Appointments mini-table ── */}
              <div
                className="mt-6 rounded-xl overflow-hidden border"
                style={{
                  background: colors.surfaceContainerLowest,
                  borderColor: `${colors.outlineVariant}18`,
                  boxShadow: "0 4px 24px rgba(25,28,30,0.05)",
                }}
              >
                <div
                  className="px-6 py-5 flex items-center justify-between border-b"
                  style={{ borderColor: `${colors.outlineVariant}18` }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: colors.tertiaryFixed }}
                    >
                      <Icon name="event" size={17} color={colors.tertiary} />
                    </div>
                    <h3
                      className="font-bold text-base"
                      style={{ fontFamily: "Manrope", color: colors.onSurface }}
                    >
                      Today's Appointments
                    </h3>
                  </div>
                  <span
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                    style={{
                      background: `${colors.primary}14`,
                      color: colors.primary,
                    }}
                  >
                    42 Total
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr style={{ background: `${colors.surfaceContainerLow}60` }}>
                        {["Patient", "Doctor", "Dept.", "Time", "Status"].map((h) => (
                          <th
                            key={h}
                            className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest"
                            style={{ color: "#94a3b8" }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { patient: "James Holden",   doctor: "Dr. Vance",  dept: "Cardiology",  time: "9:00 AM",  status: "Confirmed" },
                        { patient: "Priya Nair",     doctor: "Dr. Rossi",  dept: "Pediatrics",  time: "10:30 AM", status: "In Progress" },
                        { patient: "Lena Fischer",   doctor: "Dr. Zhang",  dept: "Endocrinology",time: "11:00 AM", status: "Waiting" },
                        { patient: "Marcus Webb",    doctor: "Dr. Thorne", dept: "Neurology",   time: "2:00 PM",  status: "Confirmed" },
                      ].map((row, i) => {
                        const statusStyle = {
                          Confirmed:   { bg: "#eff6ff", color: "#2563eb" },
                          "In Progress":{ bg: "#f0fdf4", color: "#15803d" },
                          Waiting:     { bg: "#fffbeb", color: "#d97706" },
                        }[row.status] || { bg: colors.surfaceContainerHigh, color: colors.outline };

                        return (
                          <tr
                            key={i}
                            className="border-t transition-colors"
                            style={{
                              borderColor: `${colors.outlineVariant}18`,
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = `${colors.surfaceContainerLow}60`)}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                          >
                            <td className="px-6 py-4 text-sm font-semibold" style={{ color: colors.onSurface }}>{row.patient}</td>
                            <td className="px-6 py-4 text-sm" style={{ color: colors.onSurfaceVariant }}>{row.doctor}</td>
                            <td className="px-6 py-4 text-sm" style={{ color: colors.onSurfaceVariant }}>{row.dept}</td>
                            <td className="px-6 py-4 text-sm font-semibold" style={{ color: colors.onSurface }}>{row.time}</td>
                            <td className="px-6 py-4">
                              <span
                                className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full"
                                style={{ background: statusStyle.bg, color: statusStyle.color }}
                              >
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* ── Right sidebar (4 cols) ── */}
            <div className="lg:col-span-4 space-y-6">

              {/* Pharmacy stock */}
              {/* <div
                className="rounded-xl border overflow-hidden"
                style={{
                  background: colors.surfaceContainerLowest,
                  borderColor: `${colors.outlineVariant}18`,
                  boxShadow: "0 4px 24px rgba(25,28,30,0.05)",
                }}
              >
                <div
                  className="px-5 py-4 flex items-center gap-3 border-b"
                  style={{ borderColor: `${colors.outlineVariant}18` }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: "#fef2f2" }}
                  >
                    <Icon name="medication" filled size={17} color="#dc2626" />
                  </div>
                  <div>
                    <h3
                      className="font-bold text-sm"
                      style={{ fontFamily: "Manrope", color: colors.onSurface }}
                    >
                      Pharmacy Stock
                    </h3>
                    <p className="text-[10px]" style={{ color: "#94a3b8" }}>
                      2 items low
                    </p>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  {PHARMACY.map((item) => (
                    <PharmacyRow key={item.name} item={item} />
                  ))}
                </div>
                <div
                  className="px-5 py-3 border-t"
                  style={{ borderColor: `${colors.outlineVariant}18`, background: `${colors.surfaceContainerLow}60` }}
                >
                  <button
                    className="text-xs font-bold w-full text-center transition-colors"
                    style={{ color: colors.primary, background: "none", border: "none", cursor: "pointer" }}
                    onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                    onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                  >
                    Manage Inventory →
                  </button>
                </div>
              </div> */}

              {/* Occupancy meter */}
              {/* <div
                className="rounded-xl border p-5 space-y-4"
                style={{
                  background: colors.surfaceContainerLowest,
                  borderColor: `${colors.outlineVariant}18`,
                  boxShadow: "0 4px 24px rgba(25,28,30,0.05)",
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: `${colors.primary}10` }}
                  >
                    <Icon name="bed" filled size={17} color={colors.primary} />
                  </div>
                  <h3
                    className="font-bold text-sm"
                    style={{ fontFamily: "Manrope", color: colors.onSurface }}
                  >
                    Bed Occupancy
                  </h3>
                </div>
                {[
                  { ward: "General",    pct: 72, color: "#22c55e" },
                  { ward: "ICU",        pct: 90, color: "#ef4444" },
                  { ward: "Pediatrics", pct: 55, color: "#3b82f6" },
                  { ward: "Cardiology", pct: 81, color: "#f59e0b" },
                ].map(({ ward, pct, color }) => (
                  <div key={ward}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium" style={{ color: colors.onSurfaceVariant }}>
                        {ward}
                      </span>
                      <span
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                        style={{
                          background: pct >= 85 ? "#fef2f2" : "#f8fafc",
                          color: pct >= 85 ? "#dc2626" : "#64748b",
                        }}
                      >
                        {pct}%
                      </span>
                    </div>
                    <div
                      className="h-1.5 rounded-full overflow-hidden"
                      style={{ background: colors.surfaceContainerHigh }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, background: color }}
                      />
                    </div>
                  </div>
                ))}
              </div> */}

              {/* System status */}
              {/* <div
                className="rounded-xl border p-5 space-y-3"
                style={{
                  background: colors.surfaceContainerLowest,
                  borderColor: `${colors.outlineVariant}18`,
                  boxShadow: "0 4px 24px rgba(25,28,30,0.05)",
                }}
              >
                <h3
                  className="font-bold text-sm mb-3"
                  style={{ fontFamily: "Manrope", color: colors.onSurface }}
                >
                  System Status
                </h3>
                {[
                  { label: "EMR System",     ok: true  },
                  { label: "Billing Engine", ok: true  },
                  { label: "Lab Interface",  ok: false },
                  { label: "AI Assistant",   ok: true  },
                ].map(({ label, ok }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-xs font-medium" style={{ color: colors.onSurfaceVariant }}>
                      {label}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: ok ? "#22c55e" : "#ef4444",
                          animation: ok ? "none" : "pulse 1.5s infinite",
                        }}
                      />
                      <span
                        className="text-[10px] font-bold"
                        style={{ color: ok ? "#15803d" : "#dc2626" }}
                      >
                        {ok ? "Operational" : "Degraded"}
                      </span>
                    </div>
                  </div>
                ))}
              </div> */}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}