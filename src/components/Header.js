import React from "react";
import logo from "../logo.png";

function keyDownHandler(event) {
  if (event.keyCode === 13) {
    document.getElementById("searchButton").click();
  }
}

const Header = props => {
  return (
    <div className="header">
      <a className="logo-box" href="/">
        <img className="logo" src={logo} alt="Github Profile Display Logo" />
      </a>
      <h1 className="title">Github Profiles</h1>
      <div className="userSearch">
        <input
          className="searchInput"
          id="searchInputID"
          type="text"
          name="fname"
          placeholder="Search for a user"
          onChange={props.change}
          onKeyDown={keyDownHandler}
        />
        <button className="searchBtn" id="searchButton" onClick={props.click}>
          Get info
        </button>
      </div>
      <div className="a2a_kit a2a_kit_size_32 a2a_default_style icons-header">
        <a className="a2a_dd" href="https://www.addtoany.com/share">
          Social Share
        </a>
        <a className="a2a_button_copy_link">Copy Link</a>
      </div>
    </div>
  );
};

export default Header;
