import ListView from './ListView.js';
import FormManager from './FormManager.js';
import Notification from './Notification.js';
import HighScore from './HighScore.js';

class App {
  constructor() {
    this.listView = new ListView();
    this.form = new FormManager();
    this.submitButton = document.getElementById('submit-button');
    this.refreshButton = document.getElementById('refresh-button');
    this.notifications = new Notification();
    this.highScore = new HighScore();

    this.form.submitData = () => {
      this.uploadRecord();
    };
    this.refreshButton.onclick = () => {
      this.listView.clearList();
      this.loadRecords();
      this.highScore.newHighScore();
    };
  }

  init() {
    this.loadRecords();
  }

  async loadRecords() {
    await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/PonNABo4rAmKIgYZvp3D/scores/')
      .then((response) => response.json())
      .then((data) => {
        let sortedList = this.sortList(data.result);
        this.displayScores(sortedList);
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

  sortList(scoreList) {
    let sortedList = scoreList.sort((playerA, playerB) => {
      return (playerA.score > playerB.score) ? -1: 1;
    })

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
    await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/PonNABo4rAmKIgYZvp3D/scores/', {
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
}

export default App;