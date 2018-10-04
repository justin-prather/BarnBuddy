import React, { Component } from "react";
import styled from "styled-components";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/fontawesome-free-solid";

const StyledHeader = styled.header`
  width: 100%;
  height: 6rem;
  background-color: #3cd0d2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3rem;
  font-size: 3rem;
  color: #555555;
`;

export default class Header extends Component {
  render() {
    return (
      <StyledHeader>
        <FontAwesomeIcon icon={faAngleLeft} />
        <h1>Today</h1>
        <FontAwesomeIcon icon={faAngleRight} />
      </StyledHeader>
    );
  }
}
