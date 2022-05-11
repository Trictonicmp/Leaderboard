import ListView from './ListView.js';
import FormManager from './FormManager.js';

class App {
  constructor() {
    /* this.playersScores = [
      { user: 'some name', score: 100 },
      { user: 'some name 2', score: 80 },
      { user: 'some name 3', score: 60 },
      { user: 'some name 4', score: 40 },
      { user: 'some name 5', score: 20 },
      { user: 'some name 6', score: 0 },
    ]; */
    this.playersScores = [];

    this.listView = new ListView();
    this.form = new FormManager();
    this.submitButton = document.getElementById('submit-button');
    this.form.submitData = () => {
      this.uploadData();
    }
  }

  init() {
    /* this.playersScores.forEach((player) => {
      this.listView.addScoreOf(player);
    }); */
    this.loadData();
  }

  loadData() {
    let retrievedData = null;
    fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/PonNABo4rAmKIgYZvp3D/scores/')
    .then(response => response.json())
    .then(data => {
      retrievedData = data.result;
    });

    return retrievedData;
  }

  uploadData() {
    const record = { user: '', score: 0 };
    record.user = this.form.getUser();
    record.score = this.form.getScore();
    this.fetchData(record);
  }

  fetchData(record) {
    fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/PonNABo4rAmKIgYZvp3D/scores/', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    })
    .then(response => {
      response.json();
      this.submitButton.classList.add('button-pending');
      this.submitButton.disabled = true;
      console.log(response);
    })
    .then(data => {
      this.submitButton.classList.remove('button-pending');
      this.submitButton.disabled = false;
      console.log(data)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
}

export default App;