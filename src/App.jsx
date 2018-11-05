import React, { Component } from "react";
import ReactGA from "react-ga";
import Header from "components/header";
import Footer from "components/footer";
import Board from "components/board";
import Timeline from "components/timeline";
import Controls from "components/controls";
import * as game from "services/tictactoe";
import { SYMBOLS, PLAYERS, GAME_RESULT } from "constants/game";
import "./layout.scss";

ReactGA.initialize("UA-128606095-1");

class App extends Component {
  constructor(props) {
    super(props);
    ReactGA.pageview("/");
  }

  state = {
    board: game.getNewBoard(),
    gameResult: null,
    turn: PLAYERS.human,
    moves: [],
    winningPosition: null,
    currentPreviewPosition: null
  };

  getAIMove = board => {
    return game.minmax({ ...board }, false, -Infinity, +Infinity);
  };

  componentDidMount() {
    const { turn, gameResult } = this.state;
    if (turn === PLAYERS.ai && !gameResult) {
      const move = this.getAIMove({ ...this.state.board });
      this.makeMove(move.move, turn);
    }
  }

  componentDidUpdate() {
    const { turn, gameResult } = this.state;
    if (turn === PLAYERS.ai && !gameResult) {
      const move = this.getAIMove({ ...this.state.board });
      this.makeMove(move.move, turn);
    }
  }

  toggleTurn = player => (player === PLAYERS.ai ? PLAYERS.human : PLAYERS.ai);

  onChangeTimeline = pointer => {
    const { moves } = this.state;
    const includedMoves = moves.slice(0, pointer);
    const newBoard = game.getNewBoard();

    includedMoves.forEach(move => {
      newBoard[move.position] = move.symbol;
    });

    this.setState({ board: newBoard, currentPreviewPosition: pointer });
  };

  newGame = firstPlayer => {
    ReactGA.event({
      category: 'game',
      action: 'new game',
      value: firstPlayer
    });

    this.setState({
      board: game.getNewBoard(),
      turn: firstPlayer,
      moves: [],
      gameResult: null,
      winningPosition: null,
      currentPreviewPosition: null
    });
  };

  makeMove = (move, player) => {
    const { moves, gameResult } = this.state;
    if (!gameResult) {
      if (move !== undefined) {
        const symbol = player === PLAYERS.ai ? SYMBOLS.o : SYMBOLS.x;
        const newBoard = { ...this.state.board, [move]: symbol };

        const playerSquares = game.getCellsByPlayer(newBoard, symbol);
        const isThereAWin = game.isAWinningPosition(playerSquares);
        const isDraw = game.isDraw(newBoard);

        const state = {
          board: newBoard,
          turn: this.toggleTurn(player),
          moves: [...moves, { position: move, symbol: symbol }]
        };

        if (isThereAWin > -1) {
          ReactGA.event({
            category: 'game',
            action: 'game finished',
            value: GAME_RESULT[symbol]
          });

          state.gameResult = GAME_RESULT[symbol];
          state.winningPosition = game.winningPositions[isThereAWin];
        } else if (isDraw) {
          ReactGA.event({
            category: 'game',
            action: 'game finished',
            value: GAME_RESULT.draw
          });

          state.gameResult = GAME_RESULT.draw;
        }
        this.setState(state);
      } else {
        ReactGA.event({
          category: 'game',
          action: 'game finished',
          value: GAME_RESULT.draw
        });

        this.setState({ gameResult: GAME_RESULT.draw });
      }
    }
  };

  getGameResultString = () => {
    const { gameResult } = this.state;
    let output = null;
    if (gameResult === GAME_RESULT.x || gameResult === GAME_RESULT.o) {
      output = `The winner is ${gameResult.toUpperCase()} 🎉`;
    } else if (gameResult === GAME_RESULT.draw) {
      output = `The game was a TIE 🐻`;
    }
    return output;
  };

  onCellClick = (position, value) => {
    const { turn, gameResult } = this.state;
    if (!value && !gameResult) {
      this.makeMove(parseInt(position, 10), turn);
    }
  };

  shouldShowWinningPosition = () => {
    const { winningPosition, currentPreviewPosition, moves } = this.state;
    if (winningPosition) {
      if (
        currentPreviewPosition &&
        parseInt(currentPreviewPosition, 10) === moves.length
      ) {
        return winningPosition;
      } else if (!currentPreviewPosition) {
        return winningPosition;
      }
      return null;
    }
    return winningPosition;
  };

  render() {
    const { board, gameResult, moves, currentPreviewPosition } = this.state;
    return (
      <div className="app">
        <header className="app__header">
          <Header />
        </header>
        <main className="app__content">
          <div className="app__content__game">
            <Board
              onClick={this.onCellClick}
              board={board}
              winningPosition={this.shouldShowWinningPosition()}
            />

            {gameResult ? (
              <Timeline
                moves={moves}
                onChange={this.onChangeTimeline}
                value={currentPreviewPosition}
              />
            ) : null}
            <div className="app__content__game__result">
              <p>{this.getGameResultString()}</p>
            </div>
            <Controls onNewGame={this.newGame} />
          </div>
        </main>
        <footer className="app__footer">
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;
