import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const StyledChip = styled.div`
  height: 3rem;
  min-width: 4rem;
  background-color: ${props => props.bgColor || '#ff5349'};
  box-shadow: 1px 2px 7px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  border: 1px solid #999999;
  padding: 0 0.9rem;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;

  span {
    white-space: nowrap;
    padding: 0 0.9rem;
  }
`;

export default class Chip extends Component {
  render() {
    const {
      chipTemplate: { color, title },
      index,
      id,
      prefix,
      postfix
    } = this.props;
    return (
      <Draggable index={index} draggableId={id}>
        {provided => (
          <StyledChip
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
            bgColor={color}
            className="chip"
          >
            {prefix}
            <span>{title}</span>
            {postfix}
          </StyledChip>
        )}
      </Draggable>
    );
  }
}
