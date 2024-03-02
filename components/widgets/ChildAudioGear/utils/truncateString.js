export const truncateString = (str, limit) => (
  str.length > limit 
  ? str.slice(0, limit) + '...' 
  : str
)