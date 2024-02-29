export const searchUser = ({ 
  user, 
  search, 
  showSnackbar, 
  setSearchResult, 
  setLoading 
}) => {
  /* @dev:: searchUser being a utility function has been made such that it doesn't render 
  out anything but as hooks can only be used inside functional components which render 
  out something and searchUser doesn't render out anything hence, user needs to be taken 
  from parameters rather than hook.
  const { user } = chatState() */

  if(search == '') {
    setLoading(false)
    setSearchResult([])
    return
  }

  fetch(`/api/user/${search}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
  .then(data => data.json())
  .then(response => {
    if (response.status === 401) {
      showSnackbar({
        message: "Unauthorized Request: " + response.message, 
        severity: "error", 
      })
    } else if (response.statusCode === 200) {
      setSearchResult(response.users)
    }
    setLoading(false)
  })
  .catch(error => {
    showSnackbar({
      message: "Error Occurred! " + error.message, 
      severity: "error", 
    })
    setLoading(false)
  })
}