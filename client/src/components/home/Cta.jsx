const CTA = () => {
  return (
    <section className="px-8 pb-24" id="contact">
      <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#004ac6] to-[#2563eb] rounded-xl p-12 md:p-20 text-white text-center space-y-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <h2 className="text-4xl font-extrabold tracking-tight relative z-10 font-['Manrope']">
          Ready to transform your clinical workflow?
        </h2>
        <p className="max-w-xl mx-auto text-blue-100 relative z-10 opacity-90 font-['Inter']">
          Join the thousands of medical professionals who have embraced
          precision serenity. Start your trial today.
        </p>
        <div className="flex flex-wrap justify-center gap-4 relative z-10">
          <button className="bg-white text-[#004ac6] px-10 py-4 rounded-lg font-bold shadow-xl hover:bg-slate-50 transition-all">
            Get Started Now
          </button>
          <button className="border border-white/30 text-white px-10 py-4 rounded-lg font-bold hover:bg-white/10 transition-all">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
