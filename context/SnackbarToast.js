import React, { useState, useContext, createContext } from 'react'
import { Snackbar, Alert, IconButton } from '@mui/material'
import { IoMdClose } from 'react-icons/io'

const SnackbarContext = createContext()

const SnackbarProvider = ({ children }) => {
  const [ toastConfig, setToastConfig ] = useState(null)

  const handleClose = () => {
    setToastConfig(null)
  }

  const showSnackbar = ({
    key, 
    message, 
    delay=5000, 
    vertical="bottom", 
    horizontal="center", 
    severity, 
    variant="filled", 
    sx={ width: '100%' }, 
    actionNumber=1
  }) => {
    setToastConfig({ 
      key, 
      message, 
      delay, 
      vertical, 
      horizontal, 
      severity, 
      variant, 
      sx, 
      actionNumber 
    })
  }

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {toastConfig && (
        <SnackbarToast 
          {...toastConfig} 
          open={toastConfig ? true : false}
          onClose={handleClose} />
      )}
    </SnackbarContext.Provider>
  )
}

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
    delay=5000, 
    vertical="bottom", 
    horizontal="center", 
    severity, 
    variant="filled", 
    sx={ width: '100%' }, 
    actionNumber=1
}) => {
  return (
    <Snackbar
      key={key}
      // message='please select an Image!'
      open={open}
      onClose={onClose}
      autoHideDuration={delay}
      anchorOrigin={{ vertical, horizontal }}
      action={ actionNumber == 1 && action_1(onClose) }
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

export const useSnackbar = () => (
  useContext(SnackbarContext)
)
export default SnackbarProvider