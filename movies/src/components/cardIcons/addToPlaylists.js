import React, { useState, useContext  } from "react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';

const AddToPlaylistIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToPlaylist = (e) => {
    e.preventDefault();
    context.addToPlaylist(movie);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <div>
      <IconButton aria-label="add to Playlist" onClick={handleAddToPlaylist}>
        <PlaylistAddIcon color="primary" fontSize="large" />
      </IconButton>
      
      <Box sx={{
          position: 'fixed', 
          bottom: '20px', 
          left: '50%', 
          transform: 'translateX(-50%)',
          zIndex: 'modal' 
      }}>
        <Collapse in={showSuccess}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setShowSuccess(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>Success</AlertTitle>
            This is a success alert — <strong>Look At WatchList</strong>
          </Alert>
        </Collapse>
      </Box>
    </div>
  );
};
export default AddToPlaylistIcon;

//reference: button success; https://mui.com/material-ui/react-alert/, https://stackblitz.com/run?file=demo.tsx
// reference: timeout - https://felixgerschau.com/react-hooks-settimeout/#:~:text=Conclusion-,How%20to%20use%20setTimeout%20in%20React,log('Initial%20timeout!'
