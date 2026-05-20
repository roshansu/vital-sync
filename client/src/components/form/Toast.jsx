import { colors } from "../../constant/style";
import Icon from "../appointment/Icon";

export default function Toast({ visible, msg }) {
  if (!visible) return null;
  return (
    <div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl"
      style={{
        background: colors.onSurface,
        color: colors.onPrimaryContainer,
        fontFamily: "Inter",
        animation: "toastIn 0.25s ease",
      }}
    >
      <Icon name="check_circle" filled size={18} color="#4ade80" />
      <span className="text-sm font-semibold">{msg}</span>
    </div>
  );
}