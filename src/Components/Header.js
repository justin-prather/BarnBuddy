import React, { Component } from 'react';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/fontawesome-free-solid';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import _ from 'lodash';

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

const STATE_DATE = gql`
  query STATE_DATE {
    date @client
  }
`;

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.setDate = this.setDate.bind(this);
  }

  setDate(date, direction, client) {
    const cloned = _.cloneDeep(date);
    cloned.add(direction, 'days');
    client.writeData({
      data: { date: cloned.valueOf() }
    });
  }

  render() {
    return (
      <Query query={STATE_DATE}>
        {({ loading, data: { date }, client }) => {
          const reconstructedDate = moment(date);
          return (
            <StyledHeader>
              <FontAwesomeIcon
                icon={faAngleLeft}
                onClick={() => this.setDate(reconstructedDate, -1, client)}
              />
              <h1>
                {reconstructedDate.calendar(null, {
                  lastDay: '[Yesterday]',
                  lastWeek: '[Last] dddd',
                  nextDay: '[Tomorrow]',
                  nextWeek: 'dddd',
                  sameDay: '[Today]',
                  sameElse: 'DD/MM/YYYY'
                })}
              </h1>
              <FontAwesomeIcon
                icon={faAngleRight}
                onClick={() => this.setDate(reconstructedDate, 1, client)}
              />
            </StyledHeader>
          );
        }}
      </Query>
    );
  }
}
