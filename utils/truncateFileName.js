

export const truncateFileName = (fileName = '', limit = 25) => (
  fileName.length > limit 
    ? fileName.substring(limit) + '..'
    : fileName
)