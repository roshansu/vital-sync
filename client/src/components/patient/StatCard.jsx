import { colors } from "../../constant/style";


 const StatCard = ({ icon, label, value, bgColor, iconColor }) => (
  <div 
    className="p-6 rounded-xl flex items-center gap-5 group transition-all duration-300 hover:opacity-90"
    style={{ backgroundColor: colors.surfaceContainerLowest }}
  >
    <div 
      className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
      style={{ backgroundColor: bgColor, color: iconColor }}
    >
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
    </div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-2xl font-black">{value}</p>
    </div>
  </div>
);

export default StatCard