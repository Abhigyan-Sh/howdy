import { setToastVisible }  from '../components/widgets/SnackbarToast'

export const searchUser = ({ 
  user, 
  search, 
  setMessage, 
  setSeverity, 
  onToastClose, 
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
        setToastVisible({
          _message: "Unauthorized Request: " + response.message, 
          _severity: "error", 
          setMessage: setMessage, 
          setSeverity: setSeverity, 
          onOpen: onToastClose
        })
      } else if (response.statusCode === 200) {
        setSearchResult(response.users)
      }
      setLoading(false)
    })
    .catch(error => {
      setToastVisible({
        _message: "Error Occurred! " + error.message, 
        _severity: "error", 
        setMessage: setMessage, 
        setSeverity: setSeverity, 
        onOpen: onToastClose
      })
      setLoading(false)
    })
}