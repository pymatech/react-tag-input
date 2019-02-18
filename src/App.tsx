import React, { Component, FormEvent } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap-css-only';
import './components/TagInput.css';
import TagInput from "./components/TagInput"

class App extends Component {

  constructor(props:any) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event:FormEvent) {
    console.log("Submit!");
    event.preventDefault();
  }

  render() {
    const tags:string[] = ["Ford","Chevy","Dodge","Tesla"];

    return (
      <div className="App">
        <header className="App-header">
          <h2>react-tag-input</h2>
          <form className="p-2" onSubmit={ this.handleSubmit }>
            <input type="text" className="form-control form-group" placeholder="Enter something here..."/>
            <p className="text-muted">Type in a tag below and press Enter to add it</p>
            <TagInput className="form-control form-group" placeholder="Enter tags..." defaultValue="abc,def" separator=","  onChange={ (value) => console.log(value)} allowNewTags={true}/>
            <TagInput className="form-control form-group" placeholder="Enter more tags..." tags={tags} defaultValue="abc def" separator=" "  onChange={ (value) => console.log(value)} allowNewTags={false}/>
            <input type="text" className="form-control form-group" placeholder="Enter something else here..."/>
            <input type="submit" value="Submit" />
          </form>
        </header>
      </div>
    );
  }
}

export default App;
