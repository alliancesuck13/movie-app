import { Col, Row, Spin } from "antd";

import MovieCard from "../MovieCard";

export default function Movies(props) {
  const { movieList, genres, isMoviesLoading } = props;
  const renderMovie = movieList.map((movie) => {
    return (
      <Col key={movie.id} span={12}>
        <MovieCard movie={movie} genres={genres} />
      </Col>
    );
  });

  return (
    <div className="main-wrapper">
      {isMoviesLoading ? (
        <Spin
          size="large"
          style={{ marginLeft: "auto", marginRight: "auto", marginBottom: 15 }}
        />
      ) : (
        <Row gutter={[35, 35]}>{renderMovie}</Row>
      )}
    </div>
  );
}
