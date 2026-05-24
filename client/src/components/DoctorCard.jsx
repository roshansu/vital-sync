import { useState, useRef, useEffect } from "react";
import { colors } from "../constant/style";
import DashIcon from "./DashIcon";
import MiniCalendar from "./MiniCalendar";
import BookAppointmentForm from "./form/BookAppointmentForm";
import { DEPARTMENTS, DAYS, MONTHS, DOCTORS } from "./../constant/constData";

// function toMinutes(timeStr) {
//   const [h, m] = timeStr.split(":").map(Number);
//   return h * 60 + m;
// }

// function computeAvailableSlots(schedule) {
//   const start    = toMinutes(schedule.shiftStart);
//   const end      = toMinutes(schedule.shiftEnd);
//   const duration = Number(schedule.slotDuration);
//   // console.log(start, end, duration)
//   const breaks   = (schedule.breakTime || []).map((b) => ({
//     s: toMinutes(b.start),
//     e: toMinutes(b.end),
//   }));

//   const slots = [];
//   for (let t = start; t + duration <= end; t += duration) {
//     const inBreak = breaks.some((b) => t < b.e && t + duration > b.s);
//     if (!inBreak) {
//       const hh = String(Math.floor(t / 60)).padStart(2, "0");
//       const mm = String(t % 60).padStart(2, "0");
//       slots.push(`${hh}:${mm}`);
//     }
//   }
//   return slots;
// }

