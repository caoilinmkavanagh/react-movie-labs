import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import MovieReviewPage from "./pages/movieReviewPage";
import React from "react";
//import ReactDOM from "react-dom";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import SearchPage from "./pages/searchPage";
import PlaylistMoviesPage from "./pages/playlistMoviesPage";
import TopRatedPage from "./pages/topRatedPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage"
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import { createRoot } from "react-dom/client";
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import PopularPeoplePage from "./pages/popularPeoplePage";
import PersonDetailPage from "./pages/personDetailPage";
import { Auth } from './auth';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
        <Routes>
        <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
        <Route path="/movies/:id/recommendations" element={ <MovieReviewPage /> } />
        <Route path="/login" element={ <Auth /> } />
        <Route path="/person/people" element={ <PopularPeoplePage /> } />
        <Route path="/person/people/:id" element={ <PersonDetailPage /> } />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
        <Route path="/movies/toprated" element={<TopRatedPage />} />
        <Route path="/movies/playlists" element={<PlaylistMoviesPage />} />
        <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={ <Navigate to="/" /> } />
        </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot( document.getElementById("root") )
initializeApp(firebaseConfig);
//initializeApp(firebaseConfig);
rootElement.render(<App />);

