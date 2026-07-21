export const isCountryUk = (value: string | undefined): boolean => {
  const ukTerms = ['uk', 'unitedkingdom', 'u.k', 'u.k.'];
  const country = value || '';

  return ukTerms.includes(country.replace(' ', '').toLowerCase());
};
