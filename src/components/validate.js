import { toggleButtonState } from "./utils.js";

export function enableValidation(config) {
  const forms = Array.from(document.forms);
  forms.forEach((form) => {
    setEventListeners(form, config);
  });
}

function setEventListeners(form, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) {
  const inputs = Array.from(form.querySelectorAll(inputSelector));
  const submitBtn = form.querySelector(submitButtonSelector);
  toggleButtonState(form, submitBtn, inactiveButtonClass);
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(input, rest);
      toggleButtonState(form, submitBtn, inactiveButtonClass);
    });
  });
}

export function checkInputValidity(input, {labelSelector, errorElementSelector, ...rest}) {
  const errorElement = input
    .closest(labelSelector)
    .querySelector(errorElementSelector);
  const isValid = input.validity.valid;
  if (!isValid) {
    showInputError(input, errorElement, rest);
  } else {
    hideInputError(input, errorElement, rest);
  }
}

function showInputError(inputElement, errorElement, {inputErrorClass, errorElementClass}) {
  const errorMessage = inputElement.validationMessage;
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorElementClass);
}

function hideInputError(inputElement, errorElement, {inputErrorClass, errorElementClass}) {
  const errorMessage = inputElement.validationMessage;
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.remove(errorElementClass);
}