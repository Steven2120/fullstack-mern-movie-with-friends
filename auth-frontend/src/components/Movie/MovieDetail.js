//imports react and axios
import React, { Component } from "react";
import axios from "axios";
import Axios from "../utils/Axios";
import "./MovieDetail.css";

export class MovieDetail extends Component {
  //set default state of the following items to the following values
  state = {
    Actors: "",
    Awards: "",
    Country: "",
    Plot: "",
    Poster: "",
    Rated: "",
    Ratings: [],
    Title: "",
    imdbID: "",
    isLoading: true,
    telInput: "",
    textareaInput: "",
    friendsArray: [],
    selectedFriendFirstName: "",
    selectedFriendLastName: "",
    selectedFriendID: "",
    selectedFriendMobileNumber: "",
    friendMessage: "",
    originalMessage: "",
  };

  //uses componentDidMount method to set a variable to an axios get request
  async componentDidMount() {
    this.fetchMovie();
    this.fetchAllFriends();
  }

  fetchAllFriends = async () => {
    try {
      let allFriends = await Axios.get("/api/friend/get-all-friends");

      console.log(allFriends);

      this.setState({
        friendsArray: allFriends.data.friends,
      });
    } catch (e) {
      console.log(e);
    }
  };

  fetchMovie = async () => {
    try {
      let result = await axios.get(
        `https://omdbapi.com/?apikey=6332b1e1&t=${this.props.match.params.movieTitle}`
      );

      this.setState(
        {
          Actors: result.data.Actors,
          Awards: result.data.Awards,
          Country: result.data.Country,
          Plot: result.data.Plot,
          Poster: result.data.Poster,
          Rated: result.data.Rated,
          Ratings: result.data.Ratings,
          Title: result.data.Title,
          imdbID: result.data.imdbID,
          isLoading: false,
        },
        () => {
          this.setState({
            friendMessage: `I think this movie is dope ${this.state.Title}. ${this.state.Actors} are in it. This is the plot ${this.state.Plot}.`,
            originalMessage: `I think this movie is dope ${this.state.Title}. ${this.state.Actors} are in it. This is the plot ${this.state.Plot}.`,
          });
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  showMovieDetail = () => {
    return this.state.Ratings ? (
      <div className="movie__detail__div">
        <div className="movie__poster">
          <img src={this.state.Poster} alt={this.state.Title} />
        </div>
        <div className="movie__info">
          <div id="first__subject" className="subject">
            Actors: {this.state.Actors}
          </div>
          <div className="subject">Awards: {this.state.Awards}</div>
          <div className="subject">Country: {this.state.Country}</div>
          <div className="subject">Plot: {this.state.Plot}</div>
          <div className="subject">Poster: {this.state.Poster}</div>
          <div className="subject">Rated: {this.state.Rated}</div>
          <div className="subject">
            Ratings:{" "}
            {this.state.Ratings.map((item) => {
              return (
                <span key={item.Source}>
                  {item.Source} {item.Value}
                </span>
              );
            })}
          </div>
          <div className="subject">Title: {this.state.Title}</div>
          <div className="subject">imdbID: {this.state.imdbID}</div>
        </div>
      </div>
    ) : (
      <div className="no__movie__info__div">
        <div>
          We apologize, this movie does not currently have up to date
          information
        </div>
      </div>
    );
  };

  handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      let message = this.state.friendMessage;

      let result = await Axios.post("/api/twilio/send-sms", {
        to: this.state.selectedFriendMobileNumber,
        message: message,
      });
      console.log(result);
    } catch (e) {
      console.log(e.response);
    }
  };

  handleSelectChange = (event) => {
    let selectedUser = JSON.parse(event.target.value);

    this.setState({
      selectedFriendFirstName: selectedUser.firstName,
      selectedFriendLastName: selectedUser.lastName,
      selectedFriendID: selectedUser._id,
      selectedFriendMobileNumber: selectedUser.mobileNumber,
      friendMessage: `Hey ${selectedUser.firstName}, ${this.state.originalMessage}`,
    });
  };

  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            ...Loading
          </div>
        ) : (
          <div>
            {this.showMovieDetail()}
            <div className="send__text">
              <select
                id="select__friend"
                disabled={this.state.Ratings ? false : true}
                style={{ marginBottom: "1rem", cursor: "pointer" }}
                onChange={this.handleSelectChange}
              >
                <option>Select a friend</option>
                {this.state.friendsArray.map((friend) => {
                  return (
                    <option key={friend._id} value={JSON.stringify(friend)}>
                      {friend.firstName} {friend.lastName}
                    </option>
                  );
                })}
              </select>
              <div>
                <textarea
                  id="text__info"
                  disabled={this.state.Ratings ? false : true}
                  style={{ width: "20em", height: "10em" }}
                  defaultValue={this.state.friendMessage}
                />
              </div>
              <div>
                {/* button not generating text for friend */}
                <button
                  id="submit__text"
                  disabled={this.state.Ratings ? false : true}
                  style={{ marginTop: "1rem", cursor: "pointer" }}
                  onClick={this.handleFormSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default MovieDetail;
