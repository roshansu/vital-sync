import { colors } from "../../constant/style";

const QuickNav = ({ icon, label }) => (
  <div 
    className="p-4 rounded-2xl flex items-center justify-between group cursor-pointer transition-colors"
    style={{ backgroundColor: colors.surfaceContainerLow }}
  >
    <div className="flex items-center gap-3">
      <div 
        className="w-10 h-10 rounded-lg flex items-center justify-center transition-all group-hover:text-white"
        style={{ backgroundColor: colors.surfaceContainerLowest, color: colors.primary }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primary}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.surfaceContainerLowest}
      >
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <span className="text-sm font-bold">{label}</span>
    </div>
    <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform">chevron_right</span>
  </div>
);

export default QuickNav