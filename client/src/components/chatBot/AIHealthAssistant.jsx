import { useState, useRef, useEffect } from "react";
import Icon from '../appointment/Icon'
import MessageBubble from './MessageBubble'
import { colors } from "../../constant/style";
import GuidelineCard from './GuidelineCard'
import PromptChip from './PromptChip'

const BOT_REPLIES = {
  "Explain my latest blood report":
    "Your Q3 blood panel shows your hemoglobin at 14.2 g/dL (normal), LDL cholesterol at 112 mg/dL (borderline), and blood sugar at 98 mg/dL (normal). Dr. Jenkins recommends a follow-up in 3 months to monitor your LDL levels.",
  "Show my active prescriptions":
    "You currently have 3 active prescriptions: Atorvastatin 20mg (once daily, evening), Lisinopril 10mg (once daily, morning), and Aspirin 81mg (daily). All were issued by Dr. Alistair Vance on Oct 24, 2023.",
  "Book a follow-up with Dr. Vance":
    "Dr. Vance has availability on Nov 5 at 10:30 AM and Nov 7 at 2:00 PM. Would you like me to book one of these slots, or would you prefer to see more options?",
  "What are the side effects of Lisinopril?":
    "Common side effects of Lisinopril include a dry persistent cough, dizziness, headache, and fatigue. Rare but serious effects include swelling of the face or throat (angioedema). Contact Dr. Vance immediately if you experience severe symptoms.",
};

const PROMPTS = [
  { icon: "biotech",         label: "Explain my latest blood report"          },
  { icon: "pill",            label: "Show my active prescriptions"            },
  { icon: "event_available", label: "Book a follow-up with Dr. Vance"         },
  { icon: "info",            label: "What are the side effects of Lisinopril?" },
];


function getNow() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function getBotReply(text) {
  return (
    BOT_REPLIES[text] ||
    "I understand your concern. Based on your medical history, I recommend consulting with your assigned physician. Would you like me to schedule an appointment or provide more information on this topic?"
  );
}


// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AIHealthAssistant() {
  const INITIAL_MESSAGES = [
    {
      id: 1,
      role: "bot",
      text: "Hello Adrian! I'm your AI health assistant. I can help you understand your reports, check prescriptions, or book appointments. How can I help you today?",
      time: getNow(),
      showActive: true,
    },
  ];

  const [messages, setMessages]     = useState(INITIAL_MESSAGES);
  const [input, setInput]           = useState("");
  const [isTyping, setIsTyping]     = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [showPrompts, setShowPrompts]   = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed || isTyping) return;

    setShowPrompts(false);
    setInput("");
    setIsTyping(true);

    const userMsg = {
      id: Date.now(),
      role: "user",
      text: trimmed,
      time: getNow(),
    };

    const typingMsg = {
      id: Date.now() + 1,
      role: "bot",
      typing: true,
      time: "",
    };

    setMessages((prev) => [...prev, userMsg, typingMsg]);

    // Simulate AI response delay
    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 2,
        role: "bot",
        text: getBotReply(trimmed),
        time: getNow(),
      };
      setMessages((prev) => [...prev.filter((m) => !m.typing), botMsg]);
      setIsTyping(false);
    }, 1400);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <style>{`
        body { font-family: 'Inter', sans-serif; background: ${colors.surface}; }
        input::placeholder { color: #94a3b8; }
        @keyframes msgFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0);    opacity: 0.4; }
          30%            { transform: translateY(-5px); opacity: 1;   }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${colors.outlineVariant}; border-radius: 4px; }
      `}</style>

      <main
        className="flex flex-col items-center min-h-screen lg:p-4 md:p-8 pt-6 md:pt-8"
        style={{ background: colors.surface, fontFamily: "Inter" }}
      >
        {/* ── Page header ── */}
        <div className="w-full max-w-3xl mb-6 text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3"
            style={{ background: `${colors.primary}10` }}
          >
            <Icon name="smart_toy" filled size={14} color={colors.primary} />
            <span
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: colors.primary }}
            >
              Powered by Vital Sync
            </span>
          </div>
          <h1
            className="lg:text-3xl text-xl md:text-4xl font-extrabold tracking-tight mb-2"
            style={{ fontFamily: "Manrope", color: colors.onSurface }}
          >
            AI Health Assistant
          </h1>
          <p className="lg:text-base text-sm" style={{ color: "#64748b" }}>
            Ask anything about your health or hospital services
          </p>
        </div>

        {/* ── Chat container ── */}
        <div
          className="w-full lg:max-w-3xl flex flex-col rounded-2xl md:rounded-3xl overflow-hidden border"
          style={{
            background: colors.surfaceContainerLowest,
            borderColor: `${colors.outlineVariant}18`,
            boxShadow: "0 32px 64px -12px rgba(0,0,0,0.05)",
            minHeight: 520,
            maxHeight: "calc(100vh - 160px)",
          }}
        >
          {/* ── Messages area ── */}
          <div
            className="flex-1  overflow-y-auto p-2 lg:p-5 md:p-8 space-y-4 lg:space-y-6"
            // style={{ minHeight: 320 }}
          >
            {messages.map((msg, idx) => (
              <div key={msg.id}>
                <MessageBubble msg={msg} />
                {/* Show guideline card after first bot message */}
                {idx === 0 && <div className="mt-4"><GuidelineCard /></div>}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* ── Interaction layer ── */}
          <div
            className="p-4 md:p-6 border-t"
            style={{ borderColor: `${colors.outlineVariant}15` }}
          >
            {/* Suggested prompts */}
            {showPrompts && (
              <div className="flex flex-wrap gap-2 mb-5 justify-center">
                {PROMPTS.map((p) => (
                  <PromptChip
                    key={p.label}
                    prompt={p}
                    onSelect={(label) => sendMessage(label)}
                  />
                ))}
              </div>
            )}

            {/* Input bar */}
            <div
              className="flex items-center gap-2 rounded-2xl p-1.5 pl-4 border transition-all"
              style={{
                background: colors.surfaceContainerLow,
                borderColor: inputFocused
                  ? `${colors.primaryContainer}60`
                  : `${colors.outlineVariant}18`,
                boxShadow: inputFocused
                  ? `0 0 0 3px ${colors.primaryContainer}15`
                  : "none",
              }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                disabled={isTyping}
                placeholder="Ask about your reports, prescriptions, or symptoms..."
                className="flex-1 bg-transparent border-none outline-none text-sm py-3 px-2"
                style={{
                  color: colors.onSurface,
                  fontFamily: "Inter",
                  opacity: isTyping ? 0.5 : 1,
                }}
              />

              {/* Clear button (when input has text) */}
              {input && (
                <button
                  onClick={() => setInput("")}
                  className="lg:p-2 rounded-lg transition-colors flex-shrink-0"
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = colors.surfaceContainerHigh)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                >
                  <Icon name="close" size={16} color="#94a3b8" />
                </button>
              )}

              {/* Send button */}
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isTyping}
                className="flex items-center justify-center p-3 rounded-xl transition-all flex-shrink-0"
                style={{
                  background:
                    input.trim() && !isTyping
                      ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`
                      : colors.surfaceContainerHigh,
                  color:
                    input.trim() && !isTyping ? colors.onPrimary : "#94a3b8",
                  border: "none",
                  cursor: input.trim() && !isTyping ? "pointer" : "not-allowed",
                  boxShadow:
                    input.trim() && !isTyping
                      ? `0 4px 12px ${colors.primaryContainer}40`
                      : "none",
                  transform: "scale(1)",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (input.trim() && !isTyping)
                    e.currentTarget.style.transform = "scale(1.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
                onMouseDown={(e) => {
                  if (input.trim() && !isTyping)
                    e.currentTarget.style.transform = "scale(0.96)";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <Icon name="send" filled size={18} color={input.trim() && !isTyping ? colors.onPrimary : "#94a3b8"} />
              </button>
            </div>

            {/* Show prompts toggle */}
            {!showPrompts && (
              <button
                onClick={() => setShowPrompts(true)}
                className="mt-3 flex items-center gap-1.5 text-xs font-medium mx-auto transition-colors"
                style={{
                  color: "#94a3b8",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = colors.primary)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
              >
                <Icon name="tips_and_updates" size={14} color="inherit" />
                Show suggested prompts
              </button>
            )}

            {/* Disclaimer */}
            <p
              className="text-center mt-3 text-[11px]"
              style={{ color: "#94a3b8", fontFamily: "Inter" }}
            >
              AI may provide inaccurate medical information. Consult with a human
              specialist for critical diagnoses.
            </p>
          </div>
        </div>

        {/* ── Contextual info cards below chat ── */}
        <div className="w-full max-w-3xl mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: "security",
              title: "End-to-End Encrypted",
              desc: "All conversations are private and secured with AES-256 encryption.",
              iconBg: "#f0fdf4",
              iconColor: "#16a34a",
            },
            {
              icon: "history",
              title: "Context Aware",
              desc: "The assistant has access to your full verified medical history.",
              iconBg: `${colors.primary}10`,
              iconColor: colors.primary,
            },
            {
              icon: "emergency",
              title: "Emergency Escalation",
              desc: "Critical symptoms are automatically escalated to your care team.",
              iconBg: "#fef2f2",
              iconColor: "#dc2626",
            },
          ].map(({ icon, title, desc, iconBg, iconColor }) => (
            <div
              key={title}
              className="rounded-xl p-4 border flex flex-col gap-2"
              style={{
                background: colors.surfaceContainerLowest,
                borderColor: `${colors.outlineVariant}18`,
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: iconBg }}
              >
                <Icon name={icon} filled size={17} color={iconColor} />
              </div>
              <p
                className="text-xs font-bold"
                style={{ fontFamily: "Manrope", color: colors.onSurface }}
              >
                {title}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "#64748b" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}