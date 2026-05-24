import Icon from "./Icon";

export default function NoData({
  title = "No Data Available",
  description = "There is nothing to display right now.",
}) {
  return (
    <div className="w-full  flex items-center justify-center ">
      <div
        className="max-w-sm w-full rounded-3xl p-8 text-center border backdrop-blur-sm"
        style={{
          background:
            "linear-gradient(145deg, #ffffff, #f8fafc)",
          borderColor: "#e2e8f0",
          boxShadow:
            "0 10px 40px rgba(15,23,42,0.08)",
        }}
      >
        {/* Icon */}
        <div
          className="mx-auto mb-5 flex items-center justify-center rounded-2xl"
          style={{
            width: 72,
            height: 72,
            background:
              "linear-gradient(135deg, #eff6ff, #dbeafe)",
          }}
        >
          <Icon
            name="folder_open"
            size={34}
            color="#2563eb"
          />
        </div>

        {/* Title */}
        <h2
          className="text-xl font-bold mb-2"
          style={{
            color: "#0f172a",
            fontFamily: "Manrope",
          }}
        >
          {title}
        </h2>

        {/* Description */}
        <p
          className="text-sm leading-6"
          style={{
            color: "#64748b",
            fontFamily: "Inter",
          }}
        >
          {description}
        </p>

        {/* Decorative dots */}
        <div className="flex justify-center gap-2 mt-6">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "#93c5fd" }}
          />
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "#60a5fa" }}
          />
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "#2563eb" }}
          />
        </div>
      </div>
    </div>
  );
}