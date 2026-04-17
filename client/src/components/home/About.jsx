const About = () => {
  return (
    <section className="py-24 px-8 max-w-7xl mx-auto" id="about">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="lg:w-1/2 relative">
          <img
            alt="Our Vision"
            className="rounded-xl shadow-lg w-full h-[500px] object-cover"
            src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=1000"
          />
          <div className="absolute -right-8 -bottom-8 bg-[#2563eb] p-12 rounded-xl text-white max-w-xs hidden xl:block shadow-2xl">
            <p className="text-4xl font-bold mb-2">99.9%</p>
            <p className="text-xs font-bold uppercase tracking-widest opacity-80">
              Data Uptime Reliability
            </p>
          </div>
        </div>
        <div className="lg:w-1/2 space-y-8">
          <p className="text-sm font-bold text-[#004ac6] tracking-[0.2em] uppercase font-['Inter']">
            The Atelier Philosophy
          </p>
          <h2 className="text-4xl font-extrabold tracking-tight leading-tight font-['Manrope']">
            Crafting Precision in Medical Administration
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed italic font-['Inter']">
            "Healthcare shouldn't be burdened by technology; it should be
            liberated by it. We've built an environment where data serves the
            healer."
          </p>
          <p className="text-slate-600 font-['Inter']">
            At The Clinical Atelier, we focus on the intersection of
            professional efficiency and patient care. Our platform is more than
            just software; it's a digital architect for modern hospitals.
          </p>
          <div className="grid grid-cols-2 gap-8 pt-4">
            <div>
              <p className="text-2xl font-bold text-[#191c1e]">500+</p>
              <p className="text-sm text-slate-500">Hospitals Integrated</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#191c1e]">1.2M</p>
              <p className="text-sm text-slate-500">Patients Managed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
