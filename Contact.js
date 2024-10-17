document.getElementById('contact_form').addEventListener('submit', function (e) {
  e.preventDefault();

  const errorElement = document.querySelectorAll('.error_message');
  errorElement.forEach(e => e.style.display = 'none');

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  let formValid = true;

  if (name == '') {
    alert("Please enter your name.");
    formValid = false;
  }

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email == '' || !emailValid.test(email)) {
    alert("Please enter a valid email address.");
    formValid = false;
  }

  if (message == '') {
    alert("Please enter a message.");
  }

  if (formValid) {
    alert('You have successfully contacted us. We will get back with you shortly.');
    document.getElementById('contact_form').reset();
  }
})