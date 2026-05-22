import { useState, useEffect } from "react";
import { colors } from "../../constant/style";
import FocusInput from './FocusInput'
import TimeInput from './TimeInput'
import FieldLabel from "../form/FieldLabel";
import OffDaysCalendar from './OffDaysCalendar'
import SchedulePreview from './SchedulePreview'
import SectionHeader from './SectionHeader'
import Icon from "../appointment/Icon";
import Card from '../form/Card'
import Toast from "../form/Toast";
import apiCall from '../../api/apiCall'
import LoadingSpinner from "../LoadingSpinner";

const DAYS_SHORT  = ["M", "T", "W", "T", "F", "S", "S"];
const DAYS_FULL   = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


export default function ScheduleManagement() {
  // Weekly availability
  const [slotId, setSLotId] = useState('')
  const [activeDays,   setActiveDays]   = useState([0, 1, 2, 3, 4]); // Mon–Fri
  const [shiftStart,   setShiftStart]   = useState("09:00");
  const [shiftEnd,     setShiftEnd]     = useState("17:00");
  const [slotDuration, setSlotDuration] = useState("30 Minutes");
  const [loading, setLoading] = useState(false)

  // console.log("slotDuration", slotDuration)
  // console.log(activeDays, shiftStart, shiftEnd, slotDuration)
  // Consultation settings
  const [consultFee,  setConsultFee]  = useState("120");
  const [consultType, setConsultType] = useState("Both");

  // Breaks
  const [breaks,    setBreaks]    = useState([{ id: 1, start: "13:00", end: "14:00", label: "Lunch Break" }]);
  const [newBreak,  setNewBreak]  = useState({ start: "12:00", end: "12:30", label: "" });
  const [addingBreak, setAddingBreak] = useState(false);

  // Off days
  const [offDays, setOffDays] = useState([]);
  // console.log("offf",offDays)
  // UI
  const [showToast,     setShowToast]     = useState({
    visible: false,
    msg: ''
  });
  const [saveHovered,   setSaveHovered]   = useState(false);

  async function fetchSlot() {
    setLoading(true)
    const res = await apiCall('/doctor/get-slot')
    const slotData = res?.slot
    if(res?.slot){
      setSLotId(slotData?._id)
      setActiveDays(slotData?.activeDays)
      setShiftStart(slotData?.shiftStart)
      setShiftEnd(slotData?.shiftEnd)
      setSlotDuration(slotData?.slotDuration+"Minutes")
      setConsultFee(slotData?.consultFee)
      setConsultType(slotData?.consultType)
      setOffDays(slotData?.offDays)
      setBreaks(slotData?.breakTime)
    }
    setLoading(false)
    // console.log(res)
  }

  // console.log("activeDays",slotData?.activeDays)

  // console.log("slotdata", slotData)

  useEffect(()=>{
    fetchSlot()
  }, [])

  const toggleDay = (i) => {
    setActiveDays((prev) =>
      prev.includes(i) ? prev.filter((d) => d !== i) : [...prev, i]
    );
  };

  const addBreak = () => {
    if (!newBreak.label.trim()) return;
    setBreaks((prev) => [...prev, { id: Date.now(), ...newBreak }]);
    setNewBreak({ start: "12:00", end: "12:30", label: "" });
    setAddingBreak(false);
  };

  const removeBreak = (id) => setBreaks((prev) => prev.filter((b) => b.id !== id));

  const handleSave = async () => {
    setShowToast({
      visible: true,
      msg: "Adding slot please wait..."
    })

    const data = {
      activeDays,
      shiftStart,
      shiftEnd,
      slotDuration,
      consultFee,
      consultType,
      breakTime: breaks,
      offDays,
      slotId
    }

    console.log(data)

    const res = await apiCall('/doctor/add-slot', "POST", data)

    
    res.success? 
     setShowToast({
      visible: true,
      msg: "Slot added"
    })
    :setShowToast({
      visible: true,
      msg: res.message
    })

  setTimeout(() => setShowToast({
      visible: false,
    }), 4000)

    setSLotId(res?.slot?._id)
    
  };

  const inputStyle = (focused) => ({
    background: colors.surfaceContainerLow,
    border: "none",
    borderRadius: 10,
    padding: "10px 16px",
    fontSize: 14,
    fontFamily: "Inter",
    color: colors.onSurface,
    outline: "none",
    width: "100%",
    boxShadow: focused
      ? `0 0 0 2px ${colors.primaryContainer}40`
      : `0 0 0 1px ${colors.outlineVariant}30`,
    transition: "box-shadow 0.2s",
  });

  if(loading){
    return <LoadingSpinner/>
  }

  return (
    <>
      <style>{`
        body { font-family: 'Inter', sans-serif; background: ${colors.surface}; }
        input[type=time]::-webkit-calendar-picker-indicator { opacity: 0.4; cursor: pointer; }
        select { cursor: pointer; }
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(12px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${colors.outlineVariant}; border-radius: 4px; }
        @media (max-width: 768px) { .main-offset { margin-left: 0 !important; } }
      `}</style>

      <main
        className="main-offset min-h-screen"
        style={{ background: colors.surface, fontFamily: "Inter" }}
      >
        <div className="p-6 md:p-8 max-w-6xl mx-auto">

          {/* ── Page header ── */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
            <div>
              <h1
                className="text-2xl md:text-3xl font-extrabold tracking-tight"
                style={{ fontFamily: "Manrope", color: colors.onSurface }}
              >
                Schedule Management
              </h1>
              <p className="text-sm mt-1" style={{ color: colors.onSurfaceVariant }}>
                Configure your weekly availability, consultation fees, and break times.
              </p>
            </div>
            <button
              onMouseEnter={() => setSaveHovered(true)}
              onMouseLeave={() => setSaveHovered(false)}
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 self-start"
              style={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
                color: colors.onPrimary,
                border: "none",
                cursor: "pointer",
                fontFamily: "Manrope",
                boxShadow: saveHovered
                  ? `0 8px 24px ${colors.primary}45`
                  : `0 4px 12px ${colors.primary}28`,
                opacity: saveHovered ? 0.92 : 1,
                transform: saveHovered ? "translateY(-1px)" : "translateY(0)",
              }}
            >
              <Icon name="save" size={18} color={colors.onPrimary} />
              Save Schedule
            </button>
          </div>

          {/* ── Main grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* ── LEFT: Controls ── */}
            <div className="lg:col-span-5 space-y-6">

              {/* Weekly Availability */}
              <Card>
                <SectionHeader icon="event_available" title="Weekly Availability" />

                {/* Day selectors */}
                <div className="flex justify-between gap-1 mb-6">
                  {DAYS_SHORT.map((d, i) => {
                    const active = activeDays.includes(i);
                    return (
                      <button
                        key={i}
                        onClick={() => toggleDay(i)}
                        className="flex-1 h-10 rounded-lg flex items-center justify-center text-xs font-bold transition-all"
                        style={{
                          background: active
                            ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`
                            : colors.surfaceContainerLow,
                          color: active ? colors.onPrimary : colors.onSurfaceVariant,
                          border: "none",
                          cursor: "pointer",
                          boxShadow: active ? `0 2px 8px ${colors.primary}30` : "none",
                        }}
                        title={DAYS_FULL[i]}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>

                {/* Time inputs */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <TimeInput icon="schedule"  label="Shift Starts" value={shiftStart} onChange={setShiftStart} />
                  <TimeInput icon="timer_off" label="Shift Ends"   value={shiftEnd}   onChange={setShiftEnd}   />
                </div>

                {/* Slot duration */}
                <div>
                  <FieldLabel>Slot Duration</FieldLabel>
                  <div className="relative">
                    <select
                      value={slotDuration}
                      onChange={(e) => setSlotDuration(e.target.value)}
                      className="w-full rounded-lg px-4 py-2.5 text-sm font-medium border-none outline-none appearance-none pr-8"
                      style={{
                        background: colors.surfaceContainerLow,
                        color: colors.onSurface,
                        fontFamily: "Inter",
                        boxShadow: `0 0 0 1px ${colors.outlineVariant}30`,
                      }}
                    >
                      {["15 Minutes", "30 Minutes", "60 minutes"].map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                    <Icon name="expand_more" size={17} color={colors.outline}
                      className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </Card>

              {/* Consultation Settings */}
              <Card>
                <SectionHeader icon="payments" title="Consultation Settings" />
                <div className="space-y-5">
                  {/* Fee */}
                  <div>
                    <FieldLabel>Consultation Fee</FieldLabel>
                    <div className="relative">
                      <span
                        className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-sm"
                        style={{ color: colors.outline }}
                      >
                        $
                      </span>
                      <FocusInput
                        type="number"
                        value={consultFee}
                        onChange={setConsultFee}
                        style={{ paddingLeft: 28 }}
                      />
                    </div>
                  </div>

                  {/* Type segmented */}
                  <div>
                    <FieldLabel>Consultation Type</FieldLabel>
                    <div
                      className="grid grid-cols-3 p-1 rounded-xl gap-0.5"
                      style={{ background: colors.surfaceContainerLow }}
                    >
                      {["Online", "Offline", "Both"].map((t) => {
                        const active = consultType === t;
                        return (
                          <button
                            key={t}
                            onClick={() => setConsultType(t)}
                            className="py-2 text-xs font-bold rounded-lg transition-all"
                            style={{
                              background: active ? colors.surfaceContainerLowest : "transparent",
                              color: active ? colors.primary : colors.onSurfaceVariant,
                              border: "none",
                              cursor: "pointer",
                              boxShadow: active ? "0 1px 4px rgba(0,0,0,0.07)" : "none",
                            }}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Break Times */}
              <Card>
                <SectionHeader icon="coffee" title="Break Times" />

                {/* Existing breaks */}
                <div className="space-y-3 mb-4">
                  {breaks.map((b) => (
                    <div
                      key={b.id}
                      className="flex items-center justify-between px-4 py-3 rounded-xl"
                      style={{ background: colors.surfaceContainerLow }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ background: `${colors.tertiary}15` }}
                        >
                          <Icon name="free_breakfast" size={15} color={colors.tertiary} />
                        </div>
                        <div>
                          <p className="text-xs font-bold" style={{ color: colors.onSurface }}>
                            {b.label || "Break"}
                          </p>
                          <p className="text-[11px]" style={{ color: colors.onSurfaceVariant }}>
                            {b.start} – {b.end}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeBreak(b.id)}
                        className="p-1.5 rounded-lg transition-colors"
                        style={{ background: "none", border: "none", cursor: "pointer" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = colors.errorContainer)}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                      >
                        <Icon name="close" size={15} color={colors.error} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add break form */}
                {addingBreak ? (
                  <div
                    className="rounded-xl p-4 space-y-3 border"
                    style={{
                      background: colors.surfaceContainerLow,
                      borderColor: `${colors.primaryContainer}30`,
                    }}
                  >
                    <div>
                      <FieldLabel>Break Label</FieldLabel>
                      <FocusInput
                        type="text"
                        placeholder="e.g. Lunch Break"
                        value={newBreak.label}
                        onChange={(v) => setNewBreak((p) => ({ ...p, label: v }))}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <FieldLabel>Start</FieldLabel>
                        <FocusInput
                          type="time"
                          value={newBreak.start}
                          onChange={(v) => setNewBreak((p) => ({ ...p, start: v }))}
                        />
                      </div>
                      <div>
                        <FieldLabel>End</FieldLabel>
                        <FocusInput
                          type="time"
                          value={newBreak.end}
                          onChange={(v) => setNewBreak((p) => ({ ...p, end: v }))}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={addBreak}
                        className="flex-1 py-2 rounded-lg text-xs font-bold transition-all"
                        style={{
                          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
                          color: colors.onPrimary,
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Add Break
                      </button>
                      <button
                        onClick={() => setAddingBreak(false)}
                        className="px-4 py-2 rounded-lg text-xs font-semibold"
                        style={{
                          background: colors.surfaceContainerHigh,
                          color: colors.onSurfaceVariant,
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setAddingBreak(true)}
                    className="w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border border-dashed transition-colors"
                    style={{
                      borderColor: `${colors.outlineVariant}60`,
                      color: colors.onSurfaceVariant,
                      background: "none",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = colors.surfaceContainerLow)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                  >
                    <Icon name="add" size={16} color={colors.onSurfaceVariant} />
                    Add Break Time
                  </button>
                )}
              </Card>
            </div>

            {/* ── RIGHT: Off days + Preview ── */}
            <div className="lg:col-span-7 space-y-6">

              {/* Off Days Calendar */}
              <Card>
                <SectionHeader icon="event_busy" title="Mark Off Days" />
                <p className="text-xs mb-4" style={{ color: colors.onSurfaceVariant }}>
                  Click on a date to mark it as unavailable. Patients won't be able to book on these days.
                </p>
                <OffDaysCalendar offDays={offDays} setOffDays={setOffDays} />
              </Card>

              {/* Schedule Preview */}
              <Card>
                <SectionHeader icon="preview" title="Schedule Preview" />
                <SchedulePreview
                  activeDays={activeDays}
                  shiftStart={shiftStart}
                  shiftEnd={shiftEnd}
                  slotDuration={slotDuration}
                  consultFee={consultFee}
                  consultType={consultType}
                  breaks={breaks}
                  offDays={offDays}
                />
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Toast visible={showToast.visible} msg={showToast.msg} />
    </>
  );
}