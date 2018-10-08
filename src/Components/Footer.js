import React, { Component } from 'react';
import styled from 'styled-components';

import ChipContainer from './ChipContainer';

import Chips from '../Utils/Chips';

const StyledFooter = styled.header`
  width: 100%;
  height: 6rem;
  background-color: rgba(60, 208, 210, 0.5);
  display: flex;
  align-items: center;
  padding: 0 2rem;
  overflow-x: scroll;

  .chip:last-child {
    margin-right: 2rem;
  }
`;

export default class Footer extends Component {
  render() {
    return (
      <StyledFooter>
        <ChipContainer chips={Chips} id="footer" />
      </StyledFooter>
    );
  }
}
