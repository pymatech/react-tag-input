# react-tag-input

![](https://img.shields.io/github/release/pymatech/react-tag-input.svg?style=plastic)
![](https://img.shields.io/npm/v/@pymatech/react-tag-input/latest.svg?style=plastic)
![](https://img.shields.io/github/license/pymatech/react-tag-input.svg?style=plastic)

A Bootstrap v4 CSS compatible tag input component for React

## Installation

`npm install --save @pymatech/react-tag-input`

## How to use

Import the component where you wish to use it

`import TagInput from "@pymatech/react-tag-input"`

Basic syntax for the component

`<TagInput className="form-control form-group" placeholder="Enter tags..." allowAddNew={true} />`

### Notes

* Duplicate tags are disallowed
* Pressing `<ENTER>` will attempt to add a tag
* Pressing the separator will attempt to add a tag
* On leaving the form field any partially entered tag name will be cleared
* Pressing `<ENTER>` when no input is partially entered will allow a form to submit

### Props

| _Prop_              | _Description_                                                           | _Default value_          | _Example_                        |
| ------------------- | :---------------------------------------------------------------------: | :----------------------: | :------------------------------: |
| allowNewTags        | If *true* tag creation is allowed, otherwise existing tags must be used | *false*                  | true                             |
| className           | CSS classes to apply to the outer element                               | *empty string*           | form-control                     |
| defaultValue        | Initial value used to populate the tags                                 | *empty string*           | Dodge Ford Chevy                 |
| onChange            | Handler that receives the updated string value of the tags              | *undefined*              | { (value) => console.log(value)} |
| placeholder         | Text to display when there are no tags                                  | *empty string*           | Enter tags...                    |
| separator           | Separator to be used between items in the value prop                    | " "                      | ","                              |
| tags                | List of accepted tags                                                   | *undefined*              | ["Dodge","Ford","Chevy"]         |
| emptyTagListMessage | Message to display when the tag list dropdown is empty                  | "No items found"         | "No car makes found..."          |
