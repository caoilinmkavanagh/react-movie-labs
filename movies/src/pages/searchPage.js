/* // src/SearchPage.js
import React, { useState } from "react";
import PageTemplate from '../components/templateMovieListPage';
import Spinner from '../components/spinner';
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylists';
import { fetchSearch } from "../api/tmdb-api";

const SearchPage = () => {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const Search = () => {
    setIsLoading(true);
    fetchSearch(searchText, page)
      .then(results => {
        setContent(results);
        setIsLoading(false);
      });
  };

  const Trigger = (e) => {
    setSearchText(e.target.value);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="container">
        <div className="row pt-3 mb-5 pb-5">
          <div className="col-12 pt-5 pb-3 mt-5 d-flex justify-content-center align-items-center">
            <input
              type="text"
              placeholder="search..."
              onChange={Trigger}
              className="form-control-lg col-6 search bg-dark text-white border border-0"
            />
            <button
              className="btn btn-primary text-white mx-2 col-md-1 col-sm-2 py-2"
              onClick={Search}
            >
              <i className="fas fa-search"></i>
            </button>
          </div>

          <PageTemplate
            title="Search Results"
            movies={content}
            action={(movie) => {
              return <AddToPlaylistIcon movie={movie} />;
            }}
          />
          
        </div>
      </div>
    </>
  );
};

export default SearchPage; */


//referecnes: https://github.com/Ateevduggal/The-Movie-Central/tree/master/src