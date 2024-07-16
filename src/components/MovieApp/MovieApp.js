/* eslint-disable react/prefer-stateless-function */
import React from "react";

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
    const ms = new MovieService();
    const genres = await ms.getGenres();
    this.setState(() => {
      return {
        genres,
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

    const searchedMovies = await ms.getMovies(searchQuery, page);
    const totalPages = await ms.getPages(searchQuery);

    this.setState(() => {
      let isPaginationShowUpdated = true;
      if (searchedMovies.length) {
        isPaginationShowUpdated = true;
      } else {
        isPaginationShowUpdated = false;
      }

      return {
        movies: searchedMovies,
        pages: totalPages,
        isPaginationShow: isPaginationShowUpdated,
        isMoviesLoading: false,
        isPagesLoading: false,
      };
    });
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
          <Movies movieList={movies} genres={genres} isMoviesLoading={isMoviesLoading} />
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
