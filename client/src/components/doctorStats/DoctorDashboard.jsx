import CursorGlow from './CursorGlow'
import PatientRow from './PatientRow'
import SectionCard from './SectionCard'
import AppointmentRow from './AppointmentRow'
import StatCard from './StatCard'
import { colors } from '../../constant/style'
import Icon from '../appointment/Icon'
import apiCall from '../../api/apiCall'
import { useEffect, useState } from 'react'

const RECENT_PATIENTS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    age: 42,
    gender: "Female",
    date: "Oct 24, 2024",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsHO82CAE8f2Rxe46-1RAgYoUrPXI7LSOB58i3fC1sPJDP2tcddiT8F2Qwn7UgqEHyGK4FdsQlnrSIa4HAsCAMcdTeGpDS1JJbFadSUwp8JbCsQe3tBz1O22bV9IYrqeIZpBLCJkJDmQtV_OcSz5225M24l9w6jXL5s7VkH1NyrCBd4L3JuVu448xtimoV1x9wMvQk5JtWt7HN3ObROoPUZZ4nJlg8RXYWYV5zvEI9RZPfzM66-JA_nBTURMTEDnqf6MuMdlLfbwOq",
  },
  {
    id: 2,
    name: "Arthur Vance",
    age: 68,
    gender: "Male",
    date: "Oct 23, 2024",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCo-fF1CHNWOyOc1UgFxQjWVaPpihs0hvr-wMrkJ25dWUz1uWswrD-8PcNMqw5lF2lvk80KP4nIzJ8g1FQh93Gpc1By7je67nCNEKQISTwcgeFI9xEsW_--HqOM-0EsEXfX7-qpMKPrI_Z8r6El7IP09Ek76Y2J_Z0By-rXh7kyuLTFcr3TalX5-hdZsNs93Lr3bXt-e_Mu_1kJdZme1TrqhbsyQTr8rreddMcPz9eOquCp08qrGcpszbVzhrTZom79Lzioumc7sArl",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    age: 35,
    gender: "Female",
    date: "Oct 22, 2024",
    img: null,
  },
  {
    id: 4,
    name: "Marcus Chen",
    age: 29,
    gender: "Male",
    date: "Oct 21, 2024",
    img: null,
  },
];

const RECENT_APPOINTMENTS = [
  {
    id: 1,
    patient: "Eleanor Shellstrop",
    month: "Oct",
    day: "24",
    time: "10:30 AM",
    type: "Online Consultation",
    typeIcon: "videocam",
    status: "Scheduled",
    statusStyle: { bg: `${colors.primary}14`, color: colors.primary },
    dateStyle: { bg: colors.primaryFixed, color: colors.primary },
  },
  {
    id: 2,
    patient: "Jason Mendoza",
    month: "Oct",
    day: "24",
    time: "04:30 PM",
    type: "In-Clinic",
    typeIcon: "location_on",
    status: "Pending",
    statusStyle: { bg: colors.tertiaryFixed, color: colors.tertiaryContainer },
    dateStyle: { bg: colors.surfaceContainerHigh, color: colors.onSurfaceVariant },
  },
  {
    id: 3,
    patient: "Priya Nair",
    month: "Oct",
    day: "25",
    time: "09:00 AM",
    type: "Home Visit",
    typeIcon: "home_health",
    status: "Confirmed",
    statusStyle: { bg: "#f0fdf4", color: "#15803d" },
    dateStyle: { bg: `${colors.secondary}18`, color: colors.secondary },
  },
];

export default function DoctorDashboard() {

    async function getData() {
        try{
            const res = await apiCall('/doctor/stats', "GET")
        }catch(err){

        }
    }

    useEffect(()=>{
        getData()
    }, [])

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
              value="1,284"
            />
            <StatCard
              icon="calendar_month"
              iconBg={`${colors.secondary}0d`}
              iconColor={colors.secondary}
              label="Total Appointments"
              value="56"
              sub="14 pending today"
              subIcon="calendar_today"
              subColor={colors.secondary}
            />
            <StatCard
              icon="attach_money"
              iconBg={`${colors.tertiary}0d`}
              iconColor={colors.tertiary}
              label="Total Earnings"
              value="$12,450"
              sub="Net payout pending"
              subIcon="payments"
              subColor={colors.tertiary}
            />
          </section>

          {/* ── Main 2-col grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">

            {/* Recent Patients */}
            <SectionCard title="Recent Patients" actionLabel="View All">
              {RECENT_PATIENTS.map((p) => (
                <PatientRow key={p.id} patient={p} />
              ))}
            </SectionCard>

            {/* Recent Appointments */}
            <SectionCard title="Recent Appointments" actionLabel="Full Schedule">
              {RECENT_APPOINTMENTS.map((a) => (
                <AppointmentRow key={a.id} appt={a} />
              ))}
            </SectionCard>
          </div>

        </div>
      </main>
    </>
  );
}
