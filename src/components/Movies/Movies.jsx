/* eslint-disable react/prefer-stateless-function */
import { Col, Row, Spin, Alert, Input } from "antd";
import React from "react";

import MovieCard from "../MovieCard";
import MoviePagination from "../MoviePagination";
import debounce from "../../services/debounce";

export default class Movies extends React.Component {
  render() {
    const {
      movieList,
      isMoviesLoading,
      query,
      onInput,
      isPagesLoading,
      currentPage,
      onChange,
      pages,
      isPaginationShow,
      onChangeRating,
      windowWidth,
    } = this.props;

    const alertDescription = `Nothing was found for the query "${query}"`;
    const alert = query.length ? (
      <Alert
        type="info"
        banner="true"
        message="Search result"
        description={alertDescription}
      />
    ) : null;

    const renderSpinOrAlert = isMoviesLoading ? (
      <Spin
        size="large"
        style={{ marginLeft: "auto", marginRight: "auto", marginBottom: 15 }}
      />
    ) : (
      alert
    );

    let renderMovie = [];
    let reloadingAlert = null;
    let render = null;
    let renderSpinOrMovies = null;

    try {
      if (windowWidth > 1010) {
        renderMovie = movieList.map((movie) => {
          return (
            <Col key={movie.id} span={12}>
              <MovieCard
                movie={movie}
                onChangeRating={(value) => onChangeRating.call(this, movie.id, value)}
              />
            </Col>
          );
        });
        renderSpinOrMovies = isMoviesLoading ? (
          <Spin
            size="large"
            style={{ marginLeft: "auto", marginRight: "auto", marginBottom: 15 }}
          />
        ) : (
          <Row gutter={[35, 35]}>{renderMovie}</Row>
        );
      } else {
        renderMovie = movieList.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              onChangeRating={(value) => onChangeRating.call(this, movie.id, value)}
            />
          );
        });
        renderSpinOrMovies = isMoviesLoading ? (
          <Spin
            size="large"
            style={{ marginLeft: "auto", marginRight: "auto", marginBottom: 15 }}
          />
        ) : (
          renderMovie
        );
      }

      render = movieList.length ? renderSpinOrMovies : renderSpinOrAlert;
    } catch {
      reloadingAlert = isMoviesLoading ? (
        <Spin
          size="large"
          style={{ marginLeft: "auto", marginRight: "auto", marginBottom: 15 }}
        />
      ) : (
        <Alert
          message="No connection to server"
          description={movieList.message}
          banner="true"
          type="error"
          style={{ marginTop: 15, marginBottom: 15 }}
        />
      );
    }

    return (
      <>
        <Input
          placeholder="Search movie"
          onChange={debounce((e) => onInput(e.target.value), 400)}
          style={{ width: "100%" }}
        />
        <div className="wrapper">
          {!Array.isArray(movieList) ? reloadingAlert : render}
        </div>
        <MoviePagination
          isPagesLoading={isPagesLoading}
          currentPage={currentPage}
          onChange={onChange}
          totalPages={pages}
          isPaginationShow={isPaginationShow}
        />
      </>
    );
  }
}
