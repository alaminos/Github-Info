import React from "react";
import axios from "axios";
import githubUsernameRegex from "github-username-regex";

import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

const id = "f5ce4435afdfe23711c6";
const sec = "1daa19d525b9e92f034ebe504075e5b1600eea46";
const params = "?client_id=" + id + "&client_secret=" + sec;

class GetInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "getify",
      user: null,
      repos: null,
      isInvalid: false,
      isFound: true
    };
    this.getInfo = this.getInfo.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo() {
    const username = this.state.input;
    // Check if the username is a valid one
    if (!githubUsernameRegex.test(username)) {
      // if not, set state to reflect so
      // and exit the function without calling the API
      this.setState({ isInvalid: true });
      return;
    } else {
      this.setState({ isInvalid: false });
    }
    // Get user data
    const userUrl = "https://api.github.com/users/" + username + params;
    const reposUrl =
      "https://api.github.com/users/" +
      username +
      "/repos" +
      params +
      "&per_page=100";

    axios
      .all([axios.get(userUrl), axios.get(reposUrl)])
      .then(
        axios.spread((userResp, reposResp) => {
          this.setState({
            user: userResp.data,
            repos: reposResp.data,
            isFound: true
          });
        })
      )
      .catch(error => {
        console.log("FAIL", error);
        if (error.response.status === 404) {
          this.setState({ isFound: false });
        }
      });
  }

  inputHandler(event) {
    const input = event.target.value;
    this.setState({ input });
  }

  render() {
    return (
      <div className="wrapper">
        <Header change={this.inputHandler} click={this.getInfo} />
        <Content
          isInvalid={this.state.isInvalid}
          isFound={this.state.isFound}
          user={this.state.user}
          repos={this.state.repos}
        />
        <Footer />
      </div>
    );
  }
}

export default GetInfo;
