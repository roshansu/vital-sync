import { colors } from "../../constant/style";
import { useState } from "react";

export default function BioTextarea({ value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      rows={7}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholder="Share your professional journey, expertise, and clinical philosophy..."
      className="w-full rounded-xl py-4 px-5 text-sm font-medium leading-relaxed border-none outline-none transition-all"
      style={{
        background: colors.surfaceContainerLow,
        color: colors.onSurface,
        fontFamily: "Inter",
        resize: "none",
        boxShadow: focused
          ? `0 0 0 2px ${colors.primaryContainer}45`
          : `0 0 0 1px ${colors.outlineVariant}30`,
      }}
    />
  );
}