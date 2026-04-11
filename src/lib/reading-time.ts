export function readingTime(text: string): string {
  // CJK characters: ~300 chars/min
  // Latin words: ~200 words/min
  const cjkChars = (text.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g) || []).length;
  const latinWords = text
    .replace(/[\u4e00-\u9fff\u3400-\u4dbf]/g, '')
    .split(/\s+/)
    .filter(Boolean).length;

  const minutes = Math.ceil(cjkChars / 300 + latinWords / 200);
  return `${Math.max(1, minutes)} min`;
}
