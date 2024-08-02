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
      pages,
      isMoviesLoading,
      query,
      isPagesLoading,
      currentPage,
      onChange,
      isPaginationShow,
      onChangeTab,
      onChangeRating,
      ratedMovies,
      windowWidth,
    } = this.props;

    const tabs = [
      {
        key: "1",
        label: "Search",
        children: (
          <Movies
            movieList={movies}
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
            windowWidth={windowWidth}
          />
        ),
      },
      {
        key: "2",
        label: "Rated",
        children: (
          <RatedMovies
            ratedMovieList={ratedMovies}
            isMoviesLoading={isMoviesLoading}
            windowWidth={windowWidth}
          />
        ),
      },
    ];

    return (
      <Tabs
        defaultActiveKey="1"
        items={tabs}
        style={{ marginLeft: "auto", marginRight: "auto", width: "100%" }}
        onChange={onChangeTab}
      />
    );
  }
}

export default Header;
