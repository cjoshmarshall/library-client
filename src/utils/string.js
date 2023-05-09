export function capitalizeFirstLetter(str) {
  const firstLetter = str.slice(0, 1).toUpperCase();
  const restLetters = str.slice(1, str.length);
  return firstLetter + restLetters;
}
