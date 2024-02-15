export const extractIds = (usersArray) => {
  return usersArray.map(user => user._id)
}