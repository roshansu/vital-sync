const Footer = () => {
  return (
    <footer className="bg-slate-100 w-full py-12 px-8 border-t border-slate-200">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
        <div className="flex flex-col gap-2">
          <span className="font-['Manrope'] font-bold text-[#191c1e] text-lg">
            The Clinical Atelier
          </span>
          <p className="font-['Inter'] text-sm text-slate-500">
            © 2024 The Clinical Atelier. Precision Serenity in Healthcare.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {["Privacy Policy", "Terms of Service", "Security", "Support"].map(
            (link) => (
              <a
                key={link}
                href="#"
                className="font-['Inter'] text-sm text-slate-500 hover:text-blue-600 transition-colors">
                {link}
              </a>
            ),
          )}
        </div>
        <div className="flex gap-4">
          {["share", "hub", "mail"].map((icon) => (
            <button
              key={icon}
              className="material-symbols-outlined text-slate-400 hover:text-blue-600 transition-colors">
              {icon}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
