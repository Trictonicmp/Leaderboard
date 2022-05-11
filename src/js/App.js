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
    this.disableButton(this.submitButton, true);
    this.form.reset();
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
      this.disableButton(this.submitButton, false);
      this.listView.clearList();
      this.loadRecords();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  disableButton(button = null, disable) {
    if(!button) return;
    if(disable) {
      button.classList.add('button-pending');
      button.disable = true;
    }
    else {
      button.classList.remove('button-pending');
      button.disabled = false;
    }
  }
}

export default App;