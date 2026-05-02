import { countries } from './countries';
import { recipes } from './recipes';

export interface CountryStats {
  countryId: string;
  countryName: string;
  recipeCount: number;
}

export function getCountryStats(): CountryStats[] {
  const countryMap = new Map<string, number>();
  
  // Count recipes per country
  recipes.forEach(recipe => {
    const count = countryMap.get(recipe.country) || 0;
    countryMap.set(recipe.country, count + 1);
  });
  
  // Create stats array with country names
  const stats: CountryStats[] = countries.map(country => ({
    countryId: country.id,
    countryName: country.nameEn,
    recipeCount: countryMap.get(country.id) || 0
  }));
  
  return stats;
}

export function getTotalRecipes(): number {
  return recipes.length;
}

export function getTotalCountries(): number {
  return countries.length;
}

export function getTopCountries(limit: number = 5): CountryStats[] {
  return getCountryStats()
    .sort((a, b) => b.recipeCount - a.recipeCount)
    .slice(0, limit);
}
