// import colors from '../../'
import {colors} from '../../constant/style'
import Icon from '../appointment/Icon';

export default function SectionHeader({ icon, title }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <Icon name={icon} size={20} color={colors.primary} />
      <h2
        className="text-lg font-bold"
        style={{ fontFamily: "Manrope", color: colors.onSurface }}
      >
        {title}
      </h2>
    </div>
  );
}