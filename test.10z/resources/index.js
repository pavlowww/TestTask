let orderForm = document.querySelector('#orderForm');
let localStorage = window.localStorage;
let productPrice = 120;
let prise = 'Цена:' + productPrice + 'грн';

document.querySelector('.price').innerHTML = prise;

orderForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  if (localStorage.getItem('alreadySubmitted') === 'true') {
    orderForm.innerHTML = '<h2>Вы уже подавали заявку.</h2>';
    return;
  }

  if (!new Validator('orderForm').valid) {
    return false;
  }

  let formsData = {
    name: document.querySelector('input[name="name"]').value,
    phone: document.querySelector('input[name="phone"]').value,
  };

  let request = new XMLHttpRequest();
  let params =
    'name=' +
    encodeURIComponent(formsData.name) +
    '&phone=' +
    encodeURIComponent(formsData.phone);

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      let response = JSON.parse(this.response);
      if (response.status === 'success') {
        localStorage.setItem('alreadySubmitted', 'true');
        orderForm.innerHTML =
          '<h2>Ваша заявка успешно отправлена.' +
          ' Наш менеджер свяжется с вами в скором времени.</h2>';
      } else {
        orderForm.innerHTML =
          '<h2>Что-то пошло не так.' + ' Попробуйте еще раз.</h2>';
        console.log(response.message);
      }
    }
  };

  request.open('POST', 'https://asiansy.com/test/test.php', true);
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  request.send(params);
});
