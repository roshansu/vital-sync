import { useState } from "react";
import Icon from '../appointment/Icon'
import { colors } from '../../constant/style';


export default function PromptChip({ prompt, onSelect }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={() => onSelect(prompt.label)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-all"
      style={{
        background: hovered ? colors.surfaceContainerHigh : colors.surfaceContainer,
        color: "#374151",
        borderColor: `${colors.outlineVariant}33`,
        cursor: "pointer",
        fontFamily: "Inter",
        border: `1px solid ${colors.outlineVariant}33`,
      }}
    >
      <Icon name={prompt.icon} size={17} color={colors.primaryContainer} />
      <span className="whitespace-nowrap">{prompt.label}</span>
    </button>
  );
}
