import Icon from '../appointment/Icon'
import { colors } from '../../constant/style';

export default function BotAvatar() {
  return (
    <div
      className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center"
      style={{ background: colors.primaryFixedDim }}
    >
      <Icon name="smart_toy" filled size={19} color={colors.primary} />
    </div>
  );
}
