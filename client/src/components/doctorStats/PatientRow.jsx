import { colors } from "../../constant/style";
import { useState  } from "react";

export default function PatientRow({ patient, setCurrNav }) {
  const [hovered, setHovered] = useState(false);
  const initials = patient?.userId?.firstName.split(" ").map((w) => w[0]).slice(0, 2).join("");

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center justify-between p-3 md:p-4 rounded-xl transition-all"
      style={{ background: hovered ? colors.surfaceContainerLow : "transparent" }}
    >
      <div className="flex items-center gap-3 md:gap-4 min-w-0">
        {patient.imageUrl ? (
          <img
            src={patient?.userId?.imageUrl}
            alt={patient?.userId?.firstName}
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
            {patient?.userId?.firstName}
          </h4>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <span className="text-xs font-medium" style={{ color: colors.outline }}>
              {patient?.userId?.dob}y {patient?.userId?.gender}
            </span>
            <span
              className="w-1 h-1 rounded-full"
              style={{ background: colors.outlineVariant }}
            />
          </div>
        </div>
      </div>

      <button onClick={()=>setCurrNav('patients')}
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