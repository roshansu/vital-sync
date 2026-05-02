import Icon from '../appointment/Icon'
import { colors } from '../../constant/style';

export default function GuidelineCard() {
  return (
    <div className="flex justify-end pr-12 md:pr-14">
      <div
        className="p-5 rounded-2xl max-w-xs border"
        style={{
          background: `${colors.primary}08`,
          borderColor: `${colors.primary}18`,
        }}
      >
        <h4
          className="font-bold text-sm mb-2 flex items-center gap-2"
          style={{ fontFamily: "Manrope", color: colors.primary }}
        >
          <Icon name="verified_user" size={16} color={colors.primary} />
          Clinical Guidelines
        </h4>
        <p className="text-xs leading-relaxed" style={{ color: "#475569" }}>
          All responses are cross-referenced with your verified medical history
          and current hospital protocols.
        </p>
      </div>
    </div>
  );
}
