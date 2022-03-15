import React, { Component } from "react";
import { toast } from "react-toastify";
import Axios from "../utils/Axios";
import "./FriendList.css";

export class FriendList extends Component {
  state = {
    toggle: false,
    firstName: "",
    lastName: "",
    mobileNumber: "",
  };

  handleToggle = () => {
    this.setState((prevState) => {
      return {
        toggle: !prevState.toggle,
      };
    });
  };

  handleUpdateFriendChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleUpdateClick = async (id) => {
    try {
      let updatedFriend = await Axios.put(
        `/api/friend/update-friend-by-id/${id}`,
        {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          mobileNumber: this.state.mobileNumber,
        }
      );

      this.props.handleUpdatedFriendData(updatedFriend.data.payload);
      this.handleToggle();
    } catch (e) {
      toast.error(e.response.data.payload);
    }
  };

  handleDeleteClick = async (id) => {
    try {
      let deletedFriend = await Axios.delete(
        `/api/friend/delete-friend-by-id/${id}`
      );

      console.log(deletedFriend);

      this.props.handleDeleteByFriend(deletedFriend.data.payload);
    } catch (e) {
      toast.error(e.response.data.payload);
    }
  };

  render() {
    const { friend } = this.props;
    const { toggle } = this.state;

    return (
      <tr key={friend._id}>
        {toggle ? (
          <>
            <td className="friend__addition">
              <input
                name="firstName"
                onChange={this.handleUpdateFriendChange}
                defaultValue={friend.firstName}
              />
            </td>

            <td className="friend__addition">
              <input
                name="lastName"
                onChange={this.handleUpdateFriendChange}
                defaultValue={friend.lastName}
              />
            </td>

            <td className="friend__addition">
              <input
                name="mobileNumber"
                onChange={this.handleUpdateFriendChange}
                defaultValue={friend.mobileNumber}
              />
            </td>
          </>
        ) : (
          <>
            <td className="friend__addition">{friend.firstName}</td>
            <td className="friend__addition">{friend.lastName}</td>
            <td className="friend__addition">{`${friend.mobileNumber}`}</td>
          </>
        )}

        {toggle ? (
          <td
            className="friend__addition"
            style={{ cursor: "pointer" }}
            onClick={() => this.handleUpdateClick(friend._id)}
          >
            Update
          </td>
        ) : (
          <td
            className="friend__addition"
            style={{ cursor: "pointer" }}
            onClick={this.handleToggle}
          >
            Edit
          </td>
        )}

        <td
          className="friend__addition"
          style={{ cursor: "pointer" }}
          onClick={() => this.handleDeleteClick(friend._id)}
        >
          Delete
        </td>
      </tr>
    );
  }
}

export default FriendList;
