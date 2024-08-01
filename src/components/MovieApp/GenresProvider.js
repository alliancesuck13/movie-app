/* eslint-disable react/prefer-stateless-function */
import React, { createContext, Component } from "react";

import MovieService from "../../services/MovieService";

export const GenresContext = createContext();

export default class GenresProvider extends Component {
  constructor() {
    super();
    this.state = {
      genres: [],
    };
  }

  componentDidMount() {
    this.getGenres();
  }

  getGenres = async () => {
    const { genres } = this.state;
    if (!genres.length) {
      const ms = new MovieService();
      const genresList = await ms.getGenres();

      this.setState(() => {
        return {
          genres: genresList,
        };
      });
    }
  };

  render() {
    const { genres } = this.state;
    const { children } = this.props;

    return <GenresContext.Provider value={genres}>{children}</GenresContext.Provider>;
  }
}
