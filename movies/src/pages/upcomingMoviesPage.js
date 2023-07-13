import React, { useState } from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import Fab from '@mui/material/Fab';
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylists'
import NavigationIcon from '@mui/icons-material/Navigation';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Tooltip from '@mui/material/Tooltip';

const UpcomingMoviesPage = (props) => {

  const [page, setPage] = useState(1);  // Add a new state variable for the current page.

  const fetchMovies = () => getUpcomingMovies(page);
  
  const { data, error, isLoading, isError } = useQuery(['upcomingMovies', page], fetchMovies, {
    // staleTime: 0,
  });

  const nextPage = () => {
    setPage((old) => old + 1);
  };

  const previousPage = () => {
    setPage((old) => Math.max(old - 1, 1));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  

  /* const {  data, error, isLoading, isError }  = useQuery('discover', getUpcomingMovies) */
  //const { data, error, isLoading, isError } = useQuery('upcomingMovies', getUpcomingMovies, {
   // staleTime: 0,
 //});

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
    <>
      <PageTemplate
        title="Upcoming Movies"
        movies={movies}
        action={(movie) => {
          return <AddToPlaylistIcon movie={movie} />;
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
      <Tooltip title="Back">
      <Fab color="primary" aria-label="Minus" onClick={previousPage} disabled={movies.length === 0} >
        <RemoveIcon />
      </Fab>
      </Tooltip>
        <span> <Tooltip title="Back"><Fab variant="extended" onClick={scrollToTop}>
      <NavigationIcon sx={{ mr: 1 }} />
      Navigate
    </Fab>
    </Tooltip></span>
    <Tooltip title="Scroll to Top">
        <Fab color="primary" aria-label="add" onClick={nextPage}
          disabled={movies.length === 0} >
        <AddIcon />
      </Fab>
      </Tooltip>
      </div>
    </>
  );
  };  
/* 
  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />
      }}

    />
    
);
}; */
export default UpcomingMoviesPage;

//reference pagination articles: https://medium.com/@ryanfarney/the-moviedb-data-pagination-a48a040f1e90, https://www.youtube.com/watch?v=RwrkokvWys0
//reference scroll articles: https://stackblitz.com/run?file=demo.tsx, https://stackoverflow.com/questions/4210798/how-to-scroll-to-top-of-page-with-javascript-jquery