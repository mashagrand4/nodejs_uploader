window.onload = () => {
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirm_password');

  const validatePassword = () => {
    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity("Passwords Don't Match");
    } else {
      confirmPassword.setCustomValidity('');
    }
  };

  password.onchange = validatePassword;
  confirmPassword.onkeyup = validatePassword;
};
