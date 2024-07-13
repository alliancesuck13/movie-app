/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { Pagination, Col, Row } from "antd";

import Header from "../Header";
import MovieCard from "../MovieCard";
import MovieService from "../../services/MovieService";
import "./MovieApp.css";

// todo: get the genres list on load page and put it in the state !!!

class MovieApp extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      pages: 0,
      currentPage: 0,
      query: "",
      isPaginationShow: false,
    };
  }

  changeCurrentPage = async (page) => {
    const { query } = this.state;
    this.searchMovie(query, page);
    this.setState({ currentPage: page });
  };

  searchMovie = async (searchQuery = "", page = 1) => {
    const ms = new MovieService();
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
      };
    });
  };

  handleSearchInput = async (value = "") => {
    const ms = new MovieService();
    const currentPage = await ms.getCurrentPage(value);
    this.searchMovie(value, currentPage);
    this.setState(() => {
      const newQuery = value;
      return {
        query: newQuery,
        currentPage,
      };
    });
  };

  render() {
    const { movies, pages, currentPage, isPaginationShow } = this.state;
    const renderMovie = movies.map((movie) => {
      return (
        <Col key={movie.id} span={12}>
          <MovieCard movie={movie} />
        </Col>
      );
    });

    return (
      <div className="movie-app">
        <Header onInput={this.handleSearchInput} />
        <main className="main">
          <div className="main-wrapper">
            <Row gutter={[35, 35]}>{renderMovie}</Row>
          </div>
        </main>
        <footer>
          <Pagination
            align="center"
            current={currentPage}
            onChange={this.changeCurrentPage}
            total={pages}
            className={!isPaginationShow ? "hide" : ""}
            showSizeChanger={false}
          />
        </footer>
      </div>
    );
  }
}

export default MovieApp;
