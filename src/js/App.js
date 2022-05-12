import ListView from './ListView.js';
import FormManager from './FormManager.js';
import Notification from './Notification.js';
import HighScore from './HighScore.js';

class App {
  constructor() {
    this.APIid = 'f8MC31icYQbzKZL6h4zd';
    this.listView = new ListView();
    this.form = new FormManager();
    this.submitButton = document.getElementById('submit-button');
    this.refreshButton = document.getElementById('refresh-button');
    this.notifications = new Notification();
    this.highScoreOverlay = new HighScore();
    this.highestScore = this.getHighestScore();

    this.form.submitData = () => {
      this.uploadRecord();
    };
    this.refreshButton.onclick = () => {
      this.listView.clearList();
      this.loadRecords();
    };
  }

  init() {
    this.loadRecords();
  }

  async loadRecords() {
    await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this.APIid}/scores/`)
      .then((response) => response.json())
      .then((data) => {
        const sortedList = this.sortList(data.result);
        this.displayScores(sortedList);
        if (parseInt(sortedList[0].score, 10) > parseInt(this.highestScore.score, 10)) {
          this.highScoreOverlay.newOverlay();
          this.saveHighestScore(sortedList[0]);
        }
      })
      .catch((error) => {
        this.notifications.newNotification('could not load the records, try again!', error);
      });
  }

  displayScores(scoreList) {
    scoreList.forEach((player) => {
      this.listView.addScoreOf(player);
    });
  }

  sortList = (scoreList) => {
    const sortedList = scoreList.sort((playerA, playerB) => (
      (parseInt(playerA.score, 10) > parseInt(playerB.score, 10)) ? -1 : 1));

    return sortedList;
  }

  uploadRecord() {
    const record = { user: '', score: 0 };
    record.user = this.form.getUser();
    record.score = this.form.getScore();
    this.disableButton(this.submitButton, true);
    this.form.reset();
    this.fetchToAPI(record);
  }

  async fetchToAPI(record) {
    await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this.APIid}/scores/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    })
      .then((response) => response.json())
      .then(() => {
        this.disableButton(this.submitButton, false);
        this.listView.clearList();
        this.loadRecords();
      })
      .catch((error) => {
        this.notifications.newNotification('could not add the new record, try again!', error);
      });
  }

  disableButton = (button = null, disable) => {
    if (!button) return;
    if (disable) {
      button.classList.add('button-pending');
      button.disable = true;
    } else {
      button.classList.remove('button-pending');
      button.disabled = false;
    }
  }

  saveHighestScore = (record) => {
    localStorage.setItem('highScore', JSON.stringify(record));
  }

  getHighestScore = () => {
    if (!localStorage.getItem('highScore')) return { user: '', score: -0 };
    const highestScore = JSON.parse(localStorage.getItem('highScore'));
    return highestScore;
  }
}

export default App;