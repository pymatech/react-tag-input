import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap-css-only';
import './components/TagInput.css';
import TagInput from "./components/TagInput"

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>react-tag-input</h2>
          <form className="p-2">
            <input type="text" className="form-control form-group" placeholder="Enter something here..."/>
            <p className="text-muted">Type in a tag below and press Enter to add it</p>
            <TagInput className="form-control form-group" placeholder="Enter tags..." value="abc,def" separator=","  onChange={ (value) => console.log(value)}/>
            <input type="text" className="form-control form-group" placeholder="Enter something else here..."/>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
