import { Col, Row, Spin, Alert } from "antd";

import MovieCard from "../MovieCard";

export default function Movies(props) {
  const { movieList, genres, isMoviesLoading, query } = props;

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

  const renderMovie = movieList.map((movie) => {
    return (
      <Col key={movie.id} span={12}>
        <MovieCard movie={movie} genres={genres} />
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

  const render = movieList.length ? renderSpinOrMovies : renderSpinOrAlert;

  return <div className="main-wrapper">{render}</div>;
}
