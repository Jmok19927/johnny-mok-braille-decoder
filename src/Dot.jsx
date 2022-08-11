import React from 'react';

var Dot = (props) => {
  return (
    <div className={props.toggled ? 'ColoredDot' : 'Dot'} onClick={() => {props.handleClick(props.position)}}>
      {props.number}
    </div>
  )
}

export default Dot;