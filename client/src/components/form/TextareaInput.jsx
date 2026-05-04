import { colors } from "../../constant/style";
import { useState } from "react";

export default function TextareaInput({ value, onChange, rows = 3 }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      value={value}
      onChange={onChange}
      rows={rows}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className="w-full rounded-lg px-4 py-2.5 text-sm leading-relaxed border-none outline-none transition-all"
      style={{
        background: colors.surfaceContainerLow,
        color: colors.onSurface,
        fontFamily: "Inter",
        boxShadow: focused
          ? `0 0 0 2px ${colors.primaryContainer}50`
          : `0 0 0 1px ${colors.outlineVariant}30`,
        resize: "none",
      }}
    />
  );
}
