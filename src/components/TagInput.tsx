import React, { KeyboardEvent } from "react";
import "./TagInput.css";
import { EventEmitter } from "events";

export default class TagInput extends React.Component<{ className?: string, placeholder?: string, value?:string, onChange?: (value:string) => void, separator?:string }, { items: string[], input: string, focused: boolean }> {
  private container: any;
  private inputControl: any;
  private focusTimeoutId: any = undefined;

  constructor(props: { className?: string, placeholder?: string, value?:string, onChange?: (value:string) => void }) {
    super(props);

    this.state = {
      items: props.value ? props.value.split((this.props.separator) ? this.props.separator : " ") : [],
      input: "",
      focused: false
    };

    this.container = React.createRef();
    this.inputControl = React.createRef();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.grabFocus = this.grabFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  render() {
    const styles = {
      container: {
        paddingInlineStart: "0.25rem"
      },
    };
    return (
      <div
        className={this.props.className + " custom-control tag-input"}
        tabIndex={-1}
        ref={container => (this.container = container)}
        onFocus={this.handleFocus}
        onClick={this.grabFocus}
        onBlur={this.handleBlur}
      >
        <div className="d-flex align-content-start flex-wrap tag-input-container">
        {this.state.items.map((item, i) => (
          <div key={i} className="btn-group" role="group" aria-label={item}>
            <button type="button" tabIndex={0} key={i} className="btn btn-secondary tag-input-item">
              {item}
            </button>
            <button type="button" tabIndex={0} className="btn btn-secondary mr-1 p-0 pl-1 pr-1 tag-input-item" aria-label="Close" onClick={this.handleRemoveItem(i)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        ))}
        <input
          placeholder={this.state.items.length === 0 ? (this.props.placeholder || "") : ""}
          ref={inputControl => (this.inputControl = inputControl)}
          className="tag-input-editor"
          value={this.state.input}
          onChange={this.handleInputChange}
          onKeyDown={this.handleInputKeyDown}
        />
        </div>
      </div>
    );
  }

  handleInputChange(evt: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ input: evt.target.value });
  }

  handleBlur() {

    // focus tracking from https://medium.com/@jessebeach/dealing-with-focus-and-blur-in-a-composite-widget-in-react-90d3c3b49a9b

    this.focusTimeoutId = setTimeout(() => {
      if (this.state.focused) {
        this.setState({ focused: false });
      }
    }, 0);
  }

  grabFocus() {
    clearTimeout(this.focusTimeoutId);

    if (!this.state.focused) {
      this.setState({ focused: true });
      this.inputControl.focus();
    }
  }

  handleFocus() {
    clearTimeout(this.focusTimeoutId);

    if (!this.state.focused) {
      this.setState({ focused: true });
      this.inputControl.focus();
    }
  }

  raiseChange(items:string[]){
    if (this.props.onChange){
      this.props.onChange(items.join((this.props.separator) ? this.props.separator : " "));
    }
  }

  handleInputKeyDown(evt: React.KeyboardEvent<HTMLInputElement>) {
    if (evt.keyCode === 13) {
      let inputControl: HTMLInputElement = evt.target as HTMLInputElement;
      const value: string = inputControl.value;

      let items : string[] = [...this.state.items, value];

      this.setState(state => ({
        items: items,
        input: ""
      }));

      this.raiseChange(items);
    }

    if (
      this.state.items.length &&
      evt.keyCode === 8 &&
      !this.state.input.length
    ) {
      let items : string[] = this.state.items.slice(0, this.state.items.length - 1);
      this.setState(state => ({
        items: items
      }));
      this.raiseChange(items);
    }
  }

  handleRemoveItem(index: number) {
    return () => {
      let items : string[] = this.state.items.filter((item, i) => i !== index);
      this.setState(state => ({
        items: items
      }));
      this.inputControl.focus();
      this.raiseChange(items);      
    };
  }
}