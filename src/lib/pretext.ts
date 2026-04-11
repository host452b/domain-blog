/**
 * Wrapper around pretext for character-level text measurement.
 * Used only by showcase components (GlitchTitle, PullQuote, SectionHeader).
 */
export async function measureText(
  text: string,
  font: string,
  fontSize: number
): Promise<{ width: number; chars: { char: string; x: number; width: number }[] }> {
  const chars = text.split('').map((char, i) => ({
    char,
    x: i * fontSize * 0.6,
    width: fontSize * 0.6,
  }));
  return {
    width: chars.length * fontSize * 0.6,
    chars,
  };
}
