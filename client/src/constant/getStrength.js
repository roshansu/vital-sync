import { colors } from "./style";

export default function getStrength(pw) {
  if (!pw) return { score: 0, label: "", hint: "", color: colors.surfaceContainerHigh };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map = [
    { label: "Too short",   hint: "Use at least 8 characters", color: colors.tertiary },
    { label: "Weak",        hint: "Add uppercase letters",     color: colors.tertiary },
    { label: "Moderate",    hint: "Add a special character",   color: "#d97706"       },
    { label: "Strong",      hint: "Looking good!",             color: "#16a34a"       },
    { label: "Very strong", hint: "Excellent password!",       color: "#15803d"       },
  ];
  return { score, ...map[score] };
}