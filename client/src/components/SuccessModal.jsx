import { colors } from "../constant/style";
import Icon from "./Icon";

export default function SuccessModal({ onClose, message, type }) {

  const msgType = {
    pending: {
      msg: "Pending...",
      style: "text-yellow-500",
      color: "yellow"
    },
    success: {
      msg: "Successful",
      style: "text-green-500",
      color: "green"
    },
    error: {
      msg: "Error",
      style: "text-red-500",
      color: "red"
    }
  }

  console.log(msgType[type].style)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(25,28,30,0.5)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-10 text-center shadow-2xl"
        style={{ background: colors.surfaceContainerLowest }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: `${colors.primaryContainer}18` }}
        >
          <Icon name="check_circle" filled size={40} color={msgType[type].color} />
        </div>
        <h3
          className={`text-2xl font-bold ${msgType[type].style} mb-2`}
          style={{ fontFamily: "Manrope" }}
        >
          {msgType[type]?.msg || "Please wait.."}
        </h3>
        <p className="mb-8 text-sm leading-relaxed" style={{ color: colors.onSurfaceVariant }}>
          {message}
        </p>
        { type === "pending"?'':
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity active:scale-[0.98]"
          style={{
            background: colors.primary,
            color: colors.onPrimary,
            fontFamily: "Manrope",
            border: "none",
            cursor: "pointer",
          }}
        >
          Continue
        </button>
      }
      </div>
    </div>
  );
}