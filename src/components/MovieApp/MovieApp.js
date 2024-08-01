/* eslint-disable react/prefer-stateless-function */
import React from "react";

import Header from "../Header";
import MovieService from "../../services/MovieService";

import GenresProvider from "./GenresProvider";
import "./MovieApp.css";

class MovieApp extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      ratedMovies: [],
      pages: 0,
      currentPage: 0,
      query: "",
      isPaginationShow: false,
      isMoviesLoading: false,
      isPagesLoading: false,
      sessionId: null,
    };
  }

  componentDidMount() {
    this.createGuestSession();
  }

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
    const ms = new MovieService();

    this.setState({ isMoviesLoading: true, isPagesLoading: true });

    let searchedMovies = [];
    let totalPages = 0;

    searchedMovies = await ms.getMovies(searchQuery, page);
    totalPages = await ms.getPages(searchQuery);

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
      isMoviesLoading,
      isPagesLoading,
      query,
      sessionId,
      ratedMovies,
    } = this.state;

    return (
      <div className="movie-app">
        <GenresProvider>
          <Header
            onInput={this.handleSearchInput}
            movieList={movies}
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
        </GenresProvider>
      </div>
    );
  }
}

export default MovieApp;
