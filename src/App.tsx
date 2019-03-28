import React, { Component, FormEvent } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap-css-only';
import './components/TagInput.css';
import TagInput from "./components/TagInput"

class App extends Component {

  constructor(props: any) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event: FormEvent) {
    console.log("Submit!");
    event.preventDefault();
  }

  render() {
    const carMakes: string[] = ["Acura", "Audi", "Bentley", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge",
      "Fiat", "Ford", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", "Lamborghini",
      "Lexus", "Lincoln", "Maserati", "Mazda", "McLaren", "Mercedes-Benz", "Mini", "Mitsubishi",
      "Nissan", "Porsche", "Rolls-Royce", "Scion", "Smart", "Subaru", "Toyota", "Volkswagen", "Volvo"];

    return (
      <div className="App">
        <header className="App-header">
          <h2>react-tag-input</h2>
          <form className="p-2" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col">
                <input type="text" className="form-control form-group" placeholder="Enter something here..." />
                <p className="text-muted">Type in a tag below and press Enter to add it</p>
                <TagInput className="form-control form-group" placeholder="Enter tags..." defaultValue="abc,def" separator="," onChange={(value) => console.log(value)} allowNewTags={true} />
                <TagInput className="form-control form-group" placeholder="Make of car..." tags={carMakes} defaultValue="Ford Dodge" separator=" " onChange={(value) => console.log(value)} allowNewTags={false} emptyTagListMessage="No matching car makes..." truncateTagMenuAt={3} />
                <input type="text" className="form-control form-group" placeholder="Enter something else here..." />
                <input type="submit" value="Submit" />
              </div>
              <div className="col">
              </div>
            </div>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
