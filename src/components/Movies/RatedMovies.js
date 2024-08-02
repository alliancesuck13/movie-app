import { Col, Row, Spin } from "antd";

import MovieCard from "../MovieCard";

export default function RatedMovies(props) {
  const { ratedMovieList, isMoviesLoading, windowWidth } = props;

  let renderMovie = null;
  let renderSpinOrMovies = null;

  if (!Array.isArray(ratedMovieList)) return null;
  if (windowWidth > 1010) {
    renderMovie = ratedMovieList.map((movie) => {
      return (
        <Col key={movie.id} span={12}>
          <MovieCard movie={movie} isRated rating={movie.rating} />
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
    renderMovie = ratedMovieList.map((movie) => {
      return <MovieCard key={movie.id} movie={movie} isRated rating={movie.rating} />;
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

  return <div className="wrapper">{renderSpinOrMovies}</div>;
}
