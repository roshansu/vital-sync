import CursorGlow from './CursorGlow'
import PatientRow from './PatientRow'
import SectionCard from './SectionCard'
import AppointmentRow from './AppointmentRow'
import StatCard from './StatCard'
import { colors } from '../../constant/style'
import Icon from '../appointment/Icon'
import apiCall from '../../api/apiCall'
import { useEffect, useState } from 'react'
import LoadingSpinner from '../LoadingSpinner'


export default function DoctorDashboard({setCurrNav}) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    async function getData() {
        setLoading(true)
        try{
            const res = await apiCall('/doctor/stats', "GET")
            if(res.success && res?.data){
                setData(res.data)
            }
        }catch(err){

        }
        setLoading(false)
    }

    useEffect(()=>{
        getData()
    }, [])

    if(loading) return <LoadingSpinner/>

  return (
    <>
      <style>{`
        body { font-family: 'Inter', sans-serif; background: ${colors.surface}; color: ${colors.onSurface}; }
        @media (max-width: 768px) { .main-offset { margin-left: 0 !important; } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${colors.outlineVariant}; border-radius: 4px; }
      `}</style>

      <CursorGlow />

      <main
        className="main-offset min-h-screen relative z-10"
        style={{  background: colors.surface, fontFamily: "Inter" }}
      >
        <div className="p-6 md:p-8 lg:p-10 max-w-7xl mx-auto space-y-8 md:space-y-10">

          {/* ── Welcome header ── */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2
                className="text-2xl md:text-3xl font-extrabold"
                style={{ fontFamily: "Manrope", color: colors.onSurface }}
              >
                Doctor Dashboard
              </h2>
              <p className="text-sm mt-1" style={{ color: colors.onSurfaceVariant }}>
                Monitor your clinical throughput and patient care metrics.
              </p>
            </div>

            {/* Date chip */}
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-xl self-start sm:self-auto"
              style={{ background: colors.surfaceContainerLowest, border: `1px solid ${colors.outlineVariant}25` }}
            >
              <Icon name="today" size={16} color={colors.primary} />
              <span className="text-sm font-semibold" style={{ color: colors.onSurface }}>
                {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
              </span>
            </div>
          </div>

          {/* ── Stats row ── */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            <StatCard
              icon="person"
              iconBg={`${colors.primary}0d`}
              iconColor={colors.primary}
              label="Total Patients"
              value={data?.stats?.totalPatient || 0}
            />
            <StatCard
              icon="calendar_month"
              iconBg={`${colors.secondary}0d`}
              iconColor={colors.secondary}
              label="Total Appointments"
              value={data?.stats?.totalAppointment || 0}
              sub=""
              subIcon="calendar_today"
              subColor={colors.secondary}
            />
            <StatCard
              icon="attach_money"
              iconBg={`${colors.tertiary}0d`}
              iconColor={colors.tertiary}
              label="Total Earnings"
              value={"$"+data?.stats?.totalEarnings || 0}
              sub="Net payout pending"
              subIcon="payments"
              subColor={colors.tertiary}
            />
          </section>

          {/* ── Main 2-col grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">

            {/* Recent Patients */}
            <SectionCard title="Recent Patients" actionLabel="View All">
              {data?.patient?.patientList.map((p) => (
                <PatientRow setCurrNav={setCurrNav} key={p.id} patient={p} />
              ))}
            </SectionCard>

            {/* Recent Appointments */}
            <SectionCard title="Recent Appointments" actionLabel="Full Schedule">
              {  data?.appointment?.map((a) => (
                <AppointmentRow setCurrNav={setCurrNav} key={a._id} appt={a} />
              ))}
            </SectionCard>
          </div>

        </div>
      </main>
    </>
  );
}
