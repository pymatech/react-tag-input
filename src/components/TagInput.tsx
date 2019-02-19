import React, { KeyboardEvent } from "react";
import ReactDOM from 'react-dom';
import "./TagInput.css";
import { EventEmitter } from "events";
import TagMenu from "./TagMenu";

interface ITagInputProps {
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  separator?: string;
  tags?: string[];
  allowNewTags?: boolean;
  emptyTagListMessage?: string;
}

export default class TagInput extends React.Component<ITagInputProps, { items: string[], input: string, focused: boolean }> {
  private inputControl: any;
  private tagMenu: any;
  private focusTimeoutId: any = undefined;

  constructor(props: ITagInputProps) {
    super(props);

    this.state = {
      items: props.defaultValue ? props.defaultValue.split((this.props.separator) ? this.props.separator : " ") : [],
      input: "",
      focused: false
    };

    this.inputControl = React.createRef();
    this.tagMenu = React.createRef();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    this.handleInputKeyPress = this.handleInputKeyPress.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.grabFocus = this.grabFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.selectTag = this.selectTag.bind(this);
  }

  render() {
    const styles = {
      container: {
        paddingInlineStart: "0.25rem"
      },
    };

    let body = document.body;

    return (
      <div
        className={this.props.className + " custom-control tag-input"}
        tabIndex={-1}
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
            onKeyPress={this.handleInputKeyPress}
          />
        </div>
        {this.props.tags && this.state.focused === true && this.state.input.length > 0 && this.props.tags.length > 0 && <TagMenu ref={this.tagMenu} tagInput={this} boundingClientObject={body} onSelectTag={this.selectTag} />}
      </div>
    );
  }

  private handleInputChange(evt: React.ChangeEvent<HTMLInputElement>) {
    if (evt.target.value.indexOf((this.props.separator) ? this.props.separator : " ") >= 0) {

    } else {
      this.setState({ input: evt.target.value });
    }
  }

  private handleBlur() {

    // focus tracking from https://medium.com/@jessebeach/dealing-with-focus-and-blur-in-a-composite-widget-in-react-90d3c3b49a9b

    this.focusTimeoutId = setTimeout(() => {
      if (this.state.focused) {
        this.setState({ focused: false, input: "" });
      }
    }, 0);
  }

  private grabFocus() {
    clearTimeout(this.focusTimeoutId);

    if (!this.state.focused) {
      this.setState({ focused: true });
      this.inputControl.focus();
    }
  }

  private handleFocus() {
    clearTimeout(this.focusTimeoutId);

    if (!this.state.focused) {
      this.setState({ focused: true });
      this.inputControl.focus();
    }
  }

  private raiseChange(items: string[]) {
    if (this.props.onChange) {
      this.props.onChange(items.join((this.props.separator) ? this.props.separator : " "));
    }
  }

  private addNewTag(text: string): void {

    //No duplicates allowed
    if (this.state.items.includes(text)) {
      return;
    }

    if (this.props.allowNewTags === true) {
      let items: string[] = [...this.state.items, text];

      this.setState(state => ({
        items: items,
        input: ""
      }));

      this.raiseChange(items);
    } else {
      if (this.props.tags && this.props.tags.includes(text)) {
        let items: string[] = [...this.state.items, text];

        this.setState(state => ({
          items: items,
          input: ""
        }));

        this.raiseChange(items);
      }
    }
  }

  private handleInputKeyPress(evt: React.KeyboardEvent<HTMLInputElement>) {
    //Any input is allowed if new tags are allowed
    if (this.props.allowNewTags === true) {
      return;
    }
    if (evt.keyCode != 13 && evt.keyCode != 8) {
      //only allow input if an item contains the text
    }
  }

  private handleInputKeyDown(evt: React.KeyboardEvent<HTMLInputElement>) {
    if (evt.keyCode === 13 || evt.key === (this.props.separator ? this.props.separator : " ")) {
      let inputControl: HTMLInputElement = evt.target as HTMLInputElement;
      const value: string = inputControl.value.trim();
      if (value.length > 0) {
        this.addNewTag(value);
        evt.nativeEvent.preventDefault();
        evt.nativeEvent.stopPropagation();
      }

    } else if (evt.keyCode === 8) {
      if (this.state.items.length && !this.state.input.length) {
        let items: string[] = this.state.items.slice(0, this.state.items.length - 1);
        this.setState(state => ({
          items: items
        }));
        this.raiseChange(items);
      }
    }
  }

  private handleRemoveItem(index: number) {
    return () => {
      let items: string[] = this.state.items.filter((item, i) => i !== index);
      this.setState(state => ({
        items: items
      }));
      this.inputControl.focus();
      this.raiseChange(items);
    };
  }

  selectTag(tag: string) {
    this.addNewTag(tag);
    this.inputControl.focus();
  }
}