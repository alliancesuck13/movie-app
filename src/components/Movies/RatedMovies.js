import { Col, Row, Spin } from "antd";

import MovieCard from "../MovieCard";

export default function RatedMovies(props) {
  const { ratedMovieList, genres, isMoviesLoading } = props;

  let renderMovie = [];
  let render = null;
  if (!Array.isArray(ratedMovieList)) return null;
  renderMovie = ratedMovieList.map((movie) => {
    return (
      <Col key={movie.id} span={12}>
        <MovieCard movie={movie} genres={genres} isRated rating={movie.rating} />
      </Col>
    );
  });
  const renderSpinOrMovies = isMoviesLoading ? (
    <Spin
      size="large"
      style={{ marginLeft: "auto", marginRight: "auto", marginBottom: 15 }}
    />
  ) : (
    <Row gutter={[35, 35]}>{renderMovie}</Row>
  );

  render = ratedMovieList.length ? renderSpinOrMovies : null;
  return <div className="wrapper">{render}</div>;
}
