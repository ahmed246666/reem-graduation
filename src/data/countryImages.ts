// Country image mapping
import egyptImg from '@/assets/countries/egypt.jpg';
import turkeyImg from '@/assets/countries/turkey.jpg';
import saudiImg from '@/assets/countries/saudi.jpg';
import moroccoImg from '@/assets/countries/morocco.jpg';
import italyImg from '@/assets/countries/italy.jpg';
import koreaImg from '@/assets/countries/korea.jpg';
import ukImg from '@/assets/countries/uk.jpg';
import syriaImg from '@/assets/countries/syria.jpg';
import palestineImg from '@/assets/countries/palestine.jpg';
import usaImg from '@/assets/countries/usa.jpg';

export const countryImages: Record<string, string> = {
  egypt: egyptImg,
  turkey: turkeyImg,
  saudi: saudiImg,
  morocco: moroccoImg,
  italy: italyImg,
  korea: koreaImg,
  uk: ukImg,
  syria: syriaImg,
  palestine: palestineImg,
  usa: usaImg,
};

export function getCountryImage(id: string, fallback: string): string {
  return countryImages[id] || fallback;
}
