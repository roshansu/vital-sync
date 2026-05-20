import { useState } from "react";
import Icon from "../appointment/Icon";
import { colors } from "../../constant/style";

export default function EditSelect({ value, onChange, options, placeholder }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full rounded-lg py-3 px-4 text-sm font-medium border-none outline-none appearance-none transition-all"
        style={{
          background: colors.surfaceContainerLow,
          color: colors.onSurface,
          fontFamily: "Inter",
          boxShadow: focused
            ? `0 0 0 2px ${colors.primaryContainer}45`
            : `0 0 0 1px ${colors.outlineVariant}30`,
          paddingRight: 36,
          cursor: "pointer",
        }}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value || o} value={o.value || o}>
            {o.label || o}
          </option>
        ))}
      </select>
      <Icon
        name="expand_more"
        size={17}
        color={colors.outline}
        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
      />
    </div>
  );
}