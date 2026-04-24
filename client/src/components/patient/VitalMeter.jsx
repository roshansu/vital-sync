import { colors } from "../../constant/style";

const VitalMeter = ({ label, value, unit, progress, color }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-end">
      <span className="text-xs font-medium" style={{ color: colors.onSurfaceVariant }}>{label}</span>
      <span className="font-black">{value} <span className="text-[10px] text-slate-400 font-normal">{unit}</span></span>
    </div>
    <div className="w-full h-1 rounded-full overflow-hidden" style={{ backgroundColor: colors.surfaceContainerHigh }}>
      <div className="h-full rounded-full" style={{ width: progress, backgroundColor: color }}></div>
    </div>
  </div>
);

export default VitalMeter