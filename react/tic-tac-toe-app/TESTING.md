# Tic-Tac-Toe Testing

This guide provides a base for testing with [Jest](https://jestjs.io/) and [Enzyme](http://airbnb.io/enzyme/) for the official [React Tutorial](https://reactjs.org/tutorial/tutorial.html) to create a simple tic-tac-toe game.

## Initial Setup

```bash
yarn add enzyme enzyme-adapter-react-16 react-test-renderer -D
```

## Overview

1. [Basic Unit Tests](#basic-unit-tests)
2. [Functional Test For Board](#functional-test-for-board)

### Basic Unit Tests

These are simple tests to see if the component renders. `Square` and `Game` should pass and `Board` should fail with `TypeError: Cannot read property '0' of undefined`

`Square.js`

```js
import React from 'react';
import Square from './Square';
import { shallow } from 'enzyme';

it ('renders without crashing', () => {
  shallow(<Square />);
});
```

`Game.js`

```js
import React from 'react';
import Game from './Game';
import { shallow } from 'enzyme';

it ('renders without crashing', () => {
  shallow(<Game />);
});
```

`Board.js`

```js
import React from 'react';
import Board from './Board';
import { shallow } from 'enzyme';

it ('renders without crashing', () => {
  shallow(<Board />);
});
```

### Functional Test For Board

Board should pass its test after empty `squares` array prop is passed for correct rendering.

`Board.js`

```js
import React from 'react'
import Board from './board'
// Add mount import
import {shallow, mount} from 'enzyme'

it ('renders without crashing', () => {
  let squares = Array(9).fill(null)
  shallow(<Board squares={squares}/>);
});

it ('calls onClick event on click of a board square', () => {
  // Empty squares array
  let squares = Array(9).fill(null)
  // Jest mock function
  const onClick = jest.fn();
  // Mount to render Board with Squares
  let wrapper = mount(<Board squares={squares} onClick={onClick}/>);
  // Enzyme selector to access element and click simulator
  wrapper.find('button.square').first().simulate('click');
  // Expect onClick(0)
  expect(onClick).toBeCalledWith(0);
})
```
