/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { Rate } from "antd";
import { format } from "date-fns";

import cutOverview from "../../services/cutOverview";

import "./MovieCard.css";
import noImage from "./no-image.png";

class MovieCard extends React.Component {
  static defaultProps = {
    isRated: false,
  };

  render() {
    const { movie, genres, rating, isRated, onChangeRating } = this.props;

    const src = movie.poster_path
      ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
      : noImage;

    const movieTitleAlt = `${movie.title} poster`;

    const movieRating = movie.vote_average === 10 ? "10" : movie.vote_average.toFixed(1);
    const movieReleaseDate = movie.release_date ? format(movie.release_date, "PP") : "";

    let rateCountStyle = {};
    if (movieRating <= 3) rateCountStyle = { borderColor: "#E90000" };
    if (movieRating >= 3 && movieRating <= 5) rateCountStyle = { borderColor: "#E97E00" };
    if (movieRating >= 5 && movieRating <= 7) rateCountStyle = { borderColor: "#E9D100" };
    if (movieRating > 7) rateCountStyle = { borderColor: "#66E900" };

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
          <label className="movie-rating" style={rateCountStyle}>
            {movieRating}
          </label>
          <label className="movie-date">{movieReleaseDate}</label>
          <ul className="movie-tags">{movieGenres}</ul>
          <label className="movie-overview">{cutOverview(movie.overview)}</label>
          {isRated ? (
            <Rate
              count={10}
              defaultValue={rating}
              disabled
              style={{ position: "absolute", bottom: 10, left: 0 }}
            />
          ) : (
            <Rate
              onChange={onChangeRating}
              allowClear={false}
              count={10}
              style={{ position: "absolute", bottom: 10, left: 0 }}
            />
          )}
        </div>
      </div>
    );
  }
}

export default MovieCard;
