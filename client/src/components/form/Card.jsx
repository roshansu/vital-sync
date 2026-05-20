import { colors } from "../../constant/style";

export default function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-xl p-6 space-y-4 ${className}`}
      style={{
        background: colors.surfaceContainerLowest,
        boxShadow: "0 2px 16px rgba(25,28,30,0.04)",
      }}
    >
      {children}
    </div>
  );
}