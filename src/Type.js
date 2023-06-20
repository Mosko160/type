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
      this.letters = temp.map((l, index) => <letter id={l + index} value={l} data={l}>{l}</letter>);
      this.written = 0;
      this.forceUpdate();
    });

    window.addEventListener('keydown', (event) => {
      var pressed = event.key;
      if (pressed == 'Backspace')
        this.backspace_pressed();
      if (!(event.keyCode > 64 && event.keyCode < 91 || event.keyCode == 32))
        return;
      this.letter_pressed(pressed);
    })
  }

  letter_pressed(pressed) {
    var id = this.letters[this.written].props.id;
    var le = document.getElementById(id);
    if (pressed == this.letters[this.written].props.value) {
      le.className = 'correctLetter';
      le.attributes[2].value = pressed;
    }
    else {
      if (le.attributes[1].value == ' ') {
        le.innerHTML = pressed;
        le.className = 'overLetter';
        le.attributes[2].value = pressed;
      } else
        le.className = 'wrongLetter';
    }
    if (this.written != 0) {
      var post = this.letters[this.written - 1].props.id;
      post = document.getElementById(post);
      post.innerHTML = post.attributes[2].value;
    }
    this.written++;
    var caret = document.createElement('div');
    caret.className = 'caret';
    le.appendChild(caret);
    if (this.written == 1)
      document.getElementsByClassName('caretInit')[0].innerHTML = '';
  }

  backspace_pressed() {
    if (this.written == 0)
      return;
    var post = this.letters[this.written - 1].props.id;
    post = document.getElementById(post);
    post.innerHTML = post.attributes[1].value;
    this.written--;
    var id = this.letters[this.written].props.id;
    document.getElementById(id).className = '';
    if (this.letters[this.written].props.value == ' ')
      document.getElementById(id).innerHTML = ' ';
    var caret = document.createElement('div');
    caret.className = 'caret';
    if (this.written != 0) {
      id = this.letters[this.written - 1].props.id;
      document.getElementById(id).appendChild(caret);
    }
    else
      document.getElementsByClassName('caretInit')[0].appendChild(caret);
    return;
  }

  render() {
    return (
      <React.Fragment>
        <div className='wrapper'>
          <div className='caretInit'>
            <div className='caret' />
          </div>
          {this.letters}
        </div>
      </React.Fragment>
    );
  }

}

export default Type;
