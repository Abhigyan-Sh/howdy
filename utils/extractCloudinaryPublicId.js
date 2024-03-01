

export const extractCloudinaryPublicId = (url) => {
  /* sample video url: 
  http://res.cloudinary.com/${cloudName}/video/upload/v1709144539/videos/d8wwpvedfyjpvn1dhi4q.mp4 */
  const pieces = url.split('/')
  return [pieces[6], pieces[7], pieces[8]].join('/')
}