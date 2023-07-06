import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromPlaylistsIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleRemoveFromPlaylists = (e) => {
    e.preventDefault();
    context.removeFromPlaylists(movie);
  };
  return (
    <IconButton
      aria-label="remove from playlists"
      onClick={handleRemoveFromPlaylists}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromPlaylistsIcon;
