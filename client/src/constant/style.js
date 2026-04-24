const fonts = [
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@600;700;800&display=swap",
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap",
];
fonts.forEach(href => {
  const link = document.createElement("link");
  link.rel  = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
});

// styles.js  (no @import needed — fonts already loaded above)
export const customStyles = `
  body { font-family: 'Inter', sans-serif; }

  .material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-size: 24px; line-height: 1;
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    display: inline-block; white-space: nowrap;
  }
  .icon-filled { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }

  .glass-panel {
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(195,198,215,0.15);
  }
  .primary-gradient {
    background: linear-gradient(135deg, #004ac6 0%, #2563eb 100%);
  }
`;
export const colors = {
  primary: "#004ac6",
  primaryContainer: "#2563eb",
  onPrimaryFixed: "#00174b",
  onPrimaryFixedVariant: "#003ea8",
  primaryFixed: "#dbe1ff",
  secondary: "#495c95",
  secondaryFixed: "#dbe1ff",
  tertiary: "#943700",
  tertiaryContainer: "#bc4800",
  tertiaryFixed: "#ffdbcd",
  surface: "#f7f9fb",
  surfaceContainerLow: "#f2f4f6",
  surfaceContainerLowest: "#ffffff",
  surfaceContainerHigh: "#e6e8ea",
  surfaceContainerHighest: "#e0e3e5",
  onSurface: "#191c1e",
  onSurfaceVariant: "#434655",
  outlineVariant: "#c3c6d7",
  onPrimaryContainer: "#eeefff",
};
