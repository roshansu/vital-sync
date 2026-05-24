import { useState, useEffect } from 'react';
import AppointmentRow from './AppointmentRow'
import ConfirmDialog from './ConfirmDialog'
import RescheduleModal from './RescheduleModal'
import { colors } from '../../constant/style';
import Icon from '../appointment/Icon';
import apiCall from '../../api/apiCall';
import LoadingSpinner from '../LoadingSpinner';
import Toast from '../form/Toast'


const INITIAL_APPOINTMENTS = [
  {
    id: 1,
    patient: "Sarah Jenkins",
    date: "Oct 24, 2024",
    time: "10:30 AM",
    reason: "Post-surgery followup",
    type: "Online",
    typeIcon: "videocam",
    typeColor: colors.primary,
    payment: "Paid",
    status: "Pending",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAopNjdtY1cabhGYYDrOwmfTOxOnfpifYxIrFtgnMouLmDXC0ULVkupSneYyVfyIjFm2Pqcy87-LILFG-t19OGo781Nsg5hO7F7aCACUO8TdPNZ9uzxy51VghaiUYu1H7fhu3TUA_lzR0zki0Qtx65w_p4VBqpLpA8Yz3x_C9Jwp9dNVDbsSkOY5o8ahlGWRFZB5IRuXJ1VUq71L9CfbASaeRp8F3xkBZkfoSW-mqeIKoaTu2mhH7FqGU2472H-MVV3NNs0CcYjdXcD",
  },
  {
    id: 2,
    patient: "Marcus Thorne",
    date: "Oct 24, 2024",
    time: "01:15 PM",
    reason: "Cardiology Screening",
    type: "Home Visit",
    typeIcon: "home_health",
    typeColor: colors.secondary,
    payment: "Unpaid",
    status: "Approved",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAujWG4ShVFNNU7fCKRfhNDFhNd0r7Yp_WII-DGbXyGnJiBCGelKwGYUS5reppHW_bRrXNqYuH_pgwMIxsV6Y_n_ndT3mfTxSB2-IwnIkXU1NkDlvB2j-ukb2Mqy4GHu9XqM6VHYi0CZnrBGrN_bdfwf8iaNaT9iNBlS0aYv4z-Lk8d8e0cfB9jJTZeArACEcUXAX1BHHMi0HRuRMWgzXloKp1HhTZZDGe0aUxprlCD59KUWcwnSwj-2IzlWJPHgo9gPUFIg18Ie40h",
  },
  {
    id: 3,
    patient: "Elena Rodriguez",
    date: "Oct 25, 2024",
    time: "09:00 AM",
    reason: "High Blood Pressure Review",
    type: "In-Clinic",
    typeIcon: "meeting_room",
    typeColor: colors.onSurfaceVariant,
    payment: "Paid",
    status: "Pending",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKBJ-Qt0UVWLT9L6O-bUYcanKltfakW_pdsimkCwJLrMMiIv27-dOWGYTi23fol72vuGHEwpcrKNehMk5qioIrvaDJ9POrnpvgGvWOKO3IRUODeut1a8xaVRjVAUM1mty5b3qKBOqcISb-vZtN6xh041_T4VgvnPq7uDDbpZNlMFOwLrWGb5P8kql_YkBSR5P0z79v0CtMe302XAEWOl_BJtStMCtVh2NLhZb3ol4yxBO5K_D5yMzpG9eFvceQDUJwlmHBjjw16vU9",
  },
  {
    id: 4,
    patient: "James Holden",
    date: "Oct 25, 2024",
    time: "11:00 AM",
    reason: "Diabetes Checkup",
    type: "Online",
    typeIcon: "videocam",
    typeColor: colors.primary,
    payment: "Paid",
    status: "Completed",
    img: null,
  },
  {
    id: 5,
    patient: "Priya Nair",
    date: "Oct 26, 2024",
    time: "03:30 PM",
    reason: "Skin Allergy Consultation",
    type: "In-Clinic",
    typeIcon: "meeting_room",
    typeColor: colors.onSurfaceVariant,
    payment: "Unpaid",
    status: "Rejected",
    img: null,
  },
];

