import { colors } from "../../constant/style";
import { useState } from "react";

export default function TextInput({ placeholder, value, onChange, style: sx = {} }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        width: "100%",
        background: colors.surfaceContainerLowest,
        border: "none",
        borderRadius: 10,
        padding: "12px 14px",
        fontSize: 14,
        fontFamily: "Inter",
        color: colors.onSurface,
        outline: "none",
        boxShadow: focused
          ? `0 0 0 2px ${colors.primaryContainer}`
          : `0 0 0 1px ${colors.outlineVariant}33`,
        transition: "box-shadow 0.2s",
        ...sx,
      }}
    />
  );
}
