function userProgress(time) {
  var start = 0;
  var time = Math.round((time * 1000) / 100);
  var progressElement = document.getElementById('user-progress');
  var intervalid = setInterval(function () {
    if (start > 100) {
      clearInterval(intervalid);
      userProgressCallBack();
    } else {
      progressElement.value = start;
    }
    start++;
  }, time);
}

function userProgressCallBack() {
  document.querySelector('.hiden-block').style.display = 'none';
  document.querySelector('.timerInfo').innerHTML =
    'А всё уже, надо было раньше просить:)';
}

userProgress(15);
