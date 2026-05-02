// Country image mapping - using images from public/countries folder
// Note: Egypt, Spain, Turkey, Morocco, and Palestine are excluded to keep their original images
export const countryImages: Record<string, string> = {
  // Available country images
  saudi: '/countries/saudi arabia.jpeg',
  korea: '/countries/korea.jpeg',
  syria: '/countries/seria.jpeg',
  usa: '/countries/usa.jpeg',
  greece: '/countries/greece.jpeg',
  iraq: '/countries/iraq (2).jpeg',
  lebanon: '/countries/lebanon.jpeg',
  libya: '/countries/Libya.jpeg',
  algeria: '/countries/aljeria (2).jpeg',
  france: '/countries/france.jpeg',
  germany: '/countries/german.jpeg',
  india: '/countries/india (2).jpeg',
  indonesia: '/countries/indonesia (2).jpeg',
  thailand: '/countries/Tailand.jpeg',
  'united-kingdom': '/countries/uk.jpeg',
};

export function getCountryImage(id: string, fallback: string): string {
  return countryImages[id] || fallback;
}
