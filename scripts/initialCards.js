import { addPostIntoStart } from "./utils.js";
export function renderInitialCards(arr, config) {
  arr.forEach((item) => addPostIntoStart(config, item.name, item.link));
}