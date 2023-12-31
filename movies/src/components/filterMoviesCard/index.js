import React, { useState } from "react";
/* import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography"; */
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
//import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner';
import { getLanguages } from "../../api/tmdb-api";
import Button from '@mui/material/Button';

const formControl = 
  {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)"
  };

export default function FilterMoviesCard(props) {

/*   const { data, error, isLoading, isError } = useQuery("genres", getGenres);
  const [selectedGenre, setSelectedGenre] = useState("0"); */

 /*  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const genres = data.genres;
  if (genres[0].name !== "All"){
    genres.unshift({ id: "0", name: "All" });
  }
   */

 /*  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); 
  }; */

  const { data: genresData, error: genresError, isLoading: genresLoading, isError: genresIsError } = useQuery("genres", getGenres);
  const { data: languagesData, isLoading: languagesLoading, isError: languagesIsError, error: languagesError } = useQuery("languages", getLanguages); // Updated

  const [selectedGenre, setSelectedGenre] = useState("0");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  if (genresLoading || languagesLoading) {
    return <Spinner />;
  }

  if (genresIsError || languagesIsError) {
    return <h1>{genresError?.message || languagesError?.message}</h1>;
  }

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value); // NEW
    props.onUserInput("language", e.target.value); // NEW
  };
  
  const genres = genresData.genres;
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    if (type === "genre") {
      setSelectedGenre(value);
    }
    props.onUserInput(type, value);
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

/*   const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  }; */



  return (
    <div>
      <TextField
        sx={{ ...formControl, marginTop: '10px' }}
        id="filled-search"
        label="Search field"
        type="search"
        variant="filled"
        value={props.titleFilter}
        onChange={handleTextChange}
      />
      
      <div style={{ marginTop: '20px' }}>
        {genres.map((genre) => (
          <Button
            key={genre.id}
            variant={selectedGenre === genre.id ? "contained" : "outlined"}
            onClick={(e) => handleChange(e, "genre", genre.id)}
            style={{ marginRight: '10px', marginBottom: '10px' }}
          >
            {genre.name}
          </Button>
        ))}
      </div>
      {languagesData && ( 
        <div style={{ marginTop: "20px" }}>
          <FormControl sx={{ ...formControl }}>
            <InputLabel id="select-language-label">Language</InputLabel>
            <Select
              labelId="select-language-label"
              id="select-language"
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              {languagesData.map((language) => (
                <MenuItem key={language.iso_639_1} value={language.iso_639_1}>
                  {language.english_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}
    </div>
    
  );  
}
