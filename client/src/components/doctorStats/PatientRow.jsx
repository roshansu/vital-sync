import { colors } from "../../constant/style";
import { useState  } from "react";

export default function PatientRow({ patient }) {
  const [hovered, setHovered] = useState(false);
  const initials = patient.name.split(" ").map((w) => w[0]).slice(0, 2).join("");

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center justify-between p-3 md:p-4 rounded-xl transition-all"
      style={{ background: hovered ? colors.surfaceContainerLow : "transparent" }}
    >
      <div className="flex items-center gap-3 md:gap-4 min-w-0">
        {patient.img ? (
          <img
            src={patient.img}
            alt={patient.name}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div
            className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
              color: colors.onPrimary,
              fontFamily: "Manrope",
            }}
          >
            {initials}
          </div>
        )}
        <div className="min-w-0">
          <h4
            className="font-bold text-sm truncate"
            style={{ color: colors.onSurface }}
          >
            {patient.name}
          </h4>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <span className="text-xs font-medium" style={{ color: colors.outline }}>
              {patient.age}y {patient.gender}
            </span>
            <span
              className="w-1 h-1 rounded-full"
              style={{ background: colors.outlineVariant }}
            />
            <span className="text-xs font-medium" style={{ color: colors.outline }}>
              {patient.date}
            </span>
          </div>
        </div>
      </div>

      <button
        className="ml-3 flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
        style={{
          background: hovered
            ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`
            : colors.surfaceContainerHigh,
          color: hovered ? colors.onPrimary : colors.onSurfaceVariant,
          border: "none",
          cursor: "pointer",
          fontFamily: "Inter",
        }}
      >
        View Details
      </button>
    </div>
  );
}