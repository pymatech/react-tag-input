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

`<TagInput className="form-control form-group" placeholder="Enter tags..." />`

### Props

| _Prop_       | _Description_                                              | _Default value_   | _Example_                        |
| ------       | :--------------------------------------------------------: | :---------------: | :------------------------------: |
| className    | CSS classes to apply to the outer element                  |  *empty string*   | form-control                     |
| placeholder  | Text to display when there are no tags                     |  *empty string*   | Enter tags...                    |
| separator    | Separator to be used between items in the value prop       | " "               | ","                              |
| defaultValue | Initial value used to populate the tags                    |  *empty string*   | Dodge Ford Chevy                 |
| onChange     | Handler that receives the updated string value of the tags |                   | { (value) => console.log(value)} |