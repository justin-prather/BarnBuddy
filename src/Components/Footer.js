import React, { Component } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import ChipContainer from './ChipContainer';

// import Chips from '../Utils/Chips';

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

const fetchChipTemplates = gql`
  query fetchChipTemplates {
    chipTemplates {
      id
      title
      color
    }
  }
`;

export default class Footer extends Component {
  render() {
    return (
      <Query query={fetchChipTemplates}>
        {({ loading, data: { chipTemplates } }) => {
          if (!loading) {
            const chips = chipTemplates.map(chipTemplate => {
              return { id: chipTemplate.id, chipTemplate };
            });
            return (
              <StyledFooter>
                <ChipContainer chips={chips} id="footer" />
              </StyledFooter>
            );
          } else {
            return null;
          }
        }}
      </Query>
    );
  }
}
