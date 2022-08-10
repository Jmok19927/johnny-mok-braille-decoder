import React from 'react';
import Dot from './Dot.jsx';
import dict from './BrailleDictionary.js';
import InputBox from './InputBox.jsx';
import RecentSearches from './recentSearches.jsx';
import axios from 'axios';

class DecoderContainer extends React.Component {
  constructor(props){
    super(props);
    this.state={
      TL: true,
      TR: false,
      ML: false,
      MR: false,
      BL: false,
      BR: false,
      string: '',
      searches: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/searches').then((data) => {
      console.log(data.data);
      this.updateSearches();
    }).catch((err) => {
      this.updateSearches();
    })
  }

  handleKeyPress(e, letter) {
    //adding ways to push to textbox
    if (e.key === '.' || e.key === 'Enter') {
      this.addLetter(letter);
      this.resetState()
    }
    //toggle the dots using left side of numpad
    if (e.key === '7') {
      this.toggle('TL');
    }
    if (e.key === '8') {
      this.toggle('TR');
    }
    if (e.key === '4') {
      this.toggle('ML');
    }
    if (e.key === '5') {
      this.toggle('MR');
    }
    if (e.key === '1') {
      this.toggle('BL');
    }
    if (e.key === '2') {
      this.toggle('BR');
    }
  }

  resetState() {
    //reset all dots to be blank
    this.setState({
      TL: false,
      TR: false,
      ML: false,
      MR: false,
      BL: false,
      BR: false
    })
  }

  handleNutrimatic() {
    console.log('entered handle nutrimatic');
    axios.post('http://localhost:8000/searches', {search: this.state.string}).then(() => {
      this.updateSearches();
    })
  }

  updateSearches() {
    axios.get('http://localhost:8000/searches').then((data) => {
      this.setState({searches: data.data});
    }).catch((err) => {
      console.error(err);
    })
  }

  toggle(position) {
    this.setState({[position]: !this.state[position]})
  }

  handleStringChange(e) {
    let newString = e.target.value;
    this.setState({string: newString})
  }

  addLetter(letter) {
    if (letter) {
      letter = letter.toLowerCase()
    } else {
      letter = '?'
    }

    let newString = this.state.string + letter
    this.setState({string: newString})
    this.resetState();
  }

  changeLetter(value) {
    this.setState({letter: value})
  }

  render() {
    let toggles = Object.fromEntries(Object.entries(this.state).slice(0,6));
    let binaryToggles = '';
      //take the positions from the state and turn them into a binary string
    Object.keys(toggles).slice(0,6).forEach((position) => {
      if (toggles[position]) {
        binaryToggles += 1;
      } else {
        binaryToggles += 0;
      }
    })

    return (
      <div
      onKeyDown={(event) =>
        {this.handleKeyPress(event, dict[binaryToggles])}}
      tabIndex='0'
      >
        <div className='DotRow'>
          <Dot toggled={this.state.TL} position={'TL'} handleClick={this.toggle.bind(this)}/>
          <Dot toggled={this.state.TR} position={'TR'} handleClick={this.toggle.bind(this)}/>
        </div>
        <div className='DotRow'>
          <Dot toggled={this.state.ML} position={'ML'} handleClick={this.toggle.bind(this)}/>
          <Dot toggled={this.state.MR} position={'MR'} handleClick={this.toggle.bind(this)}/>
        </div>
        <div className='DotRow'>
          <Dot toggled={this.state.BL} position={'BL'} handleClick={this.toggle.bind(this)}/>
          <Dot toggled={this.state.BR} position={'BR'} handleClick={this.toggle.bind(this)}/>
        </div>

        <div className='flex'>
          Decoded Letter:
          <div className='decodedLetter'>{dict[binaryToggles]|| '?'}
          </div>
        </div>

        <InputBox
          stringChange={this.handleStringChange.bind(this)}
          string={this.state.string}
          binaryToggles={binaryToggles}
          handleAddClick={this.addLetter.bind(this)}
          />
        <div>
          Click Add, ' . ' or 'Enter' to add the current letter to the textbox.
        </div>
        <a href={`https://nutrimatic.org/?q=%3C${this.state.string.replaceAll('?', 'A')}%3E&go=Go`} target="_blank" rel="noreferrer" onClick={this.handleNutrimatic.bind(this)} className="button">Anagram on Nutrimatic</a>
        <div>Recent searches:
          {this.state.searches.map((search, index) => {
            return <RecentSearches search={search.search} key={index}/>
          })}
        </div>
      </div>


    )
  }

}

export default DecoderContainer;