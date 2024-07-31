/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { Tabs } from "antd";

import Movies from "../Movies";
import RatedMovies from "../Movies/RatedMovies";
import "./Header.css";

class Header extends React.Component {
  render() {
    const {
      onInput,
      movies,
      genres,
      pages,
      isMoviesLoading,
      query,
      isPagesLoading,
      currentPage,
      onChange,
      isPaginationShow,
      // sessionId,
      onChangeTab,
      onChangeRating,
      ratedMovies,
    } = this.props;

    const tabs = [
      {
        key: "1",
        label: "Search",
        children: (
          <Movies
            movieList={movies}
            genres={genres}
            isMoviesLoading={isMoviesLoading}
            query={query}
            movies={movies}
            pages={pages}
            onInput={onInput}
            isPagesLoading={isPagesLoading}
            currentPage={currentPage}
            onChange={onChange}
            totalPages={pages}
            isPaginationShow={isPaginationShow}
            onChangeRating={onChangeRating}
          />
        ),
      },
      {
        key: "2",
        label: "Rated",
        children: (
          <RatedMovies
            ratedMovieList={ratedMovies}
            genres={genres}
            isMoviesLoading={isMoviesLoading}
          />
        ),
      },
    ];

    return (
      <Tabs
        defaultActiveKey="1"
        items={tabs}
        style={{ marginLeft: "auto", marginRight: "auto" }}
        onChange={onChangeTab}
      />
    );
  }
}

export default Header;
