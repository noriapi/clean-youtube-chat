const getHashOfString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);
  return hash;
};

const normalizeHash = (hash: number, min: number, max: number) => {
  return Math.floor((hash % (max - min)) + min);
};

export type HSL = [number, number, number];

export type HSLRange = {
  h: [number, number];
  s: [number, number];
  l: [number, number];
};

export const generateHSL = (name: string, range: HSLRange): HSL => {
  const hash = getHashOfString(name);
  const h = normalizeHash(hash, range.h[0], range.h[1]);
  const s = normalizeHash(hash, range.s[0], range.s[1]);
  const l = normalizeHash(hash, range.l[0], range.l[1]);
  return [h, s, l];
};

export const HSLtoString = (hsl: HSL) => {
  return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
};