const toMinutes = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const formatedDate = (date) => {
  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

function computeAvailableSlots(schedule, selectedDate) {
  if(!selectedDate) return
  const start = toMinutes(schedule.shiftStart);
  const end = toMinutes(schedule.shiftEnd);
  const duration = Number(schedule.slotDuration);

  // Selected date => YYYY-MM-DD
  const formattedSelectedDate = formatedDate(selectedDate)
console.log("format", formattedSelectedDate)
  const breaks = (schedule.breakTime || []).map((b) => ({
    s: toMinutes(b.start),
    e: toMinutes(b.end),
    label: b.label,
  }));

  console.log("breaks", breaks)

  const slots = [];

  for (let t = start; t + duration <= end; t += duration) {
    const slotStart = t;
    const slotEnd = t + duration;

    const hh = String(Math.floor(slotStart / 60)).padStart(2, "0");

    const mm = String(slotStart % 60).padStart(2, "0");

    const slotTime = `${hh}:${mm}`;

    // Find blocked slot for same date
    const blockedSlot = breaks.find((b) => {
      const isOverlap = slotStart < b.e && slotEnd > b.s;

      // label date
      const breakDate = !isNaN(Date.parse(b.label))
        ? new Date(b.label).toISOString().split("T")[0]
        : null;

      return isOverlap && breakDate === formattedSelectedDate;
    });

    // Skip slot if booked for selected date
    if (blockedSlot) continue;

    // Skip normal breaks
    const inBreak = breaks.some((b) => {
      const isDateLabel = !isNaN(Date.parse(b.label));

      return !isDateLabel && slotStart < b.e && slotEnd > b.s;
    });

    if (inBreak) continue;

    slots.push(slotTime);
  }

  return slots;
}

export default function DoctorCard({ doctor, setCurrNav, schedule, slotId }) {
  const [calOpen, setCalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookHovered, setBookHovered] = useState(false);
  const [slotHovers, setSlotHovers] = useState({});
  const [showForm, setShowForm] = useState(false);
  const calRef = useRef(null);
  const [slotsForDate, setSlotsForDate] = useState([])
  const [acualDate, setActualdate] = useState()
  
  console.log("selectedDate", selectedDate);
  // close calendar on outside click
  let tempData = [];
  function handleBook() {
    if (!selectedDate && !selectedSlot) return;
    setActualdate(formatedDate(selectedDate))
    setShowForm(true);
    // setDocDetails((p)=>({
    //   ...p,
    //   name: doctor.doctor.userId.firstName+' '+doctor.doctor.userId.lastName,
    //   date: selectedDate,
    //   time: selectedSlot,
    //   fee: doctor.consultFee,
    //   specialization: doctor.doctor.specialization
    // }))
  }

  // let slotsForDate
  //  = schedule ? computeAvailableSlots(schedule) : [];

  // console.log("schedule",schedule)

  useEffect(()=>{
    const slotsFor =  schedule ? computeAvailableSlots(schedule, selectedDate) : [];
    setSlotsForDate(slotsFor)
    console.log(slotsFor)
  },[selectedDate])

  useEffect(() => {
    const handler = (e) => {
      if (calRef.current && !calRef.current.contains(e.target))
        setCalOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // const slotsForDate = selectedDate
  //   ? doctor.activeDays[selectedDate.getDay()] || []
  //   : [];

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const formatDate = (d) =>
    d
      ? `${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}, ${d.getFullYear()}`
      : null;

  return (
    <div
      style={{
        background: colors.surfaceContainerLowest,
        borderRadius: 16,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${colors.outlineVariant}1a`,
        boxShadow: "0 4px 32px rgba(25,28,30,0.05)",
        fontFamily: "Inter",
        position: "relative",
      }}>
      {/* ── Header ── */}
      <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
        <img
          src={doctor?.doctor?.userId?.imageUrl}
          alt={doctor.doctor.userId.firstName}
          style={{
            width: 80,
            height: 80,
            borderRadius: 12,
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 4,
            }}>
            <h3
              style={{
                fontWeight: 700,
                fontSize: 16,
                color: colors.onSurface,
                fontFamily: "Manrope",
                lineHeight: 1.2,
              }}>
              {doctor.doctor.userId.firstName + doctor.doctor.userId.lastName}
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                background: colors.tertiaryFixed,
                borderRadius: 9999,
                padding: "2px 8px",
                flexShrink: 0,
              }}>
              <DashIcon
                name="star"
                filled
                size={13}
                color={colors.onTertiaryFixedVariant}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: colors.onTertiaryFixedVariant,
                }}>
                {4}
              </span>
            </div>
          </div>
          <p
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: colors.primary,
              marginBottom: 6,
            }}>
            {doctor.doctor.specialization[0]}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: colors.onSurfaceVariant,
            }}>
            <DashIcon name="work" size={14} color={colors.onSurfaceVariant} />
            <span style={{ fontSize: 11 }}>{doctor?.doctor?.experience}</span>
          </div>
        </div>
      </div>

      {/* ── Calendar Trigger ── */}
      <div style={{ marginBottom: 16, position: "relative" }} ref={calRef}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}>
          <p
            style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: colors.outline,
            }}>
            {selectedDate
              ? `Slots for ${formatDate(selectedDate)}`
              : `Available Slots ${doctor.availability}`}
          </p>
          <p style={{ fontSize: 13, fontWeight: 700, color: colors.primary }}>
            {doctor.fee}
          </p>
        </div>

        {/* Date picker button */}
        <button
          onClick={() => setCalOpen(!calOpen)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 12px",
            background: calOpen
              ? colors.primaryFixed
              : colors.surfaceContainerLow,
            borderRadius: 10,
            border: `1px solid ${calOpen ? colors.primaryContainer : colors.outlineVariant}40`,
            cursor: "pointer",
            marginBottom: 10,
            transition: "background 0.15s, border-color 0.15s",
            fontFamily: "Inter",
          }}>
          <DashIcon
            name="calendar_month"
            size={16}
            color={calOpen ? colors.primaryContainer : colors.onSurfaceVariant}
          />
          <span
            style={{
              flex: 1,
              fontSize: 12,
              fontWeight: 600,
              color: calOpen
                ? colors.primaryContainer
                : colors.onSurfaceVariant,
              textAlign: "left",
            }}>
            {selectedDate ? formatDate(selectedDate) : "Pick a date"}
          </span>
          <DashIcon
            name="expand_more"
            size={16}
            color={calOpen ? colors.primaryContainer : colors.onSurfaceVariant}
            style={{
              transform: calOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          />
        </button>

        {/* Calendar dropdown */}
        {calOpen && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              left: 0,
              zIndex: 50,
              animation: "fadeDown 0.15s ease",
            }}>
            <MiniCalendar
              selectedDate={selectedDate}
              onSelect={(d) => {
                handleDateSelect(d);
                setCalOpen(false);
              }}
              schedule={schedule}
            />
          </div>
        )}

        {/* Time slots */}
        {selectedDate && (
          <div>
            {slotsForDate?.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 6,
                }}>
                {slotsForDate.map((slot) => {
                  const isSel = selectedSlot === slot;
                  const isHov = slotHovers[slot];
                  return (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(isSel ? null : slot)}
                      onMouseEnter={() =>
                        setSlotHovers((p) => ({ ...p, [slot]: true }))
                      }
                      onMouseLeave={() =>
                        setSlotHovers((p) => ({ ...p, [slot]: false }))
                      }
                      style={{
                        padding: "8px 4px",
                        fontSize: 11,
                        fontWeight: 600,
                        borderRadius: 8,
                        border: `1px solid ${isSel ? colors.primaryContainer : "transparent"}`,
                        background: isSel
                          ? `${colors.primaryContainer}18`
                          : isHov
                            ? colors.primaryFixed
                            : colors.surfaceContainerLow,
                        color: isSel
                          ? colors.primaryContainer
                          : isHov
                            ? colors.onPrimaryFixedVariant
                            : colors.onSurface,
                        cursor: "pointer",
                        transition: "all 0.15s",
                        fontFamily: "Inter",
                      }}>
                      {slot}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "14px 0",
                  color: colors.outline,
                  fontSize: 12,
                  background: colors.surfaceContainerLow,
                  borderRadius: 10,
                }}>
                No slots available on this date
              </div>
            )}
          </div>
        )} 

        {/* Default slots (no date selected) */}
         {/* {!selectedDate && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
            {(doctor.activeDays[new Date().getDay()] || Object.values(doctor.activeDays)[0] || []).slice(0, 3).map((slot) => {
              const isHov = slotHovers[slot];
              return (
                <button
                  key={slot}
                  onMouseEnter={() => setSlotHovers((p) => ({ ...p, [slot]: true }))}
                  onMouseLeave={() => setSlotHovers((p) => ({ ...p, [slot]: false }))}
                  onClick={() => { setSelectedSlot(slot); }}
                  style={{
                    padding: "8px 4px",
                    fontSize: 11,
                    fontWeight: 600,
                    borderRadius: 8,
                    border: "none",
                    background: isHov ? colors.primaryFixed : colors.surfaceContainerLow,
                    color: isHov ? colors.onPrimaryFixedVariant : colors.onSurface,
                    cursor: "pointer",
                    transition: "all 0.15s",
                    fontFamily: "Inter",
                  }}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        )}  */}
      </div>

      {/* ── Book button ── */}
      <button
        onMouseEnter={() => setBookHovered(true)}
        onMouseLeave={() => setBookHovered(false)}
        onClick={handleBook}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: 12,
          border: "none",
          background: bookHovered
            ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`
            : colors.surfaceContainerHigh,
          color: bookHovered ? colors.onPrimary : colors.onSurface,
          fontWeight: 700,
          fontSize: 13,
          cursor: "pointer",
          transition: "all 0.2s",
          fontFamily: "Manrope",
          boxShadow: bookHovered ? `0 4px 16px ${colors.primary}30` : "none",
        }}>
        {selectedSlot
          ? `Book — ${formatDate(selectedDate) || doctor.availability}, ${selectedSlot}`
          : "Book Appointment"}
      </button>

      {showForm && (
        <BookAppointmentForm
          name={
            doctor.doctor.userId.firstName + " " + doctor.doctor.userId.lastName
          }
          imageUrl={doctor?.doctor?.userId?.imageUrl}
          fee={doctor.consultFee}
          specialization={doctor.doctor.specialization}
          slotId={slotId}
          date={acualDate}
          time={selectedSlot}
          doctorId={doctor.doctor._id}
          userId={doctor.doctor.userId._id}
          setShowForm={setShowForm}
        />
      )}
    </div>
  );
}
