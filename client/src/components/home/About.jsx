import { customStyles, colors } from "../../constant/style";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        {/* Image */}
        <div className="lg:w-1/2">
          <div className="relative">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA53SVEwPeOjHFRZ1xS7nZ1jx77GrolJKzf_THp4zYZKA2kiYbkNaPBKJYOIpHIKCsrWE2mk9owtQvw73Wy959Dg-bHiu2sZdHIV0yLlE28be4XlAI9LNHZCAHn9Qu-PlnWxn15E6vtVjDzcZ67qZ_ezKeMxFh9xm5YA7rWDcHC0npE38c26_pOmUEdcLN63nNkAGxMPGPgvtBYQSh8AbgukCpTOnNtQjHnSCsLP1cDDpE-OAtOmTvNpTW9hnb18168YhlnBpZiF_Y8"
              alt="Our Vision"
              className="rounded-xl shadow-lg w-full object-cover"
              style={{ height: 500 }}
            />
            {/* Stats badge */}
            <div
              className="absolute -right-8 -bottom-8 p-12 rounded-xl text-white max-w-xs hidden xl:block"
              style={{ background: colors.primaryContainer }}
            >
              <p className="text-4xl font-bold mb-2" style={{ fontFamily: "Manrope" }}>
                99.9%
              </p>
              <p
                className="text-xs font-bold uppercase tracking-widest opacity-80"
                style={{ fontFamily: "Inter" }}
              >
                Data Uptime Reliability
              </p>
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="lg:w-1/2 space-y-8">
          <p
            className="text-sm font-bold tracking-[0.2em] uppercase"
            style={{ color: colors.primary }}
          >
            The Atelier Philosophy
          </p>
          <h2
            className="text-4xl font-extrabold tracking-tight leading-tight"
            style={{ fontFamily: "Manrope", color: colors.onSurface }}
          >
            Crafting Precision in Medical Administration
          </h2>
          <p
            className="text-lg leading-relaxed italic"
            style={{ color: colors.onSurfaceVariant }}
          >
            "Healthcare shouldn't be burdened by technology; it should be liberated by it.
            We've built an environment where data serves the healer."
          </p>
          <p style={{ color: colors.onSurfaceVariant }}>
            At The Clinical Atelier, we focus on the intersection of professional efficiency
            and patient care. Our platform is more than just software; it's a digital architect
            for modern hospitals, designed to reduce clinician burnout and elevate the standard
            of health services through meticulous attention to detail.
          </p>
          <div className="grid grid-cols-2 gap-8 pt-4">
            {[
              { stat: "500+", label: "Hospitals Integrated" },
              { stat: "1.2M", label: "Patients Managed" },
            ].map(({ stat, label }) => (
              <div key={label}>
                <p
                  className="text-2xl font-bold"
                  style={{ fontFamily: "Manrope", color: colors.onSurface }}
                >
                  {stat}
                </p>
                <p className="text-sm" style={{ color: colors.onSurfaceVariant }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}