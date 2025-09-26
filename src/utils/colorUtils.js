export function getContrastingColor(hexColor) {
  if (!hexColor || typeof hexColor !== "string") {
    return "#111111";
  }
  const normalized = hexColor.trim().replace(/^#/, "");
  if (![3, 6].includes(normalized.length)) {
    return "#111111";
  }
  const full =
    normalized.length === 3
      ? normalized
          .split("")
          .map((c) => c + c)
          .join("")
      : normalized;
  const r = parseInt(full.substring(0, 2), 16);
  const g = parseInt(full.substring(2, 4), 16);
  const b = parseInt(full.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#111111" : "#ffffff";
}
