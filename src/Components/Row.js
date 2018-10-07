import React, { Component } from 'react';
import styled from 'styled-components';

import ChipContainer from './ChipContainer';

const StyledRow = styled.div`
  height: 7rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

const StyledColumnLeft = styled.div`
  color: #333333;
  font-size: 1.8rem;
  font-weight: bold;
  height: 7rem;
  width: 8.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 1 8.5;
  background-color: #f8f8ff;
  border: 2px solid rgba(60, 208, 210, 0.5);
  border-left: none;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
`;

const StyledColumnRight = styled.div`
  height: 7rem;
  width: 30rem;
  flex: 0 1 30rem;
  background-color: #f8f8ff;
  border: 2px solid rgba(60, 208, 210, 0.5);
  border-right: none;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  overflow-x: scroll;

  .chip:last-child {
    margin-right: 2rem;
  }
`;

export default class Row extends Component {
  render() {
    const { rowTitle, chips, id } = this.props;
    return (
      <StyledRow>
        <StyledColumnLeft>
          <span>{rowTitle}</span>
        </StyledColumnLeft>
        <StyledColumnRight>
          <ChipContainer chips={chips} id={id} />
        </StyledColumnRight>
      </StyledRow>
    );
  }
}
