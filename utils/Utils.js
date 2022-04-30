function isValidEmail(value) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(String(value).toLowerCase());
}

function validateEmail(value, setEmailError) {
  if (value === '') {
    setEmailError('');
  } else if (isValidEmail(value)) {
    setEmailError('');
  } else {
    setEmailError('Invalid Email');
  }
}
// The password must contain at least one lowercase letter, an uppercase letter, digit, and a special character

function isValidPassword(value, setPasswordError) {
  let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  return re.test(String(value));
}

function validatePassword(value, setPasswordError) {
  if (value === '') {
    setPasswordError('');
  } else if (isValidPassword(value)) {
    setPasswordError('');
  } else {
    setPasswordError('Invalid Password');
  }
}

function validateInput(value, minLength, setError) {
  if (value.length < minLength) {
    setError('Invalid Input');
  } else {
    setError('');
  }
}

function validatePhoneNumber(value, setError) {
  let re = /^01(0|1|2|5)[0-9]{8}$/;
  if (value === '') {
    setError('');
  } else if (re.test(String(value))) {
    setError('');
  } else {
    setError('Invalid Phone Number');
  }
}

const utils = {
  isValidEmail,
  validateEmail,
  validatePassword,
  validateInput,
  validatePhoneNumber,
};

export default utils;
