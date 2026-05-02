import { colors } from '../../constant/style';
import BotAvatar from './BotAvatar'
import TypingIndicator from './TypingIndicator'
import UserAvatar from './UserAvatar'


export default function MessageBubble({ msg }) {
  const isBot = msg.role === "bot";

  return (
    <div
      className={`flex gap-3 ${isBot ? "justify-start" : "justify-end"} w-full`}
      style={{ animation: "msgFadeIn 0.25s ease" }}
    >
      {isBot && <BotAvatar />}

      <div
        className={`flex flex-col gap-1.5 ${isBot ? "items-start" : "items-end"}`}
        style={{ maxWidth: "min(82%, 560px)" }}
      >
        <div
          className={`px-5 py-3.5 leading-relaxed text-sm ${
            isBot ? "rounded-2xl rounded-tl-none" : "rounded-2xl rounded-tr-none"
          }`}
          style={{
            background: isBot
              ? colors.surfaceContainerLow
              : `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
            color: isBot ? colors.onSurface : colors.onPrimaryContainer,
            fontFamily: "Inter",
            boxShadow: isBot ? "none" : `0 4px 16px ${colors.primary}25`,
          }}
        >
          {msg.typing ? <TypingIndicator /> : msg.text}
        </div>

        {/* Timestamp */}
        {!msg.typing && (
          <span
            className="text-[10px] font-medium px-1"
            style={{ color: "#94a3b8" }}
          >
            {msg.time}
          </span>
        )}

        {/* Active indicator for first bot message */}
        {isBot && msg.showActive && !msg.typing && (
          <div className="flex items-center gap-1.5 px-1">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: colors.primary,
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            <span
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: colors.primary, fontFamily: "Manrope" }}
            >
              System Active
            </span>
          </div>
        )}
      </div>

      {!isBot && <UserAvatar />}
    </div>
  );
}
