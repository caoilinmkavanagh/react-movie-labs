import { auth, googleProvider } from "./config/firebase";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
//import { Snackbar, SnackbarContent } from '@mui/material';
import { Snackbar, SnackbarContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@mui/material';

export const Auth = ({ open: isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  //const [open, setOpen] = useState(false);


  const navigate = useNavigate(); 
    console.log(auth?.currentUser?.email);


  const handleSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };
/* 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }; */

/*     const handleSnackbar = (message) => {
      setSnackbarMessage(message);
      setSnackbarOpen(true);
    };
  
    const closeSnackbar = () => {
      setSnackbarOpen(false);
    }; */
  
    const signIn = async () => {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        handleSnackbar('You are logged in!'); 
        onClose();
        setTimeout(() => {
          navigate('/');
        }, 2000); 
      } catch (err) {
        console.error(err);
        handleSnackbar('Error logging in. Please try again.');
      }
    };

    const logOut = async () => {
      try {
        await signOut(auth);
        handleSnackbar('You have been logged out!'); 
        setTimeout(() => {
          navigate('/'); 
        }, 6000); 
      } catch (err) {
        console.error(err);
        handleSnackbar('Error logging out. Please try again.'); 
      }
    };
    
  
    const signInWithGoogle = async () => {
      try {
        await signInWithPopup(auth, googleProvider);
        handleSnackbar('You are logged in with Google!'); 
        onClose();
        setTimeout(() => {
          navigate('/');
        }, 2000); 
      } catch (err) {
        console.error(err);
        handleSnackbar('Error logging in with Google. Please try again.'); 
      }
    };
  return (
    <div>
    <Dialog open={isOpen} onClose={onClose}> 
      <DialogTitle>Authentication</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter your email and password to sign in.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button> 
        <Button onClick={signIn}>Signin</Button>
        <Button onClick={signInWithGoogle}>Signin with Google</Button>
        <Button onClick={logOut}>Logout</Button>
      </DialogActions>
    </Dialog>
    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={closeSnackbar}>
      <SnackbarContent message={snackbarMessage} />
    </Snackbar>
  </div>
  );
}; 

export default Auth;