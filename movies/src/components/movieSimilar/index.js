import React from "react";

const MovieSimilar =  ({ similar }) => {
  return (
    <>
      <p>Similar By: {similar.author} </p>
      <p>{similar.content} </p>
    </>
  );
};
export default MovieSimilar
