import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import _ from 'lodash';
import nanoid from 'nanoid';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import moment from 'moment';
import gql from 'graphql-tag';

import './styles.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Body from './Components/Body';

import Rows from '../src/Utils/Rows';
import Chips from '../src/Utils/Chips';

const client = new ApolloClient({
  uri: 'https://api-uswest.graphcms.com/v1/cjmpof9zf1pcu01b9t3pnkqh6/master',
  clientState: {
    defaults: {
      date: moment().valueOf()
    },
    resolvers: {}
  }
});

export const removeChipContext = React.createContext();

class App extends Component {
  state = { Rows };

  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.removeChip = this.removeChip.bind(this);
  }

  onDragEnd(result) {
    const fetchHorses = gql`
      query fetchHorses {
        horses {
          id
          shortName
          chips(where: { date: $date }) {
            id
            date
            chipTemplate {
              id
              title
              color
            }
          }
        }
      }
    `;

    const newChip = gql`
      mutation createChip($chipTemplate: ID!, $horse: ID!, $date: DateTime!) {
        createChip(
          data: {
            chipTemplate: { connect: { id: $chipTemplate } }
            horse: { connect: { id: $horse } }
            date: $date
          }
        ) {
          id
          chipTemplate {
            title
            id
            color
          }
          date
          __typename
        }
      }
    `;

    const reassignChip = gql`
      mutation reassignChip($chip: ID!, $horse: ID!) {
        updateChip(
          data: { horse: { connect: { id: $horse } } }
          where: { id: $chip }
        ) {
          id
          chipTemplate {
            title
            id
            color
          }
          date
          __typename
        }
      }
    `;
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    } else if (destination.droppableId === 'footer') {
      console.log('No action to take, dropping back in footer');
      return;
    } else if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      console.log('No action to take, source and destination are the same');
      return;
    }

    const { date } = client.readQuery({
      query: gql`
        query {
          date @client
        }
      `
    });

    const { horses } = client.readQuery({
      query: fetchHorses,
      variables: {
        date: moment(date)
          .utc()
          .startOf('day')
          .toISOString()
      }
    });

    // Need to create a new chip linked to this template
    // The chip template ID is ths chip id in thes case, see <Footer /> component
    if (source.droppableId === 'footer') {
      const chipTemplate = draggableId;
      const horse = destination.droppableId;
      const date = moment(date)
        .utc()
        .startOf('day')
        .toISOString();
      client
        .mutate({
          mutation: newChip,
          variables: {
            chipTemplate,
            horse,
            date
          },
          // ideally should use update instead of refetch queries here
          refetchQueries: ['fetchHorses']
        })
        .then(data => console.log(data));
    } else {
      // The chip is moving from one horse to another
      // just reassign the horse id
      const horse = destination.droppableId;
      const chip = draggableId;
      client
        .mutate({
          mutation: reassignChip,
          variables: {
            horse,
            chip
          },
          // ideally should use update instead of refetch queries here
          refetchQueries: ['fetchHorses']
        })
        .then(data => console.log(data));
    }

    // const Rows = horses;

    // const [targetContainer] = Rows.filter(
    //   row => row.id === (destination && destination.droppableId)
    // );
    // const [sourceContainer] = Rows.filter(
    //   row => row.id === (source && source.droppableId)
    // );

    // if (!destination) {
    //   return;
    // } else if (destination.droppableId === 'footer') {
    //   console.log('No action to take, dropping back in footer');
    //   return;
    // } else if (
    //   destination.droppableId === source.droppableId &&
    //   destination.index === source.index
    // ) {
    //   console.log('No action to take, source and destination are the same');
    //   return;
    // }

    // const targetColumn = Array.from(targetContainer.chips);
    // let sourceColumn = targetColumn;
    // if (destination.droppableId !== source.droppableId) {
    //   sourceColumn = Array.from(
    //     (sourceContainer && sourceContainer.chips) || Chips
    //   );
    // }

    // const [chip] = sourceColumn.filter(
    //   chip => chip.idOG === draggableId || chip.id === draggableId
    // );

    // const newChip = _.cloneDeep(chip);

    // if (source.droppableId === 'footer') {
    //   // creating new chip rather than mutating old chip
    // }

    // if (source.droppableId !== 'footer') {
    //   // change referenced horse or reorder
    //   sourceColumn.splice(source.index, 1);
    //   sourceContainer.chips = sourceColumn;
    //   const sourceIndex = Rows.indexOf(sourceContainer);
    //   Rows.splice(sourceIndex, 1);
    //   Rows.splice(sourceIndex, 0, sourceContainer);
    // }

    // targetColumn.splice(destination.index, 0, newChip);

    // targetContainer.chips = targetColumn;

    // const targetIndex = Rows.indexOf(targetContainer);
    // Rows.splice(targetIndex, 1);
    // Rows.splice(targetIndex, 0, targetContainer);

    // console.log(Horses);

    // this.setState({ Rows });
  }

  removeChip(containerID, chipID) {
    const { Rows } = this.state;

    const [container] = Rows.filter(row => row.id === containerID);

    const adjusted = container.chips.filter(item => item.id !== chipID);

    container.chips = adjusted;

    const containerIndex = Rows.indexOf(container);
    Rows.splice(containerIndex, 1);
    Rows.splice(containerIndex, 0, container);

    this.setState({ Rows });
  }

  render() {
    return (
      <removeChipContext.Provider value={this.removeChip}>
        <ApolloProvider client={client}>
          <Header />
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Body />
            <Footer />
          </DragDropContext>
        </ApolloProvider>
      </removeChipContext.Provider>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
