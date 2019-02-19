import React, { KeyboardEvent } from "react";
import ReactDOM from "react-dom";
import TagInput from "./TagInput";
import "./TagMenu.css";

interface Props {
  tag: string;
  onSelectTag: (tag: string) => void;
}

export default class TagItem extends React.Component<Props, { style: {} }> {
  constructor(props: Props) {
    super(props);
    this.selectTag = this.selectTag.bind(this);
  }

  private selectTag(): any {
    this.props.onSelectTag(this.props.tag);
  }

  render() {
    return (
      <button type="button" className="btn btn-secondary btn-small tag-menu-item mr-1" tabIndex={0} onClick={this.selectTag} aria-role="listitem">{this.props.tag}</button>
    );
  }
}