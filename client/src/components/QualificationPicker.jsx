import { colors } from "../constant/style";
import { useState } from "react";
import Icon from "./Icon";
const  QUALIFICATIONS = ["MBBS", "MD", "MS", "DM", "MCh", "DNB", "FRCS", "MRCP", "PhD", "MDS"];


export default function QualificationPicker({ value, onChange,isDoc, colors, inputStyle, focused, setFocused }) {
  const selected = value ? value.split(",").filter(Boolean) : [];
  const [inputVal, setInputVal] = useState("");
  const [open, setOpen] = useState(false);

  const toggle = (q) => {
    const next = selected.includes(q)
      ? selected.filter((x) => x !== q)
      : [...selected, q];
      console.log("next", next)
      console.log(onChange)
    onChange(next.join(","));
  };

  const filtered = QUALIFICATIONS.filter(
    (q) => q.toLowerCase().includes(inputVal.toLowerCase()) && !selected.includes(q)
  );

  return (
    <div style={{ position: "relative" }}>
      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {selected.map((q) => (
            <span
              key={q}
              className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{
                background: `${colors.primaryContainer}18`,
                color: colors.primaryContainer,
                border: `1px solid ${colors.primaryContainer}40`,
                fontFamily: "Inter",
              }}
            >
              {q}
              <button
                type="button"
                onClick={() => toggle(q)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0, lineHeight: 1 }}
              >
                <Icon name="close" size={13} color={colors.primaryContainer} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ position: "relative" }}>
        <input
          type="text"
          // required={isDoc}
          placeholder={selected.length === 0 ? "Search or select qualifications…" : "Add more…"}
          value={inputVal}
          onChange={(e) => { setInputVal(e.target.value); setOpen(true); }}
          onFocus={() => { setFocused("qual"); setOpen(true); }}
          onBlur={() => { setFocused(null); setTimeout(() => setOpen(false), 150); }}
          style={{ ...inputStyle("qual"), paddingRight: 40 }}
        />
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <Icon name="search" size={18} color={colors.outlineVariant} />
        </div>
      </div>

      {/* Dropdown */}
      {open && filtered.length > 0 && (
        <div
          className="absolute left-0 right-0 rounded-xl shadow-lg z-20 "
          style={{
            top: "calc(100% + 4px)",
            background: colors.surfaceContainerLowest,
            border: `1px solid ${colors.outlineVariant}`,
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          }}
        >
          {filtered.map((q) => (
            <button
              key={q}
              type="button"
              onMouseDown={() => { toggle(q); setInputVal(""); }}
              className="w-full text-left  px-4 py-2.5 text-sm transition-colors"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: colors.onSurface,
                fontFamily: "Inter",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = colors.surfaceContainerLow)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <Icon name="add_circle" size={16} color={colors.primary} />
              {q}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}