class Notification {
  constructor() {
    this.container = document.querySelector('body');
  }

  newNotification(message, error) {
    const newNotification = this.createNotification(message, error);
    this.container.append(newNotification);

    newNotification.onanimationend = () => {
      this.container.removeChild(newNotification);
    };
  }

  createNotification = (message, error) => {
    const section = document.createElement('section');
    const p = document.createElement('p');
    p.innerText = `Error: ${message} | ${error}`;
    section.append(p);
    section.classList.add('error-notification');
    return section;
  }
}

export default Notification;