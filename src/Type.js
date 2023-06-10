import React from 'react';
import axios from 'axios';
import './Type.css'

class Type extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    axios.post('/api/type', { count: props.length }).then((res) => {
      const data = res.data.data;
      this.words = data;
      this.phrase = data.reduce((w1, w2) => w1 + ' ' + w2.value, '').replace(/^./, '');
      var temp = this.phrase.split('');
      this.letters = temp.map((l, index) => <letter id={l + index} value={l}>{l}</letter>);
      this.written = 0;
      this.forceUpdate();
    });

    window.addEventListener('keydown', (event) => {
      var pressed = event.key;
      if (pressed == 'Backspace') {
        if (this.written != 0)
          this.written--;
        var id = this.letters[this.written].props.id;
        document.getElementById(id).className = '';
        if (this.letters[this.written].props.value == ' ')
          document.getElementById(id).innerHTML = ' ';
        return;
      }
      if (!(event.keyCode > 64 && event.keyCode < 91 || event.keyCode == 32))
        return;
      var id = this.letters[this.written].props.id;
      if (pressed == this.letters[this.written].props.value)
        document.getElementById(id).className = 'correctLetter';
      else {
        var le = document.getElementById(id);
        if (le.attributes[1].value == ' ') {
          le.innerHTML = pressed;
          le.className = 'overLetter';
        } else
          le.className = 'wrongLetter';
      }
      this.written++;
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className='wrapper'>
          <div className='caret' />
          {this.letters}
        </div>
      </React.Fragment>
    );
  }

}

export default Type;
