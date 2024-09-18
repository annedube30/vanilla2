function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = searchInput.value;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
