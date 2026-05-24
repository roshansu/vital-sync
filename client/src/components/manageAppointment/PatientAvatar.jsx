import { colors } from "../../constant/style";
import Icon from "../appointment/Icon";

export default function PatientAvatar({ appt }) {

  // console.log(appt)
  const initials = appt.patient.firstName.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return (
    <div className="relative flex-shrink-0">
      {appt.patient.imageUrl ? (
        <img
          src={appt.img}
          alt={appt.patient}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover"
        />
      ) : (
        <div
          className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold text-sm"
          style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
            color: colors.onPrimary,
            fontFamily: "Manrope",
          }}
        >
          {initials}
        </div>
      )}
      {/* <div
        className="absolute -bottom-1 -right-1 p-1 rounded-full shadow-sm"
        style={{ background: colors.surfaceContainerLowest }}
      >
        <Icon name={appt.typeIcon} size={14} color={appt.typeColor} />
      </div> */}
    </div>
  );
}