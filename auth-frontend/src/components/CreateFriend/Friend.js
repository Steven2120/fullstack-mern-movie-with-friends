import React, { Component } from "react";
import FriendList from "./FriendList";
import "./Friend.css";

export class Friend extends Component {
  render() {
    return (
      <div className="update-container">
        <table className="create__friend__form" id="friends">
          <thead>
            <tr id="tr">
              <th className="friend__table__top">First name</th>
              <th className="friend__table__top">Last name</th>
              <th className="friend__table__top">Mobile number</th>
              <th className="friend__table__top">Edit</th>
              <th className="friend__table__top">Delete</th>
            </tr>
          </thead>
          <tbody className="table__canvas">
            {this.props.friendArray.map((friend) => {
              return (
                <FriendList
                  handleUpdatedFriendData={this.props.handleUpdatedFriendData}
                  handleDeleteByFriend={this.props.handleDeleteByFriend}
                  key={friend._id}
                  friend={friend}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Friend;
