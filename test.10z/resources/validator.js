class Validator {
  constructor(form) {
    this.patterns = {
      name: /^[a-zA-Zа-яёА-ЯЁ]{2,32}$/,
      phone: /^\+38(050|066|099|097|067|095|093|073)[0-9]{7}$/,
    };
    this.errors = {
      name:
        'Имя должно содержать только буквы и не должно быть от 2' +
        ' до 32 символов',
      phone: 'Телефон введен не верно - формат +380ХХХХХХХХХ',
    };
    this.errorClass = 'error-msg';
    this.form = form;
    this.valid = false;
    this._validateForm();
  }

  _validateForm() {
    let errors = document
      .getElementById(this.form)
      .querySelectorAll(`.${this.errorClass}`);
    if (errors && errors.length > 0) {
      for (let error of errors) {
        error.remove();
      }
    }
    let formFields = document
      .getElementById(this.form)
      .getElementsByTagName('input');
    if (formFields && formFields.length > 0) {
      for (let field of formFields) {
        this._validate(field);
      }
    }
    if (
      document.getElementById(this.form).querySelectorAll('.invalid').length ===
      0
    ) {
      this.valid = true;
    }
  }

  _validate(field) {
    if (this.patterns[field.name]) {
      if (!this.patterns[field.name].test(field.value)) {
        field.classList.add('invalid');
        this._addErrorMsg(field);
        this._watchField(field);
      }
    }
  }

  _addErrorMsg(field) {
    let error = `<div class="${this.errorClass}">${
      this.errors[field.name]
    }</div>`;
    field.parentNode.insertAdjacentHTML('beforeend', error);
  }

  _watchField(field) {
    field.addEventListener('input', () => {
      let error = field.parentNode.querySelector(`.${this.errorClass}`);
      if (this.patterns[field.name].test(field.value)) {
        field.classList.remove('invalid');
        field.classList.add('valid');
        if (error) {
          error.remove();
        }
      } else {
        field.classList.remove('valid');
        field.classList.add('invalid');
        if (!error) {
          this._addErrorMsg(field);
        }
      }
    });
  }
}
