export const getTimeFormat = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = Math.floor(totalSeconds % 60)
  
    const hoursStr = hours > 0 ? hours.toString().padStart(2, '0') + ':' : ''
    const minutesStr = minutes.toString().padStart(2, '0') + ':'
    const secondsStr = seconds.toString().padStart(2, '0')
  
    return hoursStr + minutesStr + secondsStr
}