import React, { Component } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Loader from 'react-loader-spinner';
import moment from 'moment';

import Row from './Row';

const StyledBody = styled.section`
  width: 100%;
  height: calc(100% - 12rem);
  background-image: url(tiny-squares.png);
  background-repeat: repeat;
  overflow: scroll;
  padding-bottom: 1.5rem;
`;

const fetchHorses = gql`
  query fetchHorses($date: DateTime!) {
    horses {
      id
      shortName
      chips(where: { date: $date }) {
        id
        date
        chipTemplate {
          title
          color
        }
      }
    }
  }
`;

const stateDate = gql`
  query STATE_DATE {
    date @client
  }
`;

export default class Body extends Component {
  render() {
    return (
      <Query query={stateDate}>
        {({ data: { date } }) => {
          const dateObj = {
            date: moment(date)
              .utc()
              .startOf('day')
              .toISOString()
          };
          return (
            <Query query={fetchHorses} variables={dateObj}>
              {({ loading, data: { horses } }) => {
                return (
                  <StyledBody>
                    {loading ? (
                      <Loader type="Audio" />
                    ) : (
                      horses.map((row, index) => (
                        <Row
                          key={row.id}
                          index={index}
                          rowTitle={row.shortName}
                          id={row.id}
                          chips={row.chips}
                          deletable
                        />
                      ))
                    )}
                  </StyledBody>
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}
