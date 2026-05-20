import Icon from "../appointment/Icon";
import { colors } from "../../constant/style";

export default function SectionHeader({ icon, iconBg, iconColor, title }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: iconBg }}
      >
        <Icon name={icon} size={18} color={iconColor} />
      </div>
      <h3
        className="text-xl font-bold"
        style={{ fontFamily: "Manrope", color: colors.onSurface }}
      >
        {title}
      </h3>
    </div>
  );
}
