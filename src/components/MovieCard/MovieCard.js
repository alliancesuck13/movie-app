/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { Rate } from "antd";
import { format } from "date-fns";

import cutOverview from "../../services/cutOverview";

import "./MovieCard.css";
import noImage from "./no-image.png";

class MovieCard extends React.Component {
  render() {
    const { movie, genres } = this.props;

    const src = movie.poster_path
      ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
      : noImage;

    const movieTitleAlt = `${movie.title} poster`;

    const movieRating = movie.vote_average === 10 ? "10" : movie.vote_average.toFixed(1);
    const movieReleaseDate = movie.release_date ? format(movie.release_date, "PP") : "";

    const movieGenres = movie.genre_ids.map((genreId) => {
      return genres.map((genre) => {
        if (genreId === genre.id) {
          return (
            <li key={genre.id} className="tags__item">
              {genre.name}
            </li>
          );
        }

        return undefined;
      });
    });

    return (
      <div className="movie-card">
        <div className="movie-poster">
          <img className="poster__img" src={src} alt={movieTitleAlt} />
        </div>
        <div className="movie-info">
          <div className="movie-header">
            <label className="movie-title">{movie.title}</label>
          </div>
          <label className="movie-rating">{movieRating}</label>
          <label className="movie-date">{movieReleaseDate}</label>
          <ul className="movie-tags">{movieGenres}</ul>
          <label className="movie-overview">{cutOverview(movie.overview)}</label>
          <Rate count={10} style={{ position: "absolute", bottom: 10, left: 0 }} />
        </div>
      </div>
    );
  }
}

export default MovieCard;
