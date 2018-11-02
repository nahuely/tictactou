import React, { Component } from "react";
import Header from "components/header";
import Footer from "components/footer";
import Board from "components/board";
import Controls from "components/controls";
import * as game from "services/tictactoe";
import "./layout.scss";

const Symbols = Object.freeze({
  X: "x",
  O: "o"
});

const Players = Object.freeze({
  HUMAN: "human",
  AI: "ai"
});

class App extends Component {
  state = {
    board: game.getNewBoard(),
    isOver: false,
    turn: Players.HUMAN,
    moves: []
  };

  getAIMove = board => {
    return game.minmax({ ...board }, false, -Infinity, +Infinity);
  };

  componentDidMount() {
    const { turn } = this.state;
    if (turn === Players.AI) {
      const move = this.getAIMove({ ...this.state.board });
      this.makeMove(move.move, turn);
    }
  }

  componentDidUpdate() {
    const { turn } = this.state;
    if (turn === Players.AI) {
      const move = this.getAIMove({ ...this.state.board });
      this.makeMove(move.move, turn);
    }
  }

  toggleTurn = player => {
    return player === Players.AI ? Players.HUMAN : Players.AI;
  };

  newGame = firstPlayer => {
    this.setState({ board: game.getNewBoard(), turn: firstPlayer, moves: [] });
  };

  makeMove = (move, player) => {
    const { moves } = this.state;
    const moveInt = parseInt(move, 10);
    this.setState({
      board: {
        ...this.state.board,
        [moveInt]: player === Players.AI ? Symbols.O : Symbols.X
      },
      turn: this.toggleTurn(player),
      moves: [
        ...moves,
        {
          position: moveInt,
          symbol: player === Players.AI ? Symbols.O : Symbols.X
        }
      ]
    });
  };

  onCellClick = (position, value) => {
    const { turn } = this.state;
    if (!value) {
      this.makeMove(position, turn);
    }
  };

  render() {
    const { board } = this.state;
    return (
      <div className="app">
        <header className="app__header">
          <Header />
        </header>
        <main className="app__content">
          <Board onClick={this.onCellClick} board={board} />
          <Controls onNewGame={this.newGame} />
        </main>
        <footer className="app__footer">
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;
