//imports react, following functions from validator and from react-toastify and following items
import React, { Component } from "react";
import { isAlpha, isEmail, isAlphanumeric, isStrongPassword } from "validator";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "../utils/Axios";
import checkIfUserIsAuth from "../utils/checkIfUserIsAuth";
import "./Signup.css";

export class Signup extends Component {
  //sets default state to the following props with the following values
  state = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstNameError: "",
    lastNameError: "",
    usernameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    isButtonDisabled: true,
    firstNameOnFocus: false,
    lastNameOnFocus: false,
    emailOnFocus: false,
    usernameOnFocus: false,
    passwordOnFocus: false,
    confirmPasswordOnFocus: false,
  };

  componentWillMount() {
    let isAuth = checkIfUserIsAuth();

    if (isAuth) {
      this.props.history.push("/movie");
    }
  }

  handleOnChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        if (
          event.target.name === "firstName" ||
          event.target.name === "lastName"
        ) {
          this.handleFirstNameAndLastNameInput(event);
        }

        if (event.target.name === "email") {
          this.handleEmailInput();
        }

        if (event.target.name === "username") {
          this.handleUsernameInput();
        }
        if (event.target.name === "password") {
          this.handlePasswordInput();
        }

        if (event.target.name === "confirmPassword") {
          this.handleConfirmPasswordInput();
        }
      }
    );
  };

  handleConfirmPasswordInput = () => {
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        confirmPasswordError: "Password does not match!",
        isButtonDisabled: true,
      });
    } else {
      this.setState({
        confirmPasswordError: "",
      });
    }
  };

  handlePasswordInput = () => {
    if (this.state.confirmPasswordOnFocus) {
      if (this.state.password !== this.state.confirmPassword) {
        this.setState({
          confirmPasswordError: "Password does not match",
          isButtonDisabled: true,
        });
      } else {
        this.setState({
          confirmPasswordError: "",
        });
      }
    }

    if (this.state.password.length === 0) {
      this.setState({
        passwordError: "Password cannot be empty",
        isButtonDisabled: true,
      });
    } else {
      if (isStrongPassword(this.state.password)) {
        this.setState({
          passwordError: "",
        });
      } else {
        this.setState({
          passwordError:
            "Password must contains 1 uppercase, 1 lowercase, 1 special character, 1 number and minimum of 8 characters long",
          isButtonDisabled: true,
        });
      }
    }
  };

  handleEmailInput = () => {
    if (this.state.email.length === 0) {
      this.setState({
        emailError: "Email cannot be empty",
        isButtonDisabled: true,
      });
    } else {
      if (isEmail(this.state.email)) {
        this.setState({
          emailError: "",
        });
      } else {
        this.setState({
          emailError: "Please enter a valid email!",
          isButtonDisabled: true,
        });
      }
    }
  };

  handleFirstNameAndLastNameInput = (event) => {
    if (this.state[event.target.name].length > 0) {
      if (isAlpha(this.state[event.target.name])) {
        this.setState({
          [`${event.target.name}Error`]: "",
        });
      } else {
        this.setState({
          [`${event.target.name}Error`]: `${event.target.placeholder} can only have alphabet`,
          isButtonDisabled: true,
        });
      }
    } else {
      this.setState({
        [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`,
        isButtonDisabled: true,
      });
    }
  };

  handleUsernameInput = () => {
    if (this.state.username.length === 0) {
      this.setState({
        usernameError: "Username cannot be empty",
        isButtonDisabled: true,
      });
    } else {
      if (isAlphanumeric(this.state.username)) {
        this.setState({
          usernameError: "",
        });
      } else {
        this.setState({
          usernameError: "Username can only have alphabet and numbers",
          isButtonDisabled: true,
        });
      }
    }
  };

  handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      let userInputObj = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      };
      let success = await Axios.post("/api/user/sign-up", userInputObj);
      toast.success(`${success.data.message}`);
      this.props.history.push("/login");
    } catch (e) {
      toast.error(`${e.response.data.message}`);
    }
  };

  handleOnBlur = (event) => {
    if (this.state[event.target.name].length === 0) {
      this.setState({
        [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`,
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState.isButtonDisabled);

    if (prevState.isButtonDisabled === true) {
      if (
        this.state.firstNameOnFocus &&
        this.state.lastNameOnFocus &&
        this.state.emailOnFocus &&
        this.state.usernameOnFocus &&
        this.state.passwordOnFocus &&
        this.state.confirmPasswordOnFocus
      ) {
        if (
          this.state.firstNameError.length === 0 &&
          this.state.lastNameError.length === 0 &&
          this.state.usernameError.length === 0 &&
          this.state.emailError.length === 0 &&
          this.state.passwordError.length === 0 &&
          this.state.confirmPasswordError.length === 0 &&
          this.state.password === this.state.confirmPassword
        ) {
          this.setState({
            isButtonDisabled: false,
          });
        }
      }
    }
  }

  handleInputOnFocus = (event) => {
    if (!this.state[`${event.target.name}OnFocus`]) {
      this.setState({
        [`${event.target.name}OnFocus`]: true,
      });
    }
  };

  render() {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      firstNameError,
      lastNameError,
      usernameError,
      emailError,
      passwordError,
      confirmPasswordError,
    } = this.state;

    return (
      <div className="signup__container">
        <div className="signup__div">
          <div className="signup__title">Sign up</div>
          <div className="form-div-signup">
            <form className="form__signup" onSubmit={this.handleOnSubmit}>
              <div className="inline-container">
                <label className="signup__label" htmlFor="firstName">
                  First Name
                </label>
                <input
                  className="signup__input"
                  type="text"
                  id="firstName"
                  value={firstName}
                  placeholder="First Name"
                  name="firstName"
                  onChange={this.handleOnChange}
                  autoFocus
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                <div className="errorMessage">
                  {firstNameError && firstNameError}
                </div>

                <div className="inline-container">
                  <label className="signup__label" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    className="signup__input"
                    type="text"
                    id="lastName"
                    value={lastName}
                    placeholder="Last Name"
                    name="lastName"
                    onChange={this.handleOnChange}
                    onBlur={this.handleOnBlur}
                    onFocus={this.handleInputOnFocus}
                  />
                  <div className="errorMessage">
                    {lastNameError && lastNameError}
                  </div>
                </div>
              </div>

              <div className="form-group-block">
                <div className="block-container">
                  <label htmlFor="username">Username</label>
                  <input
                    className="signup__input"
                    type="text"
                    id="username"
                    value={username}
                    placeholder="Username"
                    onChange={this.handleOnChange}
                    name="username"
                    onBlur={this.handleOnBlur}
                    onFocus={this.handleInputOnFocus}
                  />
                  <div className="errorMessage">
                    {usernameError && usernameError}
                  </div>
                </div>
              </div>

              <div className="form-group-block">
                <div className="block-container">
                  <label htmlFor="email">Email</label>
                  <input
                    className="signup__input"
                    type="text"
                    id="email"
                    value={email}
                    placeholder="Email"
                    onChange={this.handleOnChange}
                    name="email"
                    onBlur={this.handleOnBlur}
                    onFocus={this.handleInputOnFocus}
                  />
                  <div className="errorMessage">{emailError && emailError}</div>
                </div>
              </div>

              <div className="form-group-block">
                <div className="block-container">
                  <label htmlFor="password">Password</label>
                  <input
                    className="signup__input"
                    type="text"
                    id="password"
                    value={password}
                    placeholder="Password"
                    onChange={this.handleOnChange}
                    name="password"
                    onBlur={this.handleOnBlur}
                    onFocus={this.handleInputOnFocus}
                  />
                  <div className="errorMessage">
                    {passwordError && passwordError}
                  </div>
                </div>
              </div>

              <div className="form-group-block">
                <div className="block-container">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    className="signup__input"
                    type="text"
                    id="confirmPassword"
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    onChange={this.handleOnChange}
                    name="confirmPassword"
                    onBlur={this.handleOnBlur}
                    onFocus={this.handleInputOnFocus}
                  />
                  <div className="errorMessage">
                    {confirmPasswordError && confirmPasswordError}
                  </div>
                </div>
              </div>

              <div className="button-container">
                <button type="submit" disabled={this.state.isButtonDisabled}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
