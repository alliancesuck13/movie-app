// class MovieService {
//   API_BASE_URL = "https://api.themoviedb.org/3";

//   getResource = async (url = "") => {
//     const options = {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZGUxOGYxYWE2NDMxNjJlZWJjOGY4NDY2NzNhOTE0ZCIsIm5iZiI6MTcyMDcwMDEyMC40OTc4NTQsInN1YiI6IjY2OGZjYWY1Y2U4MmYzNmY5ZGE3OTU3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UVfFvd6dSS123i8F8wXpdQgZOxTqKf0tvdLSc7YXmBo",
//       },
//     };

//     const result = await fetch(`${this.API_BASE_URL}${url}`, options);

//     if (!result.ok) {
//       throw new Error(`Could not fetch ${url}, received ${result.status}`);
//     }

//     const response = await result.json();

//     return response;
//   };

//   getMovies(query = "", page = 1) {
//     return this.getResource(`/search/movie?query=${query}&page=${page}`).then(
//       (response) => response.results,
//       (reason) => reason
//     );
//   }
// }

// export default MovieService;
