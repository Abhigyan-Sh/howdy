export const isAdmin = ({ user, groupAdmin }) => 
  user._id == groupAdmin._id