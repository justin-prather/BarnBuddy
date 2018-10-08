import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import Chip from './Chip';

const StyledChipContainer = styled.div`
  display: flex;
  align-items: center;
  height: 60%;
  flex-grow: 1;
  ${props => (props.empty ? 'min-width: 100%;' : null)};
`;

const ChipContainer = props => {
  const { id, chips } = props;
  return (
    <Droppable droppableId={id} direction="horizontal">
      {provided => (
        <StyledChipContainer
          empty={!chips.length}
          innerRef={provided.innerRef}
          {...provided.droppableProps}
        >
          {chips &&
            chips.map((chip, index) => (
              <Chip key={chip.id} {...chip} index={index} />
            ))}
          {provided.placeholder}
        </StyledChipContainer>
      )}
    </Droppable>
  );
};

export default ChipContainer;
