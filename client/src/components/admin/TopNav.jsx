import Icon from "../appointment/Icon";
import { colors } from "../../constant/style";

export default function TopNav({ search, setSearch, searchFocused, setSearchFocused }) {
  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-6 md:px-8 h-16 border-b"
      style={{
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(16px)",
        borderColor: `${colors.outlineVariant}20`,
  // matches sidebar width
      }}
    >
      {/* Left: title + search */}
      {/* <div className="flex items-center gap-4 md:gap-6 flex-1 min-w-0">
        <h2
          className="hidden lg:block font-extrabold tracking-tight text-xl flex-shrink-0"
          style={{ fontFamily: "Manrope", color: colors.onSurface }}
        >
          Dashboard
        </h2> */}

        {/* Search bar */}
        <div
          className=" flex w-full lg:w-1/2 items-center gap-2 rounded-full px-4 py-1.5 transition-all"
          style={{
            background: colors.surfaceContainerLow,
            boxShadow: searchFocused
              ? `0 0 0 2px ${colors.primaryContainer}35`
              : "none",
          }}
        >
          <Icon name="search" size={17} color={colors.outline} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Search clinical records..."
            className="bg-transparent border-none outline-none text-sm w-full"
            style={{ color: colors.onSurface, fontFamily: "Inter" }}
          />
        </div>
      {/* </div> */}

      {/* Right: actions */}
      {/* <div className="flex items-center gap-3 flex-shrink-0">
        <button
          className="relative p-2 rounded-full transition-colors"
          style={{ background: "none", border: "none", cursor: "pointer" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = colors.surfaceContainerLow)}
          onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
        >
          <Icon name="notifications" size={20} color={colors.onSurfaceVariant} />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ background: colors.error }}
          />
        </button>

        <button
          className="p-2 rounded-full transition-colors"
          style={{ background: "none", border: "none", cursor: "pointer" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = colors.surfaceContainerLow)}
          onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
        >
          <Icon name="settings" size={20} color={colors.onSurfaceVariant} />
        </button>

        <div
          className="w-9 h-9 rounded-full overflow-hidden border-2 flex-shrink-0"
          style={{ borderColor: colors.surfaceContainerLowest }}
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAB8Ui4zewXEhQgr49Q11_tDc7ZhvSgD_6CrPoN02m761Ecs0qq_ZeICZTVk5cy_qH1JyPB5Xiuh8S80OSw7zW69IqJ5ZMt_WJoGNgTpTwGXy2MQPkf91XRjr03opQZUpI8gcVffIy66sOoGz03Lzkt3QkUzUK1VFm9fXkqoY-VRF0krswfsnOU8_sbtpuu8z9ZYsmbsPE-WIqb1z_RxqKd4NrTWKJlw0qPn4964XiI1TR_qf5ge2n7cuU_HhlsKdB5k_kBXe8WpH_f"
            alt="Admin"
            className="w-full h-full object-cover"
          />
        </div>
      </div> */}
    </header>
  );
}