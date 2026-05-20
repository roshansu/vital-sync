import { colors } from "../../constant/style";

export default function ActivityItem({ item, isLast }) {
  return (
    <div className="relative pl-7 pb-5">
      {/* vertical line */}
      {!isLast && (
        <div
          className="absolute left-[5px] top-3 bottom-0 w-px"
          style={{ background: `${colors.outlineVariant}30` }}
        />
      )}
      {/* dot */}
      <div
        className="absolute left-0 top-1.5 w-3 h-3 rounded-full"
        style={{ background: item.dot, boxShadow: `0 0 0 3px ${item.dot}20` }}
      />
      <div className="flex justify-between items-start gap-2">
        <div>
          <p className="text-sm font-bold" style={{ color: colors.onSurface }}>
            {item.name}
          </p>
          <p className="text-xs mt-0.5" style={{ color: colors.onSurfaceVariant }}>
            {item.note}
          </p>
        </div>
        <span
          className="text-[10px] font-semibold flex-shrink-0"
          style={{ color: "#94a3b8" }}
        >
          {item.time}
        </span>
      </div>
    </div>
  );
}
