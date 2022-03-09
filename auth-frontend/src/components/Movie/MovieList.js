import React from "react";
import { Link } from "react-router-dom";
import "./MovieList.css";

function MovieList(props) {
  return props.movieArray.map((item) => {
    return (
      <div className="movielist__div" key={item.imdbID}>
        <Link
          style={{
            textDecoration: "none",
            color: "black",
            fontFamily: "monospace",
          }}
          to={{
            pathname: `/movie-detail/${item.Title}`,
            search: `?t=${item.Title}`,
          }}
        >
          <div className="movielist__img__div">
            <img className="movie__img" src={item.Poster} alt={item.Title} />
          </div>
          <div className="movie__title">
            Title: {item.Title}
            Year: {item.Year}
          </div>
        </Link>
      </div>
    );
  });
}

export default MovieList;
