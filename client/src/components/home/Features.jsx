const features = [
  "Patient Management",
  "Doctor Scheduling",
  "Appointment Booking",
  "Secure Records",
];

const FeatureCard = ({ icon, title, description, bgColor }) => (
  <div className="bg-white p-8 rounded-lg transition-transform hover:-translate-y-1 duration-300 shadow-sm border border-slate-100">
    <div className={`w-12 h-12 rounded-lg ${bgColor} flex items-center justify-center mb-6`}>
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
        {icon}
      </span>
    </div>
    <h3 className="text-xl font-bold text-[#191c1e] mb-3 tracking-tight font-['Manrope']">{title}</h3>
    <p className="text-sm text-slate-600 leading-relaxed font-['Inter']">{description}</p>
  </div>
);

const Features = () => {
  return (
<section className="bg-slate-50 py-24" id="features">
          <div className="max-w-7xl mx-auto px-8">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-[#191c1e] mb-4 font-['Manrope']">Designed for Clinical Excellence</h2>
              <p className="text-slate-600 max-w-2xl mx-auto font-['Inter']">Our platform eliminates administrative friction, allowing your staff to focus on what matters most: patient care.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard 
                icon="person_search" title="Patient Management" bgColor="bg-blue-100 text-blue-700"
                description="Comprehensive records and intake flows designed for accuracy and speed in high-volume environments." 
              />
              <FeatureCard 
                icon="medical_services" title="Doctor Scheduling" bgColor="bg-indigo-100 text-indigo-700"
                description="Optimize clinical hours and availability with smart shift rotation and conflict detection algorithms." 
              />
              <FeatureCard 
                icon="calendar_month" title="Appointment Booking" bgColor="bg-orange-100 text-orange-700"
                description="Seamless consultation scheduling for patients with automated reminders and multi-channel intake." 
              />
              <FeatureCard 
                icon="shield_with_heart" title="Secure Records" bgColor="bg-slate-200 text-slate-700"
                description="HIPAA-compliant data encryption and storage protocols ensuring patient confidentiality at all times." 
              />
            </div>
          </div>
        </section>    
  );
};



export default Features;