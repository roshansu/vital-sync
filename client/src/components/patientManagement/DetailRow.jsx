import {colors} from '../../constant/style'

export default function DetailRow({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#94a3b8" }}>{label}</p>
      <p className="text-sm font-medium" style={{ color: colors.onSurface }}>{value || "—"}</p>
    </div>
  );
}