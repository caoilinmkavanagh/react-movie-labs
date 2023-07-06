import React from "react";
import { getTopRatedMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylists'

const TopRatedPage = (props) => {

  /* const {  data, error, isLoading, isError }  = useQuery('discover', getUpcomingMovies) */
  const { data, error, isLoading, isError } = useQuery('topRatedMovies', getTopRatedMovies, {
   // staleTime: 0,
  });

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const playlists = movies.filter(m => m.playlist)
  localStorage.setItem('playlists', JSON.stringify(playlists))
  const addToPlaylists = (movieId) => true 

  return (
    <PageTemplate
      title="Top Rated Movies"
      movies={movies}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />
      }}
    />
);
};
export default TopRatedPage;
