import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import _ from 'lodash';
import nanoid from 'nanoid';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';

import './styles.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Body from './Components/Body';

import Rows from '../src/Utils/Rows';
import Chips from '../src/Utils/Chips';

const client = new ApolloClient({
  clientState: {
    defaults: {
      Rows,
      Chips
    },
    resolvers: {}
  }
});

const STATE_QUERY = gql`
  {
    Rows @client
    Chips @client
  }
`;

class App extends Component {
  state = Rows;

  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    const { source, destination, draggableId } = result;
    const { state } = this;

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

    const targetColumn = Array.from(state[destination.droppableId]);
    let sourceColumn = targetColumn;
    if (destination.droppableId !== source.droppableId) {
      sourceColumn = Array.from(state[source.droppableId] || Chips);
    }

    const [chip] = sourceColumn.filter(
      chip => chip.idOG === draggableId || chip.id === draggableId
    );

    const newChip = _.cloneDeep(chip);

    if (source.droppableId === 'footer') {
      newChip.id = nanoid();
    }

    if (source.droppableId !== 'footer') {
      sourceColumn.splice(source.index, 1);
      state[source.droppableId] = sourceColumn;
    }

    targetColumn.splice(destination.index, 0, newChip);

    state[destination.droppableId] = targetColumn;

    this.setState(state);
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Query query={STATE_QUERY}>
          {({ loading, data }) => {
            console.log(loading);
            console.log(data);
            return null;
          }}
        </Query>
        <Header />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Body rows={this.state} />
          <Footer />
        </DragDropContext>
      </ApolloProvider>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
