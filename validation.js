const setSuccess = element => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');

  errorDisplay.innerText = '';
  inputControl.classList.add('success');
  inputControl.classList.remove('error');
};

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');

  errorDisplay.innerText = message;
  inputControl.classList.add('error');
  inputControl.classList.remove('success')
}

const validateInputs = (name, value) => {

  let element = form.querySelector(`[name="${name}"]`);

  if(value === '') {
      setError(element, 'Value can not be empty');
      return false;
  } else {
      setSuccess(element);
  }
};
