import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import _ from 'lodash';
import nanoid from 'nanoid';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import moment from 'moment';

import './styles.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Body from './Components/Body';

import Rows from '../src/Utils/Rows';
import Chips from '../src/Utils/Chips';

const client = new ApolloClient({
  clientState: {
    defaults: {
      date: moment().valueOf()
    },
    resolvers: {}
  }
});

class App extends Component {
  state = { Rows };

  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    const { source, destination, draggableId } = result;
    const { Rows } = this.state;

    const [targetContainer] = Rows.filter(
      row => row.id === (destination && destination.droppableId)
    );
    const [sourceContainer] = Rows.filter(
      row => row.id === (source && source.droppableId)
    );

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

    const targetColumn = Array.from(targetContainer.chips);
    let sourceColumn = targetColumn;
    if (destination.droppableId !== source.droppableId) {
      sourceColumn = Array.from(
        (sourceContainer && sourceContainer.chips) || Chips
      );
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
      sourceContainer.chips = sourceColumn;
      const sourceIndex = Rows.indexOf(sourceContainer);
      Rows.splice(sourceIndex, 1);
      Rows.splice(sourceIndex, 0, sourceContainer);
    }

    targetColumn.splice(destination.index, 0, newChip);

    targetContainer.chips = targetColumn;

    const targetIndex = Rows.indexOf(targetContainer);
    Rows.splice(targetIndex, 1);
    Rows.splice(targetIndex, 0, targetContainer);

    this.setState({ Rows });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Header />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Body rows={Rows} />
          <Footer />
        </DragDropContext>
      </ApolloProvider>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
