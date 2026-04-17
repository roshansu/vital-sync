const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-8 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#dbe1ff] rounded-full">
            <span
              className="material-symbols-outlined text-[14px] text-[#003ea8]"
              style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#003ea8] font-['Inter']">
              v2.4 Precision Update
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#191c1e] leading-[1.1] font-['Manrope']">
            Smart Hospital <br />
            <span className="text-[#2563eb]">Management System</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-lg font-['Inter']">
            Precision serenity for modern healthcare. Streamline operations,
            empower clinical staff, and enhance patient outcomes with our
            integrated platform.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="bg-gradient-to-br from-[#004ac6] to-[#2563eb] text-white px-8 py-4 rounded-lg font-bold shadow-lg hover:opacity-95 transition-all flex items-center gap-2">
              Get Started
              <span className="material-symbols-outlined text-[20px]">
                arrow_forward
              </span>
            </button>
            <button className="bg-slate-200 text-[#191c1e] px-8 py-4 rounded-lg font-bold hover:bg-slate-300 transition-all">
              Book Appointment
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="relative rounded-xl overflow-hidden bg-white/70 backdrop-blur-md border border-white/20 p-4 aspect-[4/3] flex items-center justify-center shadow-2xl">
            <img
              alt="Clinical Dashboard"
              className="w-full h-full object-cover rounded-lg"
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000"
            />
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-xl w-64 hidden md:block border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#bc4800] flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-[20px]">
                    ecg
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">
                    Live Vitals
                  </p>
                  <p className="text-sm font-bold text-[#191c1e]">
                    Patient Room 402
                  </p>
                </div>
              </div>
              <div className="h-12 w-full flex items-end gap-1">
                {[60, 80, 40, 90, 50].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-[#943700] rounded-t-sm"
                    style={{ height: `${height}%`, opacity: height / 100 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
