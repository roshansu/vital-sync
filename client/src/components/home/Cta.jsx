import { customStyles, colors } from "../../constant/style";

export default function CTASection() {
  return (
    <section id="contact" className="px-8 pb-24">
      <div className="max-w-7xl mx-auto primary-gradient rounded-xl p-12 md:p-20 text-white text-center space-y-8 relative overflow-hidden">
        {/* Decorative blur */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full"
          style={{
            background: "rgba(255,255,255,0.10)",
            filter: "blur(48px)",
            marginRight: -128,
            marginTop: -128,
          }}
        />
        <h2
          className="text-4xl font-extrabold tracking-tight relative z-10"
          style={{ fontFamily: "Manrope" }}
        >
          Your health, your schedule
        </h2>
        <p
          className="max-w-xl mx-auto relative z-10 opacity-90"
          style={{ color: colors.onPrimaryContainer }}
        >
          Find the right doctor, book instantly, and stay organized—all in one place.
        </p>
        <div className="flex flex-wrap justify-center gap-4 relative z-10">
          <button
            className="bg-white px-10 py-4 rounded-lg font-bold shadow-xl hover:opacity-95 transition-all"
            style={{ color: colors.primary }}
          >
            Get Started Now
          </button>
          <button className="border border-white/30 text-white px-10 py-4 rounded-lg font-bold hover:bg-white/10 transition-all">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
}