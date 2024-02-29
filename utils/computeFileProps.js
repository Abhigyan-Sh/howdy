const computeFileSize = (fileSize) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let index = 0
  
  while (fileSize >= 1024 && index < units.length - 1) {
    fileSize /= 1024
    index++
  }
  
  return `${fileSize.toFixed(2)} ${units[index]}`
}

const getFileFormat = (filename) => {
  const pieces = filename.split('.')
  if (pieces.length === 1 || (pieces[0] === '' && pieces.length === 2)) {
    return ''
  }
  return pieces[pieces.length - 1]
}

export { computeFileSize, getFileFormat }