import React from 'react';
import './App.css';
import Type from './Type.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.data = {
      random: true,
      length: 30
    };
    this.update = this.update.bind(this);
  }

  update() {
    this.data.length = document.getElementById('lInput').value;
    this.forceUpdate();
  }

  render() {
    return (
      <div className="App">
        <center>
          <br />
          <br />
          <div>
            <p>
              Number of words :
              <input type="number" defaultValue={this.data.length} className="lInput" onChange={this.update} id='lInput' />
            </p>
          </div>
          <br />
          <br />
          <Type {...this.data} />
        </center>
      </div>
    );

  }
}

export default App;
