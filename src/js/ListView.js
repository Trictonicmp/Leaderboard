class ListView {
  constructor() {
    this.container = document.getElementById('list-container');
  }

  addScoreOf(player) {
    this.container.append(this.createHTMLnodeOf(player));
  }

  createHTMLnodeOf = (player) => {
    const li = document.createElement('li');
    const name = document.createElement('span');
    name.innerText = player.name;
    li.append(name);
    const score = document.createElement('span');
    score.innerText = player.score;
    li.append(score);

    return li;
  }

  clearList() {
    this.container.innerHTML = '';
  }
}

export default ListView;