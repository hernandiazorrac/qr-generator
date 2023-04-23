let qrContainer = document.getElementById("qrContainer");
let input = document.getElementById("input");
let submitBtn = document.getElementById("submitBtn");
let searchHistory = document.getElementById("searchHistory");
let clearHistoryBtn = document.getElementById("clearHistory");
let qrImg = document.getElementsByTagName("img") 
let qr = new QRCode(qrContainer); //initialize qrcode.js library

let searchHistoryArray = localStorage.searchHistoryArray
  ? JSON.parse(localStorage.searchHistoryArray)
  : [];

const list = document.querySelector("ol");
list.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    input.value = e.target.textContent;
    submitBtn.disabled = false;
    submitBtn.click();
  }
});

const clearHistory = () => {
  localStorage.clear();
  searchHistoryArray = [];
  searchHistory.innerHTML = "";
};

const historyText = () => {
  if (input.value.length != 0 && !searchHistoryArray.slice(-7).includes(input.value)){
    //prevents adding an empty string to history array when loading DOM
    searchHistoryArray.push(input.value);
  }

  localStorage.searchHistoryArray = JSON.stringify(searchHistoryArray);

  searchHistory.innerHTML = "";
  searchHistoryArray
    .slice(-10)
    .reverse()
    .forEach((search, index) => {
      let li = document.createElement("li");
      let button = document.createElement("button");
      li.id = `${index + 1}`;
      button.innerHTML = search;
      button.classList = "btn btn-dark historyButton";
      button.style.cursor = "pointer";
      searchHistory.appendChild(li);
      li.appendChild(button);
    });
};

input.addEventListener("input", () => {
  if (input.value.length == 0) {
    submitBtn.disabled = true;
  } else {
    submitBtn.disabled = false;
  }
});

submitBtn.addEventListener("click", () => {
  qr.makeCode(input.value); //returns qr based on your text/link
  historyText();
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    submitBtn.click();
  }
});
