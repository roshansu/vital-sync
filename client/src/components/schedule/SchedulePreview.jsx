import Icon from '../appointment/Icon'
import { colors } from '../../constant/style';

const DAYS_FULL   = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function SchedulePreview({ activeDays, shiftStart, shiftEnd, slotDuration, consultFee, consultType, breaks, offDays }) {
  const today   = new Date();
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  // Generate slots from start to end
  const generateSlots = () => {
    const slots = [];
    const [sh, sm] = shiftStart.split(":").map(Number);
    const [eh, em] = shiftEnd.split(":").map(Number);
    const durationMin = slotDuration === "15 Minutes" ? 15 : slotDuration === "1 Hour" ? 60 : 30;
    let cur = sh * 60 + sm;
    const end = eh * 60 + em;
    while (cur + durationMin <= end) {
      const hh = String(Math.floor(cur / 60)).padStart(2, "0");
      const mm = String(cur % 60).padStart(2, "0");
      const nextMin = cur + durationMin;
      const hh2 = String(Math.floor(nextMin / 60)).padStart(2, "0");
      const mm2 = String(nextMin % 60).padStart(2, "0");
      const isBreak = breaks.some((b) => b.start === `${hh}:${mm}`);
      slots.push({ label: `${hh}:${mm} – ${hh2}:${mm2}`, isBreak });
      cur += durationMin;
    }
    return slots;
  };

  const slots = generateSlots();
  const isOffToday = offDays.includes(todayKey);

  return (
    <div className="space-y-5">
      {/* Summary row */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Hours", value: `${shiftStart} – ${shiftEnd}`, icon: "schedule"  },
          { label: "Slot",  value: slotDuration,                   icon: "timelapse" },
          { label: "Fee",   value: `$${consultFee}`,               icon: "payments"  },
          { label: "Type",  value: consultType,                    icon: "video_chat" },
        ].map(({ label, value, icon }) => (
          <div
            key={label}
            className="rounded-xl p-3 flex items-center gap-2.5"
            style={{ background: colors.surfaceContainerLow }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: colors.primaryFixed }}
            >
              <Icon name={icon} size={15} color={colors.primary} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#94a3b8" }}>
                {label}
              </p>
              <p className="text-xs font-bold" style={{ color: colors.onSurface }}>
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Active days */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "#94a3b8" }}>
          Active Days
        </p>
        <div className="flex gap-1.5 flex-wrap">
          {DAYS_FULL.map((day, i) => {
            const on = activeDays.includes(i);
            return (
              <span
                key={day}
                className="px-2.5 py-1 rounded-full text-[11px] font-bold"
                style={{
                  background: on ? `${colors.primaryContainer}18` : colors.surfaceContainerHigh,
                  color: on ? colors.primaryContainer : "#94a3b8",
                }}
              >
                {day.slice(0, 3)}
              </span>
            );
          })}
        </div>
      </div>

      {/* Today's slots */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "#94a3b8" }}>
          Today's Slot Preview
        </p>
        {isOffToday ? (
          <div
            className="rounded-xl py-6 flex flex-col items-center text-center"
            style={{ background: `${colors.error}0a`, border: `1px dashed ${colors.error}40` }}
          >
            <Icon name="event_busy" size={24} color={colors.error} className="mb-2" />
            <p className="text-xs font-bold" style={{ color: colors.error }}>Today is marked as Off</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
            {slots.map((slot, i) => (
              <div
                key={i}
                className="px-3 py-2 rounded-lg text-xs font-semibold text-center"
                style={{
                  background: slot.isBreak
                    ? `${colors.tertiary}12`
                    : colors.surfaceContainerLow,
                  color: slot.isBreak ? colors.tertiary : colors.onSurface,
                  border: slot.isBreak ? `1px solid ${colors.tertiary}30` : "none",
                }}
              >
                {slot.isBreak ? "🔴 Break" : slot.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Off days count */}
      {offDays.length > 0 && (
        <div
          className="rounded-xl p-3 flex items-center gap-3"
          style={{ background: `${colors.error}0a`, border: `1px solid ${colors.error}20` }}
        >
          <Icon name="event_busy" size={18} color={colors.error} />
          <div>
            <p className="text-xs font-bold" style={{ color: colors.error }}>
              {offDays.length} off day{offDays.length > 1 ? "s" : ""} marked
            </p>
            <p className="text-[10px]" style={{ color: "#94a3b8" }}>
              No appointments will be scheduled on these dates
            </p>
          </div>
        </div>
      )}
    </div>
  );
}