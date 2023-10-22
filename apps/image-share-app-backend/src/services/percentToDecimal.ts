export function percentToDecimal(percent: string) {
  if (percent === '???' || !percent.includes('%')) {
    return 0;
  }

  const parsed = parseFloat(percent);

  if (!Number.isNaN(parsed)) {
    return parseFloat(percent) / 100;
  }

  return 0;
}
