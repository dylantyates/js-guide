# React Guide

This guide follows the official [React Tutorial](https://reactjs.org/tutorial/tutorial.html) to create a simple tic-tac-toe game.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Initial Setup

I recommend using [Yarn](https://yarnpkg.com/en/) as an alternative to [npm](https://www.npmjs.com/).

```bash
brew install yarn
```

## Overview

1. [Setup Local Development Environment](#Setup-Local-Development-Environment)
2. [Refactor Create-React-App](#Refactor-Create-React-App)
3. [Add Source Files](#Add-Source-Files)
4. [Pass A Prop To Square](#Pass-A-Prop-To-Square)
5. [Add Event Handler To Square](#Add-Event-Handler-To-Square)
6. [Initialize Game State In Square](#Initialize-Game-State-In-Square)
7. [Lift Up Game State To Board](#Lift-Up-Game-State-To-Board)
8. [Remove Game State From Square](#Remove-Game-State-From-Square)
9. [Add Game State Event Handler](#Add-Game-State-Event-Handler)
10. [Make Square A Functional Component](#Make-Square-A-Functional-Component)
11. [Add Player Turns To Game State](#Add-Player-Turns-To-Game-State)
12. [Add Game Winning Logic](#Add-Game-Winning-Logic)
13. [Lift Up Game State To Game](#Lift-Up-Game-State-To-Game)

### Setup Local Development Environment

```bash
npm install -g create-react-app
cd react

yarn create react-app tic-tac-toe-app
cd tic-tac-toe-app
```

### Refactor Create-React-App

```bash
cd tic-tac-toe-app
rm -rfv src/*
```

### Add Source Files

```bash
touch index.js
touch index.css
```

Copy source code from the following pens: [index.js](https://codepen.io/gaearon/pen/oWWQNa?editors=0010) and [index.css](https://codepen.io/gaearon/pen/oWWQNa?editors=0100)

<strong>index.js</strong>

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// This goes above your copied code
```

### Pass A Prop To Square

<strong>index.js</strong>

```js
// BOARD
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />; // Pass props to Square
  }
}

// SQUARE
class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {this.props.value} // Add props to Square
      </button>
    );
  }
}
```

### Add Event Handler To Square

```js
class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        onClick={() => alert('click')}> // Add onClick event handler
        {this.props.value}
      </button>
    );
  }
}
```

### Initialize Game State In Square

```js
class Square extends React.Component {
  // Add constuctor class to initialize state
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button
        className="square"
        onClick={() => this.setState({value: 'X'})}> // Update state with onClick event handler
        {this.state.value} // Update from props to state
      </button>
    );
  }
}
```

### Lift Up Game State To Board

```js
class Board extends React.Component {
  // Initialize Board state
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]} // Pass Board State to Square
        onClick={() => this.handleClick(i)} /> // Maintain Board state's privacy
    ); // Added return (...); for legibility
  }

  // ... //
}
```

### Remove Game State From Square

```js
class Square extends React.Component {
  render() {

    // Remove constructor()

    return (
      <button
        className="square"
        onClick={() => this.props.onClick()}> // Add game state onClick event handler
          {this.props.value} // Replace state with props
      </button>
    );
  }
}
```

### Add Game State Event Handler

```js
class Board extends React.Component {
  constructor(props) {
    ...
  }

  // Add game state event handler
  handleClick(i) {
    const squares = this.state.squares.slice(); // Use slice() for immutability
    squares[i] = 'X'; // Mark 'X' in Square
    this.setState({squares: squares}); // Set game state
  }

  renderSquare(i) {
    ...
  }

  render() {
    ...
  }
}

// NOTE: Square is now a CONTROLLED COMPONENT
```

### Make Square A Functional Component

```js
// Replace Square class with function
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
```

### Add Player Turns To Game State

```js
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      names: Array(2).fill('One', 'Two'), // Custom
      playerOne: true, // This is xIsNext in the original tutorial
      playerName: true, // Custom
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    const names = this.state.square.slice(); // Custom
    names[i] = this.state.playerName ? 'One' : 'Two'; // Custom
    squares[i] = this.state.playerOne ? 'X' : 'O'; // Toggle values between 'X' and 'O'
    this.setState({
      squares: squares,
      names: names, // Custom
      playerOne: !this.state.playerOne, // Toggle boolean to switch turns
      playerName: !this.state.playerName, // Custom
    });
  }

  renderSquare(i) {
    ...
  }

  render() {
    const status = 'Player ' + (this.state.playerName ? 'One' : 'Two') + '(' + (this.state.playerOne + ')'; // Custom
    ...
  }
}

// All lines noted with '//custom' are my own modifications for steez :)
```

### Add Game Winning Logic

```js
// Add helper function to check if player wins
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]; // Possible winning combos

  // Loop through game state and match winning values
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Square(props) {
  ...
}

class Board extends React.Component {
  constructor(props) {
    ...
  }

  handleClick(i) {
    ...
    // Add early return to cancel clicks after player wins
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    ...
    });
  }

  renderSquare(i) {
    ...
  }

  render() {
    ...
    // Render helper function
    const winner = calculateWinner(this.state.squares);
    let status;
    // Render winning message or player turn
    if (winner) {
      status = 'Player ' + (!this.state.playerName ? 'One' : 'Two') + ' Wins!';
    } else {
      status = 'Player ' + (this.state.playerName ? 'One' : 'Two') + ' (' + (this.state.playerOne ? 'X' : 'O') + ')';
    }
    ...
  }
}

class Game extends React.Component {
  ...
}

// ========================================

ReactDOM.render(
  ...
);
```

### Lift Up Game State To Game

```js
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <h1>Tic-Tac-Toe</h1>
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
```
