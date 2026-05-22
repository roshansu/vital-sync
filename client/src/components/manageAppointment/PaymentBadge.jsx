import { colors } from "../../constant/style";

export default function PaymentBadge({ paid }) {
  return (
    <span
      className="px-3 py-1 text-[10px] font-bold rounded-full"
      style={
        paid
          ? { background: `${colors.tertiaryContainer}15`, color: colors.tertiary }
          : { background: `${colors.errorContainer}33`,    color: colors.error    }
      }
    >
      {paid ? "Paid" : "Unpaid"}
    </span>
  );
}