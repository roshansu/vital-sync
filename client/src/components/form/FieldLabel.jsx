import { colors } from "../../constant/style";

export default function FieldLabel({ children, required = false }) {
  return (
    <label
      className="block text-[10px] font-bold uppercase tracking-widest mb-1.5"
      style={{ color: colors.onSurfaceVariant }}
    >
      {children}
      {required && (
        <span className="ml-1" style={{ color: colors.error }}>*</span>
      )}
    </label>
  );
}
