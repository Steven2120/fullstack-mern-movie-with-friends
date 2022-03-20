//imports react and the following items
import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieList from "./MovieList";
import "./Movie.css";

export class Movie extends Component {
  state = {
    movie: "",
    movieArray: [],
    movieArray2: [],
    movieArray3: [],
    totalCount: 0,
    totalPage: 0,
    perPage: 10,
    currentPage: 1,
    maxPageLimit: 10,
    minPageLimit: 0,
    pageArray: [],
  };

  getTotalPages = (totalResults, perPage) => {
    let pages = [];

    for (let i = 1; i < Math.ceil(totalResults / perPage); i++) {
      pages.push(i);
    }
    return pages;
  };

  async componentDidMount() {
    try {
      let searchedMovieTitleSessionStorage =
        window.sessionStorage.getItem("searchedMovieTitle");

      if (searchedMovieTitleSessionStorage) {
        let result = await this.handleSearchMovie(
          searchedMovieTitleSessionStorage
        );

        let totalPageArray = this.getTotalPages(
          +result.data.totalResults,
          this.state.perPage
        );

        this.setState({
          movie: searchedMovieTitleSessionStorage,
          movieArray: result.data.Search,
          totalPage: +result.data.totalResults, //in batman result is 440
          pageArray: totalPageArray,
        });
      } else {
        let randomMovieTitle = this.handleRandomTitle();
        let result = await this.handleSearchMovie(randomMovieTitle);
        // let result = await this.handleSearchMovie(randomMovieTitle);

        let totalPageArray = this.getTotalPages(
          +result.data.totalResults,
          this.state.perPage
        );

        //logs results object where you can find total results
        console.log(result);

        //logs total amount of pages for the searched result including default random search
        console.log(totalPageArray);

        this.setState({
          movie: randomMovieTitle,
          movieArray: result.data.Search,
          totalPage: +result.data.totalResults, //in batman result is 440
          pageArray: totalPageArray, //[1,2,3,4,5] all the way time 440 each page will contain 10 results
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  handleRandomTitle = () => {
    let randomMovieArray = [
      "Big trouble in little china",
      "the simpsons",
      "Rush hour",
      "the godfather",
      "Luca",
      "Pulp Fiction",
      "The Matrix",
    ];

    let randomSelectedMovieIndex = Math.floor(
      Math.random() * randomMovieArray.length
    );

    return randomMovieArray[randomSelectedMovieIndex];
  };

  handleSearchMovie = async (movieTitle) => {
    try {
      let randomMovieData = await axios.get(
        `https://omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API}&s=${movieTitle}&page=${this.state.currentPage}`
      );

      return randomMovieData;
    } catch (e) {
      return e;
    }
  };

  handleOnChange = (event) => {
    this.setState({
      movie: event.target.value,
    });
    console.log(this.state.movie);
  };

  //function that sets variable to ajax call and sets state movieArray to result.data.Search
  onSubmit = async (event) => {
    try {
      let result = await this.handleSearchMovie(this.state.movie);

      window.sessionStorage.setItem("searchedMovieTitle", this.state.movie);

      let totalPageArray = this.getTotalPages(
        +result.data.totalResults,
        this.state.perPage
      );

      this.setState({
        movieArray: result.data.Search,
        totalPage: +result.data.totalResults,
        pageArray: totalPageArray,
      });
      console.log(this.state.movie);
      //catches error and logs it
    } catch (e) {
      this.setState({
        error: e,
      });
      console.log(this.state.error);
    }
  };

  handleEnterKey = (e) => {
    if (e.key === "Enter") {
      this.onSubmit();
    }
  };

  showpagination = () => {
    let totalPages = this.state.totalPage; // 440
    let perPage = this.state.perPage; // 10
    let currentPage = this.state.currentPage; // 1
    let maxPageLimit = this.state.maxPageLimit; // 10
    let minPageLimit = this.state.minPageLimit; // 0

    const buildPagination = () => {
      return (
        <>
          {this.state.pageArray.map((number) => {
            console.log(number < maxPageLimit + 1 && number > minPageLimit);
            // console.log("number: ", number);
            // console.log("maxPageLimit + 1", maxPageLimit);

            if (number < maxPageLimit + 1 && number > minPageLimit) {
              return (
                <span
                  onClick={() => this.handleGoToPage(number)}
                  style={{
                    marginLeft: 15,
                    marginRight: 15,
                    cursor: "pointer",
                    color: currentPage === number ? "red" : "#f4f4f4",
                  }}
                  key={number}
                >
                  {number}
                </span>
              );
            }
          })}
        </>
      );
    };

    return (
      <div>
        <ul>{buildPagination()}</ul>
      </div>
    );
  };

  handleGoToPage = (number) => {
    this.setState(
      {
        currentPage: number,
      },
      async () => {
        let result = await this.handleSearchMovie(this.state.movie);

        this.setState({
          movieArray: result.data.Search,
        });
      }
    );
  };

  nextPage = () => {
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          currentPage: prevState.currentPage + 1,
        };
      },
      async () => {
        let movie = "";

        let searchedMovieTitleSessionStorage =
          window.sessionStorage.getItem("searchedMovieTitle");

        movie = searchedMovieTitleSessionStorage
          ? window.sessionStorage.getItem("searchedMovieTitle")
          : this.state.movie;

        let result = await this.handleSearchMovie(movie);
        console.log(result);
        this.setState({
          movieArray: result.data.Search,
        });
      }
    );

    if (this.state.currentPage + 1 > this.state.maxPageLimit) {
      this.setState({
        maxPageLimit: this.state.maxPageLimit + this.state.perPage,
        minPageLimit: this.state.minPageLimit + this.state.perPage,
      });
    }
  };

  prevPage = () => {
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          currentPage: prevState.currentPage - 1,
        };
      },
      async () => {
        let result = await this.handleSearchMovie("batman");
        console.log(result);
        this.setState({
          movieArray: result.data.Search,
        });
      }
    );

    if ((this.state.currentPage - 1) % this.state.perPage === 0) {
      this.setState({
        maxPageLimit: this.state.maxPageLimit - this.state.perPage,
        minPageLimit: this.state.minPageLimit - this.state.perPage,
      });
    }
  };

  render() {
    return (
      <div>
        <div className="search__bar">
          <input
            id="search__input"
            type="text"
            placeholder="Search something..."
            name="movie"
            onChange={this.handleOnChange}
            onKeyPress={this.handleEnterKey}
          />
          <button className="search__btn" type="submit" onClick={this.onSubmit}>
            Search
          </button>
        </div>

        <div className="movie__canvas">
          <span className="canvas__title">Movies</span>
          <div className="movielist__div">
            <MovieList movieArray={this.state.movieArray} />
          </div>
        </div>

        {this.state.totalPage <= 10 ? (
          ""
        ) : (
          <div className="pagination__div">
            <button
              disabled={this.state.currentPage === 1 ? true : false}
              className={
                this.state.currentPage !== 1
                  ? "pagination__prev__btn"
                  : "pagination__prev__btn__off"
              }
              onClick={this.prevPage}
            >
              Previous
            </button>
            {this.showpagination()}
            <button
              onClick={this.nextPage}
              disabled={
                this.state.currentPage ===
                  this.state.pageArray[this.state.pageArray.length - 1] ||
                this.state.movieArray === undefined
                  ? true
                  : false
              }
              className="pagination__next__btn"
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  }
}
export default Movie;
