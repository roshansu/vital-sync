import { colors } from "../constant/style";
import Icon from "./appointment/Icon";

export default function Pagination({ page, totalPages, setPage }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex items-center gap-2">
      {/* Prev */}
      <button
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1}
        className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
        style={{
          background: colors.surfaceContainerLow,
          color: page === 1 ? "#cbd5e1" : colors.onSurfaceVariant,
          border: "none",
          cursor: page === 1 ? "not-allowed" : "pointer",
        }}
      >
        <Icon name="chevron_left" size={20} color={page === 1 ? "#cbd5e1" : colors.onSurfaceVariant} />
      </button>

      {/* Pages */}
      {pages.map((p) => {
        const active = p === page;
        return (
          <button
            key={p}
            onClick={() => setPage(p)}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-all"
            style={{
              background: active
                ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`
                : colors.surfaceContainerLowest,
              color: active ? colors.onPrimary : colors.onSurfaceVariant,
              border: active ? "none" : `1px solid ${colors.outlineVariant}33`,
              boxShadow: active ? `0 4px 12px ${colors.primary}30` : "none",
              cursor: "pointer",
              fontFamily: "Manrope",
            }}
          >
            {p}
          </button>
        );
      })}

      {/* Next */}
      <button
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        disabled={page === totalPages}
        className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
        style={{
          background: colors.surfaceContainerLowest,
          color: page === totalPages ? "#cbd5e1" : colors.onSurfaceVariant,
          border: `1px solid ${colors.outlineVariant}33`,
          cursor: page === totalPages ? "not-allowed" : "pointer",
        }}
      >
        <Icon name="chevron_right" size={20} color={page === totalPages ? "#cbd5e1" : colors.onSurfaceVariant} />
      </button>
    </div>
  );
}