class Notification {
  constructor(message, error) {
    this.container = document.querySelector('body');
    this.notification = this.createNotification(message, error);
    this.container.append(this.notification);

    this.notification.onanimationend = () => {
      this.container.removeChild(this.notification);
    }
  }

  createNotification(message, error) {
    let section = document.createElement('section');
    let p = document.createElement('p');
    p.innerText = 'Error: ' + message + '<br> | ' + error;
    section.append(p);
    section.classList.add('error-notification');
    return section;
  }
}

export default Notification;