import React, { useState, useEffect } from "react";
import { getTopRatedMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylists'
import Pagination from "../components/pagination";

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

/* import React, { useState, useEffect } from "react";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylists';
import Pagination from "../components/pagination";
import PageTemplate from '../components/templateMovieListPage';
import { getTopRatedMovies } from "../api/tmdb-api";

const TopRatedPage = (props) => {
  const [page, setPage] = useState(1); // Initialized page state

  // Included page in useQuery
  const { data, error, isLoading, isError } = useQuery(['topRatedMovies', page], () => getTopRatedMovies(page), {
    // staleTime: 0,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }

  const movies = data.results;
  const playlists = movies.filter(m => m.playlist);
  localStorage.setItem('playlists', JSON.stringify(playlists));
  const addToPlaylists = (movieId) => true;

  return (
    <>
      <PageTemplate
        title="Top Rated Movies"
        movies={movies}
        action={(movie) => {
          return <AddToPlaylistIcon movie={movie} />
        }}
      />
      <Pagination page={page} setPage={setPage} />
    </>
  );
};

export default TopRatedPage; */
