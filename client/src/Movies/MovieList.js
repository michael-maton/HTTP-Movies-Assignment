import React from "react";
import { Link, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList(props) {
  const { push } = useHistory();
  const handleAddClick = () => {
    push("/add-movie/");
  };

  return (
    <div className="movie-list">
      <div onClick={handleAddClick} className="add-button">
        Add Movie
      </div>
      {props.movies.map((movie) => (
        <Link key={movie.id} to={`/movies/${movie.id}`}>
          <MovieCard movie={movie} />
        </Link>
      ))}

    </div>
  );
}

export default MovieList;
