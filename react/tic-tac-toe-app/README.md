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
4. [Pass A Prop](#Pass-A-Prop)

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

### Pass A Prop

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
