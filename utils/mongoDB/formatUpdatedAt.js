/* returns type: string, hours:minutes:seconds
description: calculates the value of updatedAt or createdAt (returned 
  form mongoDB) in hours:minutes:seconds */
export const formatUpdatedAt = (updatedAt) => {
  const date = new Date(updatedAt)
  const hours = date.getHours()
  const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
  const seconds = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds()
  return `${hours}:${minutes}:${seconds}`
}