import { useState } from "react";
import {colors} from '../../constant/style'

export default function FocusInput({ type = "text", value, onChange, placeholder, style: extraStyle = {} }) {
  const [focused, setFocused] = useState(false);
  const isControlled = typeof onChange === "function" && typeof value === "string";

  return (
    <input
      type={type}
      value={isControlled ? value : undefined}
      defaultValue={isControlled ? undefined : value}
      onChange={(e) => onChange && onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholder={placeholder}
      className="w-full rounded-lg px-4 py-2.5 text-sm font-medium border-none outline-none transition-all"
      style={{
        background: colors.surfaceContainerLow,
        color: colors.onSurface,
        fontFamily: "Inter",
        boxShadow: focused
          ? `0 0 0 2px ${colors.primaryContainer}40`
          : `0 0 0 1px ${colors.outlineVariant}30`,
        ...extraStyle,
      }}
    />
  );
}
