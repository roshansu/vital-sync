import { colors } from "../../constant/style";
import { useState } from "react";

export default function EditableInput({ type = "text", value, onChange, placeholder, className = "" }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={`w-full rounded-lg px-4 py-2.5 text-sm border-none outline-none transition-all ${className}`}
      style={{
        background: colors.surfaceContainerLow,
        color: colors.onSurface,
        fontFamily: "Inter",
        boxShadow: focused
          ? `0 0 0 2px ${colors.primaryContainer}50`
          : `0 0 0 1px ${colors.outlineVariant}30`,
      }}
    />
  );
}