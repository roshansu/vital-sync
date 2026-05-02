import { colors } from '../../constant/style';


export default function TypingIndicator() {
  return (
    <div className="flex gap-1.5 items-center px-1 py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full"
          style={{
            background: colors.primary,
            opacity: 0.5,
            animation: `typingBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}