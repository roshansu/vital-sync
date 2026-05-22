import { colors } from "../../constant/style";


export default function StatusBadge({ status }) {
  const map = {
    Pending:   { bg: `${colors.secondaryContainer}33`, color: colors.secondary  },
    Approved:  { bg: `${colors.primaryContainer}15`,   color: colors.primary    },
    Completed: { bg: "#f0fdf4",                         color: "#15803d"         },
    Rejected:  { bg: colors.errorContainer,             color: colors.error      },
  };
  const s = map[status] || map.Pending;
  return (
    <span
      className="px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-tight"
      style={{ background: s.bg, color: s.color }}
    >
      {status}
    </span>
  );
}