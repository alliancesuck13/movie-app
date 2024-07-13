/* eslint-disable no-unreachable-loop */
/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { Tabs, Flex, Input, Pagination, Rate } from "antd";

import "./MovieApp.css";

class MovieApp extends React.Component {
  render() {
    const items = [
      {
        key: "1",
        label: "Search",
      },
      {
        key: "2",
        label: "Rated",
      },
    ];

    const movie = {
      adult: false,
      backdrop_path: "/hziiv14OpD73u9gAak4XDDfBKa2.jpg",
      belongs_to_collection: {
        id: 1241,
        name: "Harry Potter Collection",
        poster_path: "/eVPs2Y0LyvTLZn6AP5Z6O2rtiGB.jpg",
        backdrop_path: "/xN6SBJVG8jqqKQrgxthn3J2m49S.jpg",
      },
      budget: 125000000,
      genres: [
        {
          id: 12,
          name: "Adventure",
        },
        {
          id: 14,
          name: "Fantasy",
        },
      ],
      homepage: "https://www.warnerbros.com/movies/harry-potter-and-sorcerers-stone/",
      id: 671,
      imdb_id: "tt0241527",
      origin_country: ["GB"],
      original_language: "en",
      original_title: "Harry Potter and the Philosopher's Stone",
      overview:
        "Harry Potter has lived under the stairs at his aunt and uncle's house his whole life. But on his 11th birthday, he learns he's a powerful wizard—with a place waiting for him at the Hogwarts School of Witchcraft and Wizardry. As he learns to harness his newfound powers with the help of the school's kindly headmaster, Harry uncovers the truth about his parents' deaths—and about the villain who's to blame.",
      popularity: 175.291,
      poster_path: "/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg",
      production_companies: [
        {
          id: 174,
          logo_path: "/zhD3hhtKB5qyv7ZeL4uLpNxgMVU.png",
          name: "Warner Bros. Pictures",
          origin_country: "US",
        },
        {
          id: 437,
          logo_path: "/nu20mtwbEIhUNnQ5NXVhHsNknZj.png",
          name: "Heyday Films",
          origin_country: "GB",
        },
        {
          id: 436,
          logo_path: "/A7WCkG3F0NFvjGCwUnclpGdIu9E.png",
          name: "1492 Pictures",
          origin_country: "US",
        },
      ],
      production_countries: [
        {
          iso_3166_1: "GB",
          name: "United Kingdom",
        },
        {
          iso_3166_1: "US",
          name: "United States of America",
        },
      ],
      release_date: "2001-11-16",
      revenue: 976475550,
      runtime: 152,
      spoken_languages: [
        {
          english_name: "English",
          iso_639_1: "en",
          name: "English",
        },
      ],
      status: "Released",
      tagline: "Let the magic begin.",
      title: "Harry Potter and the Philosopher's Stone",
      video: false,
      vote_average: 7.913,
      vote_count: 26750,
    };

    const src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

    function cutOverview(overview = "") {
      return `${overview
        .split(" ")
        .filter((word, index) => {
          while (index < 42) return word;
          return "";
        })
        .join(" ")} ... `;
    }

    return (
      <div className="movie-app">
        <header>
          <Flex justify="center">
            <nav>
              <Tabs defaultActiveKey="1" items={items} />
            </nav>
          </Flex>
          <Input placeholder="Search movie" />
        </header>
        <main className="main">
          <div className="main-wrapper">
            <div className="movie-card">
              <div className="movie-poster">
                <img className="poster__img" src={src} alt="Movie poster" />
              </div>
              <div className="movie-info">
                <div className="movie-header">
                  <label className="movie-title">{movie.title}</label>
                  {/* <span className="movie-rating">Todo: rating circle</span> */}
                  <label>{movie.vote_average.toFixed(1)}</label>
                </div>
                <label className="movie-date">{movie.release_date}</label>
                <ul className="movie-tags">
                  <li key={movie.genres[0].id} className="tags__item">
                    {movie.genres[0].name}
                  </li>
                  <li key={movie.genres[1].id} className="tags__item">
                    {movie.genres[1].name}
                  </li>
                </ul>
                <label className="movie-overview">{cutOverview(movie.overview)}</label>
                <Rate count={10} />
              </div>
            </div>
            <div className="movie-card">
              <div className="movie-poster">
                <img className="poster__img" src={src} alt="Movie poster" />
              </div>
              <div className="movie-info">
                <div className="movie-header">
                  <label className="movie-title">{movie.title}</label>
                  {/* <span className="movie-rating">Todo: rating circle</span> */}
                  <label>{movie.vote_average.toFixed(1)}</label>
                </div>
                <label className="movie-date">{movie.release_date}</label>
                <ul className="movie-tags">
                  <li key={movie.genres[0].id} className="tags__item">
                    {movie.genres[0].name}
                  </li>
                  <li key={movie.genres[1].id} className="tags__item">
                    {movie.genres[1].name}
                  </li>
                </ul>
                <label className="movie-overview">{cutOverview(movie.overview)}</label>
                <Rate count={10} />
              </div>
            </div>
          </div>
        </main>
        <footer>
          <Pagination align="center" defaultCurrent={1} current={1} total={50} />
        </footer>
      </div>
    );
  }
}

export default MovieApp;