const STATUS_TABS = ["All", "pending", "approved", "completed", "rejected"];


export default function ManageAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [activeTab,    setActiveTab]    = useState("All");
  const [rescheduleAppt, setRescheduleAppt] = useState(null);
  const [confirm,        setConfirm]        = useState(null);
  const [visible,        setVisible]        = useState(false);
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [updating, setUpdating] = useState({
    visible: false,
    msg: ''
  })
  // Stagger-in animation on mount

    async function getData() {
        setLoading(true)
        try{
            const res = await apiCall('/doctor/appointment', "GET")
            setAppointments(res.data)
        }catch(err){
            setLoading(false)
        }
        setLoading(false)

    }


    useEffect(()=>{
        getData()
    }, [])

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const filtered = appointments.filter(
    (a) => activeTab === "All" || a.status === activeTab
  );

  // ── Status update helpers ──
  const updateStatus = (id, status) =>
    setAppointments((prev) =>
      prev.map((a) => (a._id === id ? { ...a, status } : a))
    );

  const handleApprove  = (appt) =>
    setConfirm({ type: "approve",  appt, patientId: appt.patient.patientId, message: `Approve appointment for ${appt.patient.firstName+" "+appt.patient.lastName}?`, label: "approve" });
  const handleReject   = (appt) =>
    setConfirm({ type: "reject",   appt, message: `Reject appointment for ${appt.patient.firstName+" "+appt.patient.lastName}? This will notify the patient.`, label: "reject", danger: true });
  const handleComplete = (appt) =>
    setConfirm({ type: "complete", appt, message: `Mark ${appt.patient.firstName+" "+appt.patient.lastName}s appointment as completed?`, label: "complete" });

  const handleConfirm = async() => {
    setUpdating({
      visible: true,
      msg: "Updating please wait..."
    })
      setConfirm(null);
    try{
      if (!confirm) return;
      const map = { approve: "approved", reject: "rejected", complete: "completed" };
      const res = await apiCall(`/doctor/appointment/${map[confirm.type]}`, "PATCH", {id: confirm.appt._id, patientId: confirm.patientId})
    

      if(res.success){
        updateStatus(confirm.appt._id, map[confirm.type]);
      }
      setUpdating({
        visible: true,
        msg: res.message
      })


    }catch(err){
      setUpdating({
        visible: false,
        msg: err.message
      })
    }

    setTimeout(() => {
      setUpdating({
        visible: false
      })
    }, 3000);
  };

  const handleRescheduleConfirm = async({ date, time, note }) => {
    setUpdating({
      visible: true,
      msg: "Rescheduling please wait..."
    })
      setRescheduleAppt(null);
      try{
        const formatted = `${date} · ${time}`;

        const res = await apiCall('/doctor/appointment', "PUT", {date, time, note, id:rescheduleAppt._id})
        if(res.success){
          setAppointments((prev) =>
            prev.map((a) =>
              a._id === rescheduleAppt._id
                ? { ...a, date: date.replace(/-/g, "/"), time }
                : a
            )
          );
        }

      setUpdating({
        visible: true,
        msg: res.message
      })

      }catch(err){
        setUpdating({
          visible: false,
          msg: err.message
        })
      }

    setTimeout(() => {
      setUpdating({
        visible: false
      })
    }, 3000);
  };

  const counts = STATUS_TABS.reduce((acc, tab) => {
    acc[tab] = tab === "All"
      ? appointments.length
      : appointments.filter((a) => a.status === tab).length;
    return acc;
  }, {});

  if(loading) return <LoadingSpinner/>

  return (
    <>
      <style>{`
        body { font-family: 'Inter', sans-serif; background: ${colors.surface}; }
        textarea { resize: none; }
        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="time"]::-webkit-calendar-picker-indicator { opacity: 0.4; cursor: pointer; }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
        @media (max-width: 768px) { .main-offset { margin-left: 0 !important; } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${colors.outlineVariant}; border-radius: 4px; }
      `}</style>

      <main
        className="main-offset min-h-screen"
        style={{ background: colors.surface, fontFamily: "Inter" }}
      >
        <section className="px-6 md:px-8 pt-6 md:pt-8 pb-16 max-w-6xl mx-auto">

          {/* ── Page header ── */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <h1
                className="text-2xl md:text-3xl font-extrabold tracking-tight"
                style={{ fontFamily: "Manrope", color: colors.onSurface }}
              >
                Manage Appointments
              </h1>
              <p className="text-sm mt-1" style={{ color: colors.onSurfaceVariant }}>
                Review, approve, reschedule and track all patient appointments
              </p>
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-3 flex-wrap">
              {[
                { label: "Pending",  count: counts.Pending,  bg: `${colors.secondaryContainer}33`, color: colors.secondary },
                { label: "Approved", count: counts.Approved, bg: `${colors.primaryContainer}15`,   color: colors.primary   },
              ].map(({ label, count, bg, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{ background: bg, color }}
                >
                  {count} {label}
                </div>
              ))}
            </div>
          </div>

          {/* ── Filter tabs ── */}
          <div
            className="flex p-1 rounded-xl gap-0.5 mb-8 overflow-x-auto"
            style={{ background: colors.surfaceContainerLow, width: "fit-content", maxWidth: "100%" }}
          >
            {STATUS_TABS.map((tab) => {
              const active = activeTab === tab;
              const count  = counts[tab];
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="flex items-center gap-1.5 px-4 md:px-6 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all"
                  style={{
                    background: active ? colors.surfaceContainerLowest : "transparent",
                    color: active ? colors.primary : colors.onSurfaceVariant,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: active ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                    fontWeight: active ? 700 : 500,
                  }}
                >
                  {tab}
                  {count > 0 && tab !== "All" && (
                    <span
                      className="text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center"
                      style={{
                        background: active ? `${colors.primary}18` : colors.surfaceContainerHigh,
                        color: active ? colors.primary : colors.outline,
                      }}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Appointment list ── */}
          {filtered.length === 0 ? (
            <div
              className="rounded-xl py-20 flex flex-col items-center text-center border border-dashed"
              style={{ background: colors.surfaceContainerLowest, borderColor: `${colors.outlineVariant}50` }}
            >
              <Icon name="event_busy" size={48} color="#cbd5e1" className="mb-4" />
              <p className="text-lg font-bold mb-1" style={{ fontFamily: "Manrope", color: colors.onSurface }}>
                No appointments found
              </p>
              <p className="text-sm" style={{ color: "#64748b" }}>
                No {activeTab === "All" ? "" : activeTab.toLowerCase()} appointments to show.
              </p>
            </div>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {filtered.map((appt, idx) => (
                <div
                  key={appt._id}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.5s ease ${idx * 80}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${idx * 80}ms`,
                  }}
                >
                  <AppointmentRow
                    appt={appt} patientId={appt.patient._id}
                    visible={visible}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onComplete={handleComplete}
                    onReschedule={setRescheduleAppt}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* ── Reschedule modal ── */}
      {rescheduleAppt && (
        <RescheduleModal
          appointment={rescheduleAppt}
          onClose={() => setRescheduleAppt(null)}
          onConfirm={handleRescheduleConfirm}
        />
      )}

      {/* ── Confirm dialog ── */}
      {confirm && (
        <ConfirmDialog
          message={confirm.message}
          confirmLabel={confirm.label}
          danger={confirm.danger}
          onConfirm={handleConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}

      {
        (updating.visible && <Toast visible={updating.visible} msg={updating.msg} />)
      }
    </>
  );
}
