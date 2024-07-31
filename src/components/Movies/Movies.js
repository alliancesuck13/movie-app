import { Col, Row, Spin, Alert, Input } from "antd";

import MovieCard from "../MovieCard";
import MoviePagination from "../MoviePagination";
import debounce from "../../services/debounce";

export default function Movies(props) {
  const {
    movieList,
    genres,
    isMoviesLoading,
    query,
    onInput,
    isPagesLoading,
    currentPage,
    onChange,
    pages,
    isPaginationShow,
    onChangeRating,
  } = props;

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

  try {
    renderMovie = movieList.map((movie) => {
      return (
        <Col key={movie.id} span={12}>
          <MovieCard
            movie={movie}
            genres={genres}
            onChangeRating={(value) => onChangeRating.call(this, movie.id, value)}
          />
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
        description={movieList.message || genres.message}
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
        {!Array.isArray(movieList) || !Array.isArray(genres) ? reloadingAlert : render}
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
