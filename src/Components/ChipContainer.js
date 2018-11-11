import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import { removeChipContext } from '../index.js';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-free-solid';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Chip from './Chip';

const StyledChipContainer = styled.div`
  display: flex;
  align-items: center;
  height: 60%;
  flex-grow: 1;
  ${props => (props.empty ? 'min-width: 100%;' : null)};
`;

const StyledButton = styled.button`
  font-size: 2rem;
  color: inherit;
  border: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0);

  &:active {
    border-style: none;
  }

  &:focus {
    outline-style: none;
  }
`;

const deleteChip = gql`
  mutation deleteChip($chip: ID!) {
    deleteChip(where: { id: $chip }) {
      id
    }
  }
`;

const ChipContainer = props => {
  const { id, chips, deletable } = props;
  return (
    <Droppable droppableId={id} direction="horizontal">
      {provided => (
        <StyledChipContainer
          empty={!chips.length}
          innerRef={provided.innerRef}
          {...provided.droppableProps}
        >
          <Mutation mutation={deleteChip}>
            {mutate => {
              return (
                chips &&
                chips.map((chip, index) => {
                  const removeButton = deletable ? (
                    <StyledButton
                      onClick={() =>
                        mutate({
                          variables: { chip: chip.id },
                          refetchQueries: ['fetchHorses']
                        })
                      }
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </StyledButton>
                  ) : null;
                  return (
                    <Chip
                      key={chip.id}
                      {...chip}
                      index={index}
                      postfix={removeButton}
                    />
                  );
                })
              );
            }}
          </Mutation>
          {provided.placeholder}
        </StyledChipContainer>
      )}
    </Droppable>
  );
};

export default ChipContainer;
