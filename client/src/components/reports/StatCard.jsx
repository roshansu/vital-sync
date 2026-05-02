import Icon from "../appointment/Icon";
import { colors } from "../../constant/style";

export default function StatCard({ icon, iconBg, iconColor, barColor, barPct, label, value }) {
  return (
    <div
      className="rounded-xl p-5 border flex flex-col gap-3"
      style={{
        background: colors.surfaceContainerLowest,
        borderColor: `${colors.outlineVariant}14`,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: iconBg }}
        >
          <Icon name={icon} filled size={20} color={iconColor} />
        </div>
        <div>
          <p
            className="text-[10px] font-bold uppercase tracking-wider"
            style={{ color: colors.outline }}
          >
            {label}
          </p>
          <h3
            className="text-2xl font-extrabold leading-tight"
            style={{ fontFamily: "Manrope", color: colors.onSurface }}
          >
            {value}
          </h3>
        </div>
      </div>
      <div
        className="h-1 rounded-full overflow-hidden"
        style={{ background: colors.surfaceContainerLow }}
      >
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${barPct}%`, background: barColor }}
        />
      </div>
    </div>
  );
}
