class HighScore {
  constructor() {
    this.container = document.querySelector('body');
  }

  newHighScore(message, error) {
    const newHighScoreOverlay = this.createOverlay();
    this.container.append(newHighScoreOverlay);

    newHighScoreOverlay.onanimationend = () => {
      this.container.removeChild(newHighScoreOverlay);
    };
  }

  createOverlay = () => {
    const section = document.createElement('section');
    const h2 = document.createElement('h2');
    h2.innerHTML = 'New<br> High<br> Score';
    section.append(h2);
    section.classList.add('new-highscore');
    return section;
  }
}

export default HighScore;