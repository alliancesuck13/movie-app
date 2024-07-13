/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { Rate } from "antd";
import { format } from "date-fns";

import cutOverview from "../../services/cutOverview";
import "./MovieCard.css";

class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    const src = movie.poster_path
      ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJRS-4chjWMRAmrtz7ivK53K_uygrgjzw9Uw&s";
    const movieTitleAlt = `${movie.title} poster`;
    return (
      <div className="movie-card">
        <div className="movie-poster">
          <img className="poster__img" src={src} alt={movieTitleAlt} />
        </div>
        <div className="movie-info">
          <div className="movie-header">
            <label className="movie-title">{movie.title}</label>
          </div>
          <label className="movie-rating">{movie.vote_average.toFixed(1)}</label>
          <label className="movie-date">
            {movie.release_date ? format(movie.release_date, "PP") : ""}
          </label>
          <ul className="movie-tags">
            <li key={movie.genre_ids[0]} className="tags__item">
              {movie.genre_ids[0]}
            </li>
            <li key={movie.genre_ids[1]} className="tags__item">
              {movie.genre_ids[1]}
            </li>
          </ul>
          <label className="movie-overview">{cutOverview(movie.overview)}</label>
          <Rate
            count={10}
            style={{ position: "absolute", bottom: 10, left: 0 }}
            defaultValue={movie.vote_average.toFixed()}
          />
        </div>
      </div>
    );
  }
}

export default MovieCard;
