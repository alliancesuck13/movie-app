/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { Alert } from "antd";

import Movies from "../Movies";
import MoviePagination from "../MoviePagination";
import Header from "../Header";
import MovieService from "../../services/MovieService";
import "./MovieApp.css";

class MovieApp extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      genres: [],
      pages: 0,
      currentPage: 0,
      query: "",
      isPaginationShow: false,
      isMoviesLoading: false,
      isPagesLoading: false,
      // isLoading: {movies: }
    };
  }

  async componentDidMount() {
    this.setState({ isMoviesLoading: true });
    const ms = new MovieService();
    const genres = await ms.getGenres();
    this.setState(() => {
      return {
        genres,
        isMoviesLoading: false,
      };
    });
  }

  changeCurrentPage = async (page) => {
    const { query } = this.state;
    this.setState({ isPagesLoading: true });
    await this.searchMovie(query, page);
    this.setState({ currentPage: page, isPagesLoading: false });
  };

  searchMovie = async (searchQuery = "", page = 1) => {
    const ms = new MovieService();

    this.setState({ isMoviesLoading: true, isPagesLoading: true });

    let searchedMovies = [];
    let totalPages = 0;

    try {
      searchedMovies = await ms.getMovies(searchQuery, page);
      totalPages = await ms.getPages(searchQuery);

      this.setState(() => {
        return {
          movies: searchedMovies,
          pages: totalPages,
        };
      });
    } catch {
      return;
    } finally {
      this.setState(() => {
        let isPaginationShowUpdated = true;
        if (searchedMovies.length) {
          isPaginationShowUpdated = true;
        } else {
          isPaginationShowUpdated = false;
        }

        return {
          isPaginationShow: isPaginationShowUpdated,
          isMoviesLoading: false,
          isPagesLoading: false,
        };
      });
    }
  };

  handleSearchInput = async (value = "") => {
    const ms = new MovieService();
    const currentPage = await ms.getCurrentPage(value);
    await this.searchMovie(value, currentPage);
    this.setState(() => {
      const newQuery = value;
      return {
        query: newQuery,
        currentPage,
      };
    });
  };

  render() {
    const {
      movies,
      pages,
      currentPage,
      isPaginationShow,
      genres,
      isMoviesLoading,
      isPagesLoading,
    } = this.state;

    return (
      <div className="movie-app">
        <header>
          <Header onInput={this.handleSearchInput} />
        </header>
        <main className="main">
          {!Array.isArray(movies) || !Array.isArray(genres) ? (
            <Alert
              message="No connection to server"
              description={movies.message || genres.message || pages.message}
              banner="true"
              type="error"
              style={{ marginTop: 15, marginBottom: 15 }}
            />
          ) : (
            <Movies
              movieList={movies}
              genres={genres}
              isMoviesLoading={isMoviesLoading}
            />
          )}
        </main>
        <footer>
          <MoviePagination
            isPagesLoading={isPagesLoading}
            currentPage={currentPage}
            onChange={this.changeCurrentPage}
            totalPages={pages}
            isPaginationShow={isPaginationShow}
          />
        </footer>
      </div>
    );
  }
}

export default MovieApp;
