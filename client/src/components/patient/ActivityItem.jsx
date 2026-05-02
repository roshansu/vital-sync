
import { colors } from "../../constant/style";

const ActivityItem = ({ dotColor, label, title, subtitle, date, showDownload, isLast }) => (
  <div className={`relative pl-8 ${!isLast ? 'before:content-[""] before:absolute before:left-0 before:top-2 before:bottom-[-24px] before:w-[1px] before:bg-slate-100' : ''}`}>
    <div 
      className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full ring-4" 
      style={{ backgroundColor: dotColor, ringColor: `${dotColor}20` }}
    ></div>
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <div className="flex justify-between items-start">
      <div>
        <p className="font-bold">{title}</p>
        <p className="text-xs" style={{ color: colors.onSurfaceVariant }}>{subtitle}</p>
      </div>
      <p className="text-[10px] font-semibold text-slate-400">{date}</p>
    </div>
    {showDownload && (
      <button className="mt-3 flex items-center gap-1.5 text-xs font-bold hover:underline" style={{ color: colors.primary }}>
        <span className="material-symbols-outlined text-sm">download</span>
        Download PDF
      </button>
    )}
  </div>
);


export default ActivityItem