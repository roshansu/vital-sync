import { colors } from "../../constant/style";
import Icon from "../appointment/Icon";

export default function ConfirmDialog({ message, confirmLabel, danger = false, onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4"
      style={{ background: "rgba(25,28,30,0.5)", backdropFilter: "blur(6px)" }}
      onClick={onCancel}
    >
      <div
        className="w-full max-w-xs rounded-2xl p-6 shadow-2xl"
        style={{ background: colors.surfaceContainerLowest, animation: "popIn 0.2s ease" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: danger ? colors.errorContainer : "#fef9c3" }}
        >
          <Icon name={danger ? "warning" : "help"} filled size={22} color={danger ? colors.error : "#a16207"} />
        </div>
        <p className="text-sm font-medium text-center mb-5" style={{ color: colors.onSurface, fontFamily: "Inter" }}>
          {message}
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors"
            style={{ background: colors.surfaceContainerHigh, color: colors.onSurface, border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = colors.surfaceContainerHighest)}
            onMouseLeave={(e) => (e.currentTarget.style.background = colors.surfaceContainerHigh)}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all"
            style={{
              background: danger ? colors.error : `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
              color: colors.onPrimary,
              border: "none",
              cursor: "pointer",
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}