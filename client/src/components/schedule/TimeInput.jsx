import FieldLabel from '../form/FieldLabel'
import { useState } from 'react';
import Icon from '../appointment/Icon'
import { colors } from '../../constant/style';

export default function TimeInput({ icon, label, value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div
        className="rounded-lg px-4 py-2.5 flex items-center gap-3 transition-all"
        style={{
          background: colors.surfaceContainerLow,
          boxShadow: focused ? `0 0 0 2px ${colors.primaryContainer}40` : "none",
        }}
      >
        <Icon name={icon} size={16} color={colors.outline} />
        <input
          type="time"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="bg-transparent border-none p-0 text-sm font-medium w-full outline-none"
          style={{ color: colors.onSurface, fontFamily: "Inter" }}
        />
      </div>
    </div>
  );
}
