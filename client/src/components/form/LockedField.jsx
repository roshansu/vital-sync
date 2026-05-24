import { colors } from "../../constant/style";
import Icon from "../appointment/Icon";


export default function LockedField({ value, mono = false }) {

  // console.log(value)
  return (
    <div
      className="w-full rounded-lg px-4 py-2.5 text-sm flex items-center justify-between"
      style={{
        background: colors.surfaceContainerHigh,
        color: colors.onSurfaceVariant,
        fontFamily: mono ? "monospace" : "Inter",
        boxShadow: `0 0 0 1px ${colors.outlineVariant}20`,
        cursor: "not-allowed",
      }}
    >
      <span>{value}</span>
      <Icon name="lock" size={14} color={`${colors.onSurfaceVariant}60`} />
    </div>
  );
}