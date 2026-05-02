import { useState } from "react";
import { UPCOMING } from "../../constant/constData";
import Icon from "./Icon";
import EmptyState from '../EmptyState'
import AppointmentCard from './AppointmentCard'
import { colors } from "../../constant/style";

export default function Appointments() {
  const [activeTab, setActiveTab]       = useState("Schedule");
  const [search, setSearch]             = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [appointments, setAppointments] = useState(UPCOMING);

  const tabs = ["Schedule", "Pending"];

  const handleCancel = (id) =>
    setAppointments((prev) => prev.filter((a) => a.id !== id));

  const filtered = appointments.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <style>{`
        body { font-family: 'Inter', sans-serif; background: ${colors.surface}; }
        input::placeholder { color: #94a3b8; }
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          display: inline-flex; align-items: center;
        }
      `}</style>

      <div
        className="flex flex-col min-h-screen"
        style={{ background: colors.surface, fontFamily: "Inter" }}
      >
        {/* ── Sticky Top Bar ── */}
        <header
          className="w-full sticky top-0 z-40 flex justify-between items-center px-8 h-16"
          style={{ background: `${colors.surface}f0`, backdropFilter: "blur(12px)" }}
        >
          {/* Search */}
          <div
            className="flex items-center gap-3 rounded-full px-4 py-2 w-96 transition-all"
            style={{
              background: colors.surfaceContainerLow,
              boxShadow: searchFocused
                ? `0 0 0 2px ${colors.primaryContainer}40`
                : "none",
            }}
          >
            <Icon name="search" size={18} className="text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search appointments or records..."
              className="bg-transparent border-none outline-none text-sm w-full"
              style={{ color: colors.onSurface, fontFamily: "Inter" }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="flex items-center"
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                <Icon name="close" size={15} className="text-slate-400" />
              </button>
            )}
          </div>

          {/* Right: notification + avatar placeholder */}
        </header>

        {/* ── Main Canvas ── */}
        <main className="p-8 space-y-10">

          {/* ── Page Header ── */}
          <div className="flex lg:flex-row flex-col justify-between items-end">
            <div className="space-y-1">
              <h1
                className="text-3xl font-extrabold tracking-tight"
                style={{ fontFamily: "Manrope", color: colors.onSurface }}
              >
                Appointments
              </h1>
              <p className="text-sm" style={{ color: colors.onSurfaceVariant }}>
                Manage your clinical visits and consultation history.
              </p>
            </div>

            {/* Tab switcher */}
            <div
              className="flex gap-1 p-1 rounded-lg"
              style={{ background: colors.surfaceContainerLow }}
            >
              {tabs.map((tab) => {
                const active = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="px-4 py-2 text-sm font-semibold rounded-md transition-all"
                    style={{
                      background: active ? colors.surfaceContainerLowest : "transparent",
                      color: active ? colors.primary : "#64748b",
                      boxShadow: active ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                      fontFamily: "Inter",
                    }}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Upcoming Appointments ── */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <h2
                className="text-lg font-bold"
                style={{ fontFamily: "Manrope", color: colors.onSurface }}
              >
                Upcoming Appointments
              </h2>
              {/* <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                style={{
                  background: `${colors.primary}16`,
                  color: colors.primary,
                }}
              >
                {filtered.length}Scheduled
              </span> */}
            </div>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {filtered.map((appt) => (
                  <AppointmentCard
                    key={appt.id}
                    appt={appt}
                    onCancel={handleCancel}
                  />
                ))}
              </div>
            ) : (
              <div
                className="rounded-xl py-12 flex flex-col items-center text-center border border-dashed"
                style={{
                  background: colors.surfaceContainerLow,
                  borderColor: `${colors.outlineVariant}50`,
                }}
              >
                <Icon name="event_busy" size={40} className="mb-4 text-slate-300" />
                <p className="font-bold mb-1" style={{ color: colors.onSurface }}>
                  No appointments found
                </p>
                <p className="text-sm" style={{ color: "#64748b" }}>
                  {search ? `No results for "${search}"` : "You have no upcoming appointments."}
                </p>
              </div>
            )}
          </section>

          {/* ── Recent Medical Activity ── */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2
                className="text-lg font-bold"
                style={{ fontFamily: "Manrope", color: colors.onSurface }}
              >
                Recent Medical Activity
              </h2>
              <button
                className="text-sm font-semibold hover:underline underline-offset-4 transition-all"
                style={{ color: colors.primary }}
              >
                View All History
              </button>
            </div>

            <EmptyState />
          </section>
        </main>
      </div>
    </>
  );
}
