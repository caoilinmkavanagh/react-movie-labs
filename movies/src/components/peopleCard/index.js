import { Link } from "react-router-dom";
import React, { useContext  } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import Avatar from '@mui/material/Avatar';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import Box from '@mui/material/Box';
export default function PeopleCard({ people, action }) {

  const { favorites, addToFavorites } = useContext(MoviesContext);

  if (favorites.find((id) => id === people.id)) {
    people.favorite = true;
  } else {
    people.favorite = false
  }

  /* const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(people);
  }; */

  return (
    <Card 
      sx={{ 
        maxWidth: 345,
        '&:hover': {
          backgroundColor: 'yellow',
        },
      }}
    >
            <CardHeader
        avatar={
          people.favorite ? (
            <Avatar sx={{ backgroundColor: 'red' }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {people.title}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={{ height: 500 }}
        image={
          people.poster_path
            ? `https://image.tmdb.org/t/p/w500/${people.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {people.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {people.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action(people)}
        <Link to={`/peoples/${people.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            Details
          </Button>
        </Link>
        <Link to={`/peoples/${people.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Like This
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
//reference article: https://stackoverflow.com/questions/76083741/how-to-override-hover-background-color-of-card-or-cardactionarea-using-styleover, https://mui.com/system/getting-started/the-sx-prop/,  https://mui.com/material-ui/react-toggle-button/, https://mui.com/material-ui/react-box/, 