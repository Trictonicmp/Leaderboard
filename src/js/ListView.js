class ListView {
  constructor() {
    this.container = document.getElementById('list-container');
  }

  addScoreOf(player) {
    this.container.append(this.createHTMLnodeOf(player))
  }

  createHTMLnodeOf(player) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    name.innerText = player.name;
    li.append(name);
    let score = document.createElement('span');
    player.innerText = player.score;

    return li;
  }

  clearList() {
    this.container.innerHTML = '';
  }
}

export { ListView }