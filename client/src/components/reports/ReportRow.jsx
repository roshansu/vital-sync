import { colors } from "../../constant/style";
import Icon from "../appointment/Icon";
import { useState } from "react";


export default function ReportRow({ report, onToggleStar }) {
  const [hovered, setHovered]   = useState(false);
  const [dlHovered, setDlHovered] = useState(false);

  const isVerified = report.status === "Verified";
  const isPdf      = report.fileType === "pdf";

  const fileIconBg    = isPdf ? "#fef2f2" : "#eff6ff";
  const fileIconColor = isPdf ? "#dc2626" : "#2563eb";
  const fileIconName  = isPdf ? "picture_as_pdf" : "image";

  return (
    <>
      {/* ── Desktop row ── */}
      <tr
        className="hidden md:table-row transition-all duration-200"
        style={{ background: hovered ? `${colors.surfaceContainerLow}80` : "transparent" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Report name */}
        <td className="px-6 lg:px-8 py-5">
          <div className="flex items-center gap-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: fileIconBg }}
            >
              <Icon name={fileIconName} filled size={22} color={fileIconColor} />
            </div>
            <div>
              <h4 className="text-sm font-bold" style={{ color: colors.onSurface }}>{report.name}</h4>
              <p className="text-[11px] font-medium mt-0.5" style={{ color: colors.outline }}>{report.size}</p>
            </div>
          </div>
        </td>

        {/* Date */}
        <td className="px-6 py-5 text-sm font-medium" style={{ color: colors.onSurfaceVariant }}>
          {report.date}
        </td>

        {/* Doctor / Lab */}
        <td className="px-6 py-5">
          <div className="flex items-center gap-2.5">
            {report.sourceType === "doctor" && report.sourceImg ? (
              <img
                src={report.sourceImg}
                alt={report.source}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: colors.surfaceContainerHighest }}
              >
                <Icon name="apartment" size={14} color={colors.onSurfaceVariant} />
              </div>
            )}
            <span className="text-sm font-semibold" style={{ color: colors.onSurface }}>
              {report.source}
            </span>
          </div>
        </td>

        {/* Status */}
        <td className="px-6 py-5">
          <span
            className="px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full border"
            style={
              isVerified
                ? { background: "#f0fdf4", color: "#15803d", borderColor: "#bbf7d0" }
                : { background: colors.surfaceContainerHigh, color: colors.outline, borderColor: "transparent" }
            }
          >
            {report.status}
          </span>
        </td>

        {/* Download only */}
        <td className="px-6 lg:px-8 py-5 text-right">
          <button
            onMouseEnter={() => setDlHovered(true)}
            onMouseLeave={() => setDlHovered(false)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ml-auto"
            style={{
              background: dlHovered
                ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`
                : colors.surfaceContainerLow,
              color: dlHovered ? colors.onPrimaryContainer : colors.onSurfaceVariant,
              border: "none",
              cursor: "pointer",
              fontFamily: "Inter",
              boxShadow: dlHovered ? `0 4px 12px ${colors.primary}25` : "none",
            }}
          >
            <Icon name="download" size={16} color={dlHovered ? colors.onPrimaryContainer : colors.onSurfaceVariant} />
            Download
          </button>
        </td>
      </tr>

      {/* ── Mobile card ── */}
      <tr className="table-row md:hidden">
        <td colSpan={5} className="p-0">
          <div
            className="mx-4 my-2 rounded-xl p-4 border"
            style={{
              background: colors.surfaceContainerLowest,
              borderColor: `${colors.outlineVariant}25`,
            }}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              {/* Icon + name */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: fileIconBg }}
                >
                  <Icon name={fileIconName} filled size={20} color={fileIconColor} />
                </div>
                <div className="min-w-0">
                  <p
                    className="text-sm font-bold truncate"
                    style={{ color: colors.onSurface }}
                  >
                    {report.name}
                  </p>
                  <p className="text-[11px]" style={{ color: colors.outline }}>{report.size}</p>
                </div>
              </div>

              {/* Status badge */}
              <span
                className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-full border flex-shrink-0"
                style={
                  isVerified
                    ? { background: "#f0fdf4", color: "#15803d", borderColor: "#bbf7d0" }
                    : { background: colors.surfaceContainerHigh, color: colors.outline, borderColor: "transparent" }
                }
              >
                {report.status}
              </span>
            </div>

            {/* Meta row */}
            <div
              className="flex flex-wrap items-center justify-between gap-2 pt-3"
              style={{ borderTop: `1px solid ${colors.outlineVariant}20` }}
            >
              <div className="flex items-center gap-3">
                {report.sourceType === "doctor" && report.sourceImg ? (
                  <img src={report.sourceImg} alt={report.source}
                    className="w-6 h-6 rounded-full object-cover" />
                ) : (
                  <div className="w-6 h-6 rounded flex items-center justify-center"
                    style={{ background: colors.surfaceContainerHigh }}>
                    <Icon name="apartment" size={12} color={colors.onSurfaceVariant} />
                  </div>
                )}
                <span className="text-xs font-semibold" style={{ color: colors.onSurface }}>
                  {report.source}
                </span>
                <span className="text-xs" style={{ color: "#94a3b8" }}>{report.date}</span>
              </div>

              {/* Download */}
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
                  color: colors.onPrimaryContainer,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Icon name="download" size={14} color={colors.onPrimary} />
                Download
              </button>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}