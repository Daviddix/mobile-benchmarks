export function debounceSearch(
  searchQuery: string,
  searchFunction: Function,
  timeoutId: { current: number | null }
) {
  if (timeoutId.current) {
    clearTimeout(timeoutId.current);
  }

  timeoutId.current = window.setTimeout(() => {
    searchFunction(searchQuery);
  }, 300);
}
