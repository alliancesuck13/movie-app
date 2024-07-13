/* eslint-disable no-unreachable-loop */
export default function cutOverview(overview = "") {
  return `${overview
    .split(" ")
    .filter((word, index) => {
      while (index < 25) return word;
      return "";
    })
    .join(" ")} ... `;
}
