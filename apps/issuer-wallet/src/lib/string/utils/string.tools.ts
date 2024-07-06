export function replaceLastOccurrence(
  prefix: string,
  searchValue: string,
  newValue: string
) {
  // Find the last occurrence of the search value
  const index = prefix.lastIndexOf(searchValue);

  // If the search value is not found, return the original string
  if (index === -1) {
    return prefix;
  }

  // Replace the last occurrence of the search value with the new value
  const newStr =
    prefix.substring(0, index) +
    newValue +
    prefix.substring(index + searchValue.length);

  return newStr;
}
