class FormManager {
  constructor() {
    this.form = document.getElementById('main-form');
    this.nameField = this.form[0];
    this.scoreField = this.form[1];

    this.form.onsubmit = (event) => {
      event.preventDefault();
      this.submitData();
    }
  }

   submitData = () => { }

   getUser() {
     return this.nameField.value;
   }

   getScore() {
     return this.scoreField.value;
   }

   reset() {
     this.form.reset();
   }
}

export default FormManager;