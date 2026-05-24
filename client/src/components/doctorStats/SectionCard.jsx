import { colors } from "../../constant/style";

export default function SectionCard({ title, action, actionLabel, children }) {
  return (
    <section
      className="rounded-xl overflow-hidden border"
      style={{
        background: colors.surfaceContainerLowest,
        borderColor: `${colors.outlineVariant}18`,
        boxShadow: "0 4px 32px -8px rgba(0,0,0,0.05)",
      }}
    >
      <div
        className="px-6 md:px-8 py-5 flex items-center justify-between border-b"
        style={{ borderColor: colors.surfaceContainerLow }}
      >
        <h3
          className="text-lg md:text-xl font-bold"
          style={{ fontFamily: "Manrope", color: colors.onSurface }}
        >
          {title}
        </h3>
        {action && (
          <button
            onClick={action}
            className="text-xs font-bold transition-colors"
            style={{ color: colors.primary, background: "none", border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
          >
            {actionLabel}
          </button>
        )}
      </div>
      <div className="p-4 space-y-3">{children}</div>
    </section>
  );
}