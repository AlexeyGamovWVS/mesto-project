// FORM LIVE VALIDATION START //

export function enableValidation() {
  const listForm = Array.from(document.forms);
  listForm.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".form__item"));
  const buttonElement = formElement.querySelector(".form__btn-save");

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputItem) => {
    inputItem.addEventListener("input", function () {
      checkInputValidity(formElement, inputItem);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("form__btn-save_disabled");
  } else {
    buttonElement.classList.remove("form__btn-save_disabled");
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  );
  inputElement.classList.add("form__item_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  );
  inputElement.classList.remove("form__item_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("form__input-error_active");
}

// FORM LIVE VALIDATION END //