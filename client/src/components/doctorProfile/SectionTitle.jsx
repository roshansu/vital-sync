import { colors } from "../../constant/style";


export default function SectionTitle({ title, sub }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h3
        className="text-xl font-bold tracking-tight"
        style={{ fontFamily: "Manrope", color: colors.onSurface }}
      >
        {title}
      </h3>
      {sub && (
        <span
          className="text-[10px] uppercase font-bold tracking-widest"
          style={{ color: "#94a3b8" }}
        >
          {sub}
        </span>
      )}
    </div>
  );
}
