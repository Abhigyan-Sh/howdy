const computeFileSize = fileSize => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let index = 0
  
  while (fileSize >= 1024 && index < units.length - 1) {
    fileSize /= 1024
    index++
  }
  
  return `${fileSize.toFixed(2)} ${units[index]}`
}

const getFileFormat = filename => {
  const pieces = filename.split('.')
  if (pieces.length === 1 || (pieces[0] === '' && pieces.length === 2)) {
    return ''
  }
  return pieces[pieces.length - 1]
}

const validVideoFormats = ['mp4', 'mpeg', 'quicktime']
const validImageFormats = ['jpg', 'jpeg', 'png']
const validAudioFormats = ['mp3', 'wav', 'aac', 'mpeg']

const isValidMediaType = _media => {
  return (
    validVideoFormats.includes(_media.type.split('/')[1]) 
    || validImageFormats.includes(_media.type.split('/')[1]) 
    || validAudioFormats.includes(_media.type.split('/')[1])
  )
}

export { 
  computeFileSize, 
  getFileFormat, 
  isValidMediaType, 
  validVideoFormats, 
  validImageFormats, 
  validAudioFormats 
}