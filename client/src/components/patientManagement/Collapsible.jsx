import {colors} from '../../constant/style'
import Icon from '../appointment/Icon'
import { useState } from 'react';

export default function Collapsible({ icon, title, iconBg, iconColor, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className="rounded-xl overflow-hidden border"
      style={{ borderColor: `${colors.outlineVariant}25` }}
    >
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-5 py-4 transition-colors"
        style={{
          background: open ? colors.surfaceContainerLow : colors.surfaceContainerLowest,
          border: "none",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = colors.surfaceContainerLow)}
        onMouseLeave={(e) => (e.currentTarget.style.background = open ? colors.surfaceContainerLow : colors.surfaceContainerLowest)}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: iconBg }}
          >
            <Icon name={icon} size={15} color={iconColor} />
          </div>
          <span className="text-sm font-bold" style={{ fontFamily: "Manrope", color: colors.onSurface }}>
            {title}
          </span>
        </div>
        <Icon
          name="expand_more"
          size={18}
          color={colors.onSurfaceVariant}
          style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}
        />
      </button>
      {open && (
        <div
          className="px-5 pb-5 pt-3 space-y-3"
          style={{ background: colors.surfaceContainerLowest }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
