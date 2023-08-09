import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromPlaylists from "../components/cardIcons/removeFromPlaylists";
import WriteReview from "../components/cardIcons/writeReview";

const PlaylistMoviesPage = () => {
  const {playlists: movieIds } = useContext(MoviesContext);

  const playlistMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );
  const isLoading = playlistMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = playlistMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  //const toDo = () => true;

  return (
    <PageTemplate
      title="Playlist Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromPlaylists movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
};

export default PlaylistMoviesPage;
