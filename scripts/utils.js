import {createPost} from "./card.js";
export function addPostIntoStart({sectionSelector, ...rest}, place, link) {
  const section = document.querySelector(sectionSelector);
  section.prepend(createPost(rest, place, link));
}