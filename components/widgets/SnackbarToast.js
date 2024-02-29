import React from 'react'
import { Snackbar, Alert, IconButton } from '@mui/material'
import { IoMdClose } from 'react-icons/io'

const action_1 = (onClose) => (
  <React.Fragment>
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={onClose}
    >
      <IoMdClose style={{ fontSize: '24px' }} />
    </IconButton>
  </React.Fragment>
)

const SnackbarToast = ( { 
    key, 
    message, 
    open, 
    onClose, 
    delay, 
    vertical, 
    horizontal, 
    severity, 
    variant, 
    sx, 
    actionNumber
}) => {
  return (
    <Snackbar
      key={key}
      // message="Please Select an Image!"
      open={open}
      onClose={onClose}
      autoHideDuration={delay}
      anchorOrigin={{ vertical, horizontal }}
      action={
        actionNumber == 1 && action_1(onClose) }
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant={variant}
        sx={sx}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

const setToastVisible = ({ _message, _severity, setMessage, setSeverity, onOpen }) => {
  setMessage(_message)
  setSeverity(_severity)
  onOpen(true)
}

export { setToastVisible }
export default SnackbarToast