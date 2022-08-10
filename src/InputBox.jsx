import React from 'react';
import dict from './BrailleDictionary.js';

var InputBox = (props) => {
    return (
      <div>
        <input className='form' placeholder='Almost, but not quite, entirely unlike your puzzle solution.' type='text' onChange={props.stringChange} value={props.string}/>
        <button className='addButton' onClick={() => {props.handleAddClick(dict[props.binaryToggles])}}>Add</button>
      </div>
    )

};

export default InputBox