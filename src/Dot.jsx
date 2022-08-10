import React from 'react';

var Dot = (props) => {
  return (
    <div className={props.toggled ? 'ColoredDot' : 'Dot'} onClick={() => {props.handleClick(props.position)}}>

    </div>
  )
}

export default Dot;