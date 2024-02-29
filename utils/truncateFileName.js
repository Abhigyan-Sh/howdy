

export const truncateFileName = (fileName, limit) => (
  fileName.length > limit 
    ? fileName.substring(limit) + '..'
    : fileName
)