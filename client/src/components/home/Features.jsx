import { customStyles, colors } from "../../constant/style";

const features = [
  {
    icon: "person_search",
    title: "Patient Management",
    desc: "Comprehensive records and intake flows designed for accuracy and speed in high-volume environments.",
    bg: colors.primaryFixed,
    iconColor: colors.primary,
  },
  {
    icon: "medical_services",
    title: "Hassle-Free Scheduling",
    desc: "Choose your preferred time, avoid clashes, and manage all your appointments in one place.",
    bg: colors.secondaryFixed,
    iconColor: colors.secondary,
  },
  {
    icon: "calendar_month",
    title: "Appointment Booking",
    desc: "Seamless consultation scheduling for patients with automated reminders and multi-channel intake.",
    bg: colors.tertiaryFixed,
    iconColor: colors.tertiary,
  },
  {
    icon: "shield_with_heart",
    title: "Secure Records",
    desc: "HIPAA-compliant data encryption and storage protocols ensuring patient confidentiality at all times.",
    bg: "rgba(195,198,215,0.2)",
    iconColor: colors.onSurface,
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-24"
      style={{ background: colors.surfaceContainerLow }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-16 text-center">
          <h2
            className="text-3xl font-extrabold tracking-tight mb-4"
            style={{ fontFamily: "Manrope", color: colors.onSurface }}
          >
            Crafted for a Better Healthcare Experience
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: colors.onSurfaceVariant }}>
            Our platform simplifies appointment management, giving you more time to focus on your well-being.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon, title, desc, bg, iconColor }) => (
            <div
              key={title}
              className="p-8 rounded-lg transition-transform hover:-translate-y-1 duration-300"
              style={{ background: colors.surfaceContainerLowest }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
                style={{ background: bg }}
              >
                <span
                  className="material-symbols-outlined icon-filled"
                  style={{ color: iconColor }}
                >
                  {icon}
                </span>
              </div>
              <h3
                className="text-xl font-bold mb-3 tracking-tight"
                style={{ fontFamily: "Manrope", color: colors.onSurface }}
              >
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: colors.onSurfaceVariant }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}