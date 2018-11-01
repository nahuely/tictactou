import React, { Component } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import Board from "./components/board";
import Controls from "./components/controls";
import "./layout.css";

class App extends Component {
  render() {
    return (
      <div class="app">
        <header class="app__header">
          <Header />
        </header>
        <main class="app__content">
          <Board />
          <Controls />
        </main>
        <footer class="app__footer">
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;
