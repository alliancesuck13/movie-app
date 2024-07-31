/* eslint-disable react/prefer-stateless-function */
import React from "react";

import Header from "../Header";
import MovieService from "../../services/MovieService";
import "./MovieApp.css";

class MovieApp extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      ratedMovies: [],
      genres: [],
      pages: 0,
      currentPage: 0,
      query: "",
      isPaginationShow: false,
      isMoviesLoading: false,
      isPagesLoading: false,
      sessionId: null,
      // sessionError: false,
    };
  }

  componentDidMount() {
    this.getGenres();
    this.createGuestSession();
    // this.timerID = setInterval(() => {
    //   this.getGenres();
    // }, 10000);
  }

  // componentWillUnmount() {
  //   clearInterval(this.timerID);
  // }

  getGenres = async () => {
    this.setState({ isMoviesLoading: true });
    const { genres } = this.state;
    if (!genres.length) {
      const ms = new MovieService();
      const genresList = await ms.getGenres();

      this.setState(() => {
        return {
          genres: genresList,
          isMoviesLoading: false,
        };
      });
    } else {
      clearInterval(this.timerID);
      this.setState({ isMoviesLoading: false });
    }
  };

  createGuestSession = async () => {
    this.setState({ isMoviesLoading: true });

    const movieService = new MovieService();
    try {
      const sessionId = await movieService.createGuestSession();

      this.setState({ sessionId, isMoviesLoading: false });
    } catch (error) {
      this.setState({ isMoviesLoading: false });
    }
  };

  changeCurrentPage = async (page) => {
    const { query } = this.state;
    this.setState({ isPagesLoading: true });
    await this.searchMovie(query, page);
    this.setState({ currentPage: page, isPagesLoading: false });
  };

  searchMovie = async (searchQuery = "", page = 1) => {
    const { genres } = this.state;
    const ms = new MovieService();

    this.setState({ isMoviesLoading: true, isPagesLoading: true });

    let searchedMovies = [];
    let totalPages = 0;

    searchedMovies = await ms.getMovies(searchQuery, page);
    totalPages = await ms.getPages(searchQuery);

    if (!genres.length) {
      this.getGenres();
    }

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

  onChangeTab = async (tabKey) => {
    let ratedMovies = null;
    if (tabKey === "2") {
      const { sessionId } = this.state;
      const movieService = new MovieService();
      ratedMovies = await movieService.getRatedMovies(sessionId);
    }

    this.setState(() => {
      return { ratedMovies };
    });
  };

  onChangeRating = async (movieId, value) => {
    const { sessionId } = this.state;
    const movieService = new MovieService();
    const changedRating = await movieService.rateMovie(movieId, sessionId, value);

    return changedRating;
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
      query,
      sessionId,
      // sessionError,
      ratedMovies,
    } = this.state;

    // if (sessionError) return null;
    return (
      <div className="movie-app">
        <Header
          onInput={this.handleSearchInput}
          movieList={movies}
          genres={genres}
          isMoviesLoading={isMoviesLoading}
          query={query}
          movies={movies}
          pages={pages}
          isPagesLoading={isPagesLoading}
          currentPage={currentPage}
          onChange={this.changeCurrentPage}
          totalPages={pages}
          isPaginationShow={isPaginationShow}
          sessionId={sessionId}
          ratedMovies={ratedMovies}
          onChangeTab={this.onChangeTab}
          onChangeRating={this.onChangeRating}
        />
      </div>
    );
  }
}

export default MovieApp;
