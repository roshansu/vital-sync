import { colors } from "../../constant/style";
import Icon from '../appointment/Icon'
import { useState } from "react";

export default function SelectInput({ value, onChange, options, className = "" }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full rounded-lg px-4 py-2.5 text-sm border-none outline-none appearance-none transition-all ${className}`}
        style={{
          background: colors.surfaceContainerLow,
          color: colors.onSurface,
          fontFamily: "Inter",
          boxShadow: focused
            ? `0 0 0 2px ${colors.primaryContainer}50`
            : `0 0 0 1px ${colors.outlineVariant}30`,
          cursor: "pointer",
          paddingRight: 36,
        }}
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <Icon
        name="expand_more"
        size={18}
        color={colors.onSurfaceVariant}
        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
      />
    </div>
  );
}