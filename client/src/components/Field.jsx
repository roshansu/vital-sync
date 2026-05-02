import { colors } from "../constant/style";

export default function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label
        className="block text-[10px] font-bold uppercase tracking-widest px-1"
        style={{ color: colors.onSurfaceVariant, fontFamily: "Inter" }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}