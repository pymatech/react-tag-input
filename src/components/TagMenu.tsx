import React, { KeyboardEvent } from "react";
import ReactDOM from "react-dom";
import TagInput from "./TagInput";
import TagItem from "./TagItem";
import "./TagMenu.css";

interface Props {
    tagInput: TagInput;
    boundingClientObject: HTMLElement;
    onSelectTag: (tag: string) => void;
}

export default class TagMenu extends React.Component<Props, { style: {} }> {

    private throttleTimeout: any = undefined;

    constructor(props: Props) {
        super(props);

        this.selectTag = this.selectTag.bind(this);
        this.throttleResize = this.throttleResize.bind(this);
        this.state = {
            style: {
                top: "0",
                left: "0.25rem",
                right: "0.25rem",
                height: "auto",
                zIndex: "0"
            }
        };
    }

    componentDidMount() {
        // let element: HTMLElement = ReactDOM.findDOMNode(this) as HTMLElement;
        // this.props.boundingClientObject.appendChild(element);
        this.calculateLocation();
        window.addEventListener("resize", this.throttleResize, false);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.throttleResize);
        //let element: HTMLElement = ReactDOM.findDOMNode(this) as HTMLElement;
        //this.props.boundingClientObject.removeChild(element);
    }

    private throttleResize() {
        if (!this.throttleTimeout) {
            this.throttleTimeout = setTimeout(() => {
                this.calculateLocation();
                this.throttleTimeout = null;
            }, 66);
        }
    }

    calculateLocation() {
        let parentElement: HTMLElement = ReactDOM.findDOMNode(this.props.tagInput) as HTMLElement;
        let parentRect: DOMRect | ClientRect | null = parentElement ? parentElement.getBoundingClientRect() : null;
        if (parentRect) {
            let parentZIndex = parseInt(parentElement.style.zIndex ? parentElement.style.zIndex : "1000");
            let zIndex = (parentZIndex + 1000);
            this.setState({
                style: {
                    top: parentRect.height - 2,
                    left: "0.25rem",
                    right: "0.25rem",
                    height: "auto",
                    zIndex: zIndex.toString()
                }
            });
        }
    }

    private selectTag(tag: string) {
        this.props.onSelectTag(tag);
    }

    render() {
        let lowerCaseInput: string = this.props.tagInput.state.input.toLowerCase();
        let tags = this.props.tagInput.props.tags as string[];
        tags = tags.filter((tag) => !this.props.tagInput.state.items.includes(tag));
        tags = tags.filter((tag) => tag.toLowerCase().startsWith(lowerCaseInput));
        if (tags.length === 0) {
            let emptyList : string = this.props.tagInput.props.emptyTagListMessage ? this.props.tagInput.props.emptyTagListMessage : "No items found";
            return (<div className={"tag-menu"} style={this.state.style} >{emptyList}</div>);
        }
        return (
            <div className={"tag-menu"} style={this.state.style} tabIndex={-1} aria-role="list" >
                {
                    tags.map((element, index) =>
                        <TagItem key={index} tag={element} onSelectTag={this.selectTag} />
                    )
                }
            </div>
        );
    }
}