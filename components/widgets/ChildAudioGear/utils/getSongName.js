export const getSongNameFromUrl = (url) => {
  const pieces = url.split('/')

  const fileName = pieces[pieces.length - 1]
  // replacing any underscores (_) with spaces
  return fileName.replace(/_/g, ' ')
}