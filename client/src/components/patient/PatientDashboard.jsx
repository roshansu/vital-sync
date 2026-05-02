import React from 'react';
import { colors } from '../../constant/style';
import StatCard from './StatCard';
import VitalMeter from './VitalMeter'
import ActivityItem from './ActivityItem';
import QuickNav from './QuickNav';

const PatientDashboard = ({setCurrNav}) => {
  return (
    <div className="min-h-screen ml-0 font-sans" style={{ backgroundColor: colors.surface, color: colors.onSurface }}>
      <main className="p-4 md:p-8 max-w-7xl mx-auto">
        
        {/* Welcome Section */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight mb-2" style={{ color: colors.onSurface }}>
              Welcome, Julian 👋
            </h2>
            <p style={{ color: colors.onSurfaceVariant }} className="max-w-md">
              Your health metrics are looking stable today. You have one appointment scheduled for next week.
            </p>
          </div>
          <div className="flex gap-3">
            <button onClick={()=>setCurrNav('doctors')}
              className="px-6 py-2.5 text-white font-bold rounded-lg shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
              style={{ background: `linear-gradient(to bottom right, ${colors.primary}, ${colors.primaryContainer})` }}
            >
              Book Appointment
            </button>
            <button onClick={()=>setCurrNav('reports')}
              className="px-6 py-2.5 border font-bold rounded-lg transition-all"
              style={{ 
                backgroundColor: colors.surfaceContainerLowest, 
                borderColor: colors.outlineVariant,
                color: colors.onSurface 
              }}
            >
              View Reports
            </button>
          </div>
        </section>

        {/* Key Stats Row */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard icon="event" label="Upcoming Appointments" value="2" bgColor={colors.primaryFixed} iconColor={colors.primary} />
          <StatCard icon="folder_shared" label="Total Visits" value="12" bgColor={colors.secondaryFixed} iconColor={colors.secondary} />
          <StatCard icon="payments" label="Pending Bills" value="$150" bgColor={colors.tertiaryFixed} iconColor={colors.tertiary} />
        </section>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Priority & Vitals */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Next Priority</h3>
            
            {/* Appointment Card */}
            <div 
              className="relative overflow-hidden rounded-2xl p-8 text-white shadow-xl"
              style={{ background: `linear-gradient(to bottom right, ${colors.primary}, #1e40af)` }}
            >
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20">
                      Confirmed
                    </span>
                    <h4 className="text-3xl font-black mt-4 leading-tight">Dr. Marcus Thorne</h4>
                    <p className="font-medium tracking-wide opacity-80">Cardiology Specialist</p>
                  </div>
                  <div className="w-16 h-16 rounded-full border-4 border-white/10 overflow-hidden">
                    <img 
                      className="w-full h-full object-cover" 
                      src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200" 
                      alt="Doctor" 
                    />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-8 items-center border-t border-white/10 pt-8">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined opacity-60">calendar_month</span>
                    <div>
                      <p className="text-[10px] uppercase font-bold opacity-60 tracking-wider">Date</p>
                      <p className="font-bold">Oct 28, 2023</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined opacity-60">schedule</span>
                    <div>
                      <p className="text-[10px] uppercase font-bold opacity-60 tracking-wider">Time</p>
                      <p className="font-bold">10:30 AM</p>
                    </div>
                  </div>
                  <button onClick={()=>setCurrNav('appointments')} className="ml-auto px-8 py-3 bg-white font-black rounded-xl hover:opacity-90 transition-colors shadow-lg text-blue-700">
                    View Details
                  </button>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            </div>

            {/* Vitals and Alerts */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl" style={{ backgroundColor: colors.surfaceContainerLowest }}>
                <h4 className="font-bold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm" style={{ color: colors.primary }}>monitor_heart</span>
                  Vitals Summary
                </h4>
                <div className="space-y-4">
                  <VitalMeter label="Heart Rate" value="72" unit="BPM" progress="70%" color={colors.primary} />
                  <VitalMeter label="Blood Pressure" value="120/80" unit="mmHg" progress="85%" color={colors.primary} />
                </div>
              </div>

              <div className="p-6 rounded-xl border" style={{ backgroundColor: colors.surfaceContainerLowest, borderColor: `${colors.primary}10` }}>
                <h4 className="font-bold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm" style={{ color: colors.primary }}>notifications_active</span>
                  Health Alerts
                </h4>
                <div className="p-3 rounded-lg flex gap-3 border" style={{ backgroundColor: '#fff5f5', borderColor: '#feb2b2' }}>
                  <span className="material-symbols-outlined text-red-600 text-xl">error_outline</span>
                  <div>
                    <p className="text-xs font-bold text-red-900">Check-up Required</p>
                    <p className="text-[10px] text-red-700">Your annual physical is 15 days overdue.</p>
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          {/* Right Column: Activity */}
          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Recent Activity</h3>
            <div className="rounded-2xl overflow-hidden shadow-sm" style={{ backgroundColor: colors.surfaceContainerLowest }}>
              <div className="p-6 space-y-6">
                <ActivityItem 
                  dotColor={colors.primary} 
                  label="Last Prescription" 
                  title="Amoxicillin" 
                  subtitle="500mg • 2x Daily" 
                  date="Oct 20" 
                />
                <ActivityItem 
                  dotColor={colors.secondary} 
                  label="Last Uploaded Report" 
                  title="Blood Panel" 
                  subtitle="General Wellness Profile" 
                  date="Oct 18"
                  
                />
                <ActivityItem 
                  dotColor={colors.tertiary} 
                  label="Appointment Request" 
                  title="Cardiology Dept." 
                  subtitle="Follow-up schedule confirmed" 
                  date="Oct 15"
                  isLast 
                />
              </div>
            </div>

            {/* Quick Nav */}
          </div>

        </div>
      </main>
    </div>
  );
};


export default PatientDashboard;