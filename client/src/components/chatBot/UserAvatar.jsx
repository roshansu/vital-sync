import { colors } from '../../constant/style';


export default function UserAvatar() {
  return (
    <div
      className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm"
      style={{
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
        color: colors.onPrimaryContainer,
        fontFamily: "Manrope",
      }}
    >
      A
    </div>
  );
}