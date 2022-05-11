import ListView from './ListView.js';
import FormManager from './FormManager.js';

class App {
  constructor() {
    this.listView = new ListView();
    this.form = new FormManager();
    this.submitButton = document.getElementById('submit-button');
    this.form.submitData = () => {
      this.uploadRecord();
    }
  }

  init() {
    this.loadRecords();
  }

  loadRecords() {
    fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/PonNABo4rAmKIgYZvp3D/scores/')
    .then(response => response.json())
    .then(data => {
      data.result.forEach(player => {
        this.listView.addScoreOf(player);
      })
    })
    .catch(error => {
      this.listView.addScoreOf({user: 'Error:', score: 'We could not get the data, pelase try again'});
    });
  }

  uploadRecord() {
    const record = { user: '', score: 0 };
    record.user = this.form.getUser();
    record.score = this.form.getScore();
    this.fetchToAPI(record);
  }

  fetchToAPI(record) {
    fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/PonNABo4rAmKIgYZvp3D/scores/', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    })
    .then(response => response.json())
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