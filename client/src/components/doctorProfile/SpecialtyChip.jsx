
import { colors } from "../../constant/style";


export default function SpecialtyChip({ label, onRemove }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"
      style={{
        background: `${colors.primaryContainer}15`,
        color: colors.primaryContainer,
        border: `1px solid ${colors.primaryContainer}25`,
      }}
    >
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          style={{ background: "none", border: "none", cursor: "pointer", lineHeight: 1, padding: 0, color: colors.primaryContainer, opacity: 0.6 }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
        >
          ×
        </button>
      )}
    </span>
  );
}