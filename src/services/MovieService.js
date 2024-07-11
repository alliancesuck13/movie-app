// class MovieService {
//   async getResource(url) {
//     const result = await fetch(url);

//     if (!result.ok) {
//       throw new Error(`Could not fetch ${url}, received ${result.status}`);
//     }

//     return await result.json();
//   }

//   getAllMovies() {
//     return this.getResource("...link");
//   }

//   getMovie(id) {
//     return this.getResource(`...link ${id}`);
//   }
// }
