import React, { Component } from "react";
import styled from "styled-components";

import Row from "./Row";

const StyledBody = styled.section`
  width: 100%;
  height: calc(100% - 12rem);
  background-image: url(tiny-squares.png);
  background-repeat: repeat;
  overflow: scroll;
  padding-bottom: 1.5rem;
`;

export default class Body extends Component {
  render() {
    const { rows } = this.props;
    return (
      <StyledBody>
        {rows &&
          Object.keys(rows).map((row, index) => (
            <Row key={row} index={index} rowTitle={row} chips={rows[row]} />
          ))}
      </StyledBody>
    );
  }
}
