
  //dictionary for the braille dots into letters in binary, left to right, top to bottom.
  let BrailleDictionary = {
    '100000' : 'A',
    '101000' : 'B',
    '110000' : 'C',
    '110100' : 'D',
    '100100' : 'E',
    '111000' : 'F',
    '111100' : 'G',
    '101100' : 'H',
    '011000' : 'I',
    '011100' : 'J',
    '100010' : 'K',
    '101010' : 'L',
    '110010' : 'M',
    '110110' : 'N',
    '100110' : 'O',
    '111010' : 'P',
    '111110' : 'Q',
    '101110' : 'R',
    '011010' : 'S',
    '011110' : 'T',
    '100011' : 'U',
    '101011' : 'V',
    '011101' : 'W',
    '110011' : 'X',
    '110111' : 'Y',
    '100111' : 'Z'
  }
  // console.log(Object.keys(props.values).slice(0,6))


//   return (
//     //letter is a ? if not found in the dictionary
//     <div>{dictionary[toggles] || '?'}</div>
//   )
// }

module.exports = BrailleDictionary;