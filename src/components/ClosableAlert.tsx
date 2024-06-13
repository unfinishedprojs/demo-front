import Alert from '@suid/material/Alert';
import IconButton from '@suid/material/IconButton';
import CloseIcon from '@suid/icons-material/Close';

const ClosableAlert = (props) => {
  const handleClose = () => {
    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <>
      {props.open && (
        <Alert
          severity={props.severity || 'info'}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {props.children}
        </Alert>
      )}
    </>
  );
};

export default ClosableAlert;