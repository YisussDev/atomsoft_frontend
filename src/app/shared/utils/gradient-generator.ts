export function GenerateGradient(baseColor: string): string {
  // Asegura que el color tenga formato correcto
  const cleanColor = baseColor.startsWith('#') ? baseColor : `#${baseColor}`;

  // Crea dos tonos del mismo color
  const color1 = lightenColor(cleanColor, 20);
  const color2 = darkenColor(cleanColor, 20);

  return `linear-gradient(-45deg, ${color1}, ${color2})`;
}

// Helpers
function lightenColor(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const r = Math.min(255, (num >> 16) + (255 * percent) / 100);
  const g = Math.min(255, ((num >> 8) & 0x00FF) + (255 * percent) / 100);
  const b = Math.min(255, (num & 0x0000FF) + (255 * percent) / 100);
  return `#${(Math.round(r) << 16 | Math.round(g) << 8 | Math.round(b)).toString(16).padStart(6, '0')}`;
}

function darkenColor(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const r = Math.max(0, (num >> 16) - (255 * percent) / 100);
  const g = Math.max(0, ((num >> 8) & 0x00FF) - (255 * percent) / 100);
  const b = Math.max(0, (num & 0x0000FF) - (255 * percent) / 100);
  return `#${(Math.round(r) << 16 | Math.round(g) << 8 | Math.round(b)).toString(16).padStart(6, '0')}`;
}
