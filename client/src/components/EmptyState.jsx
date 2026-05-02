import Icon from "../components/appointment/Icon";
import { colors } from "../constant/style";

export default function EmptyState() {
  return (
    <div
      className="rounded-xl border border-dashed py-16 flex flex-col items-center text-center"
      style={{
        background: colors.surfaceContainerLow,
        borderColor: `${colors.outlineVariant}50`,
      }}
    >
      <div
        className="w-24 h-24 mb-6 rounded-full flex items-center justify-center"
        style={{ background: colors.surfaceContainerHigh }}
      >
        <Icon name="history_edu" filled size={40} className="text-slate-300" />
      </div>
      <h3
        className="text-xl font-bold mb-2"
        style={{ fontFamily: "Manrope", color: colors.onSurface }}
      >
        No recent past appointments
      </h3>
      <p className="max-w-sm mb-8 text-sm leading-relaxed" style={{ color: "#64748b" }}>
        You haven't completed any visits in the last 30 days. Your full medical history
        is available in the Records tab.
      </p>
      <div className="flex gap-3">
        <button
          className="px-6 py-2.5 text-sm font-bold rounded-lg border transition-colors hover:bg-white"
          style={{
            background: colors.surfaceContainerLowest,
            color: colors.onSurface,
            borderColor: `${colors.outlineVariant}33`,
          }}
        >
          Browse Specialists
        </button>
        <button
          className="px-6 py-2.5 text-sm font-bold rounded-lg flex items-center gap-2 transition-opacity hover:opacity-90"
          style={{ background: colors.primary, color: colors.onPrimary }}
        >
          <Icon name="search" size={18} />
          Find a Doctor
        </button>
      </div>
    </div>
  );
}