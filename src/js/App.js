import ListView from './ListView.js';

class App {
  constructor() {
    this.playersScores = [
      { name: 'some name', score: 100 },
      { name: 'some name 2', score: 80 },
      { name: 'some name 3', score: 60 },
      { name: 'some name 4', score: 40 },
      { name: 'some name 5', score: 20 },
      { name: 'some name 6', score: 0 },
    ];

    this.listView = new ListView();
  }

  init() {
    this.playersScores.forEach((player) => {
      this.listView.addScoreOf(player);
    });
  }
}

export default App;