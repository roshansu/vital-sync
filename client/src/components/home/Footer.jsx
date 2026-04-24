import { customStyles, colors } from "../../constant/style";

export default function Footer() {
  const links = ["Privacy Policy", "Terms of Service", "Security", "Support"];
  const icons = ["share", "hub", "mail"];

  return (
    <footer
      className="w-full py-12 px-8"
      style={{ background: colors.surfaceContainerLow }}>
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
        {/* Brand */}
        <div className="flex flex-col gap-2">
          <span
            className="font-bold text-lg"
            style={{ fontFamily: "Manrope", color: colors.onSurface }}>
            The Clinical Atelier
          </span>
          <p
            className="text-sm opacity-60"
            style={{ fontFamily: "Inter", color: colors.onSurface }}>
            © 2024 The Clinical Atelier. Precision Serenity in Healthcare.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm opacity-60 transition-colors hover:opacity-100"
              style={{ color: colors.onSurface }}>
              {link}
            </a>
          ))}
        </div>

        {/* Icons */}
        <div className="flex gap-4">
          {icons.map((icon) => (
            <button
              key={icon}
              className="material-symbols-outlined transition-colors hover:text-blue-600"
              style={{ color: colors.onSurfaceVariant }}>
              {icon}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
