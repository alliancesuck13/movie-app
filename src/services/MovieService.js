class MovieService {
  API_BASE_URL = "https://api.themoviedb.org/3";

  getResource = async (url = "") => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZGUxOGYxYWE2NDMxNjJlZWJjOGY4NDY2NzNhOTE0ZCIsIm5iZiI6MTcyMjQyOTU2Ni4yOTMyOTQsInN1YiI6IjY2OGZjYWY1Y2U4MmYzNmY5ZGE3OTU3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Rw83Ds6dq_r027DyxN__YY8Te9pBJrmq9fdMWtNl45I",
      },
    };

    const result = await fetch(`${this.API_BASE_URL}${url}`, options);

    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, received ${result.status}`);
    }

    const response = await result.json();

    return response;
  };

  postResource = async (url = "", body = null) => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZGUxOGYxYWE2NDMxNjJlZWJjOGY4NDY2NzNhOTE0ZCIsIm5iZiI6MTcyMjQyOTU2Ni4yOTMyOTQsInN1YiI6IjY2OGZjYWY1Y2U4MmYzNmY5ZGE3OTU3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Rw83Ds6dq_r027DyxN__YY8Te9pBJrmq9fdMWtNl45I",
      },
      body: JSON.stringify(body),
    };

    const result = await fetch(`${this.API_BASE_URL}${url}`, options);

    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, received ${result.status}`);
    }

    const response = await result.json();

    return response;
  };

  getMovies(query = "", page = 1) {
    return this.getResource(`/search/movie?query=${query}&page=${page}`).then(
      (response) => response.results,
      (reason) => reason
    );
  }

  getRatedMovies(sessionId) {
    return this.getResource(`/guest_session/${sessionId}/rated/movies`).then(
      (response) => response.results,
      (reason) => reason.message
    );
  }

  getPages(query = "") {
    return this.getResource(`/search/movie?query=${query}`).then(
      (response) => response.total_pages,
      (reason) => reason
    );
  }

  getCurrentPage(query = "") {
    return this.getResource(`/search/movie?query=${query}`).then(
      (response) => response.page,
      (reason) => reason
    );
  }

  getGenres() {
    return this.getResource("/genre/movie/list").then(
      (response) => response.genres,
      (reason) => reason
    );
  }

  createGuestSession() {
    return this.getResource("/authentication/guest_session/new").then(
      (response) => response.guest_session_id,
      (reason) => reason
    );
  }

  rateMovie(movieId, sessionId, value) {
    return this.postResource(`/movie/${movieId}/rating?guest_session_id=${sessionId}`, {
      value,
    }).then(
      (response) => response,
      (reason) => reason
    );
  }
}

export default MovieService;
