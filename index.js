import { displayQuote } from "./quote.js";

const date = document.getElementById("current-date");
const saveButton = document.getElementById("save-button");
const previousDayButton = document.getElementById("previous-button");
const nextDayButton = document.getElementById("next-button");
const nextDayButtonImage = document.getElementById("next-button-img");
const productivityScale = document.getElementById("productivity-scale");
const moodScale = document.getElementById("mood-scale");
const lessonsEntry = document.getElementById("lessons-entry");
const sucksEntry = document.getElementById("sucks-entry");
const thankful1 = document.getElementById("thankful-1");
const thankful2 = document.getElementById("thankful-2");

let currentDate = new Date().toISOString().split("T")[0];
const entries = JSON.parse(localStorage.getItem("journalEntries")) || {};

function updateDateDisplay() {
  date.innerHTML = currentDate;
  displayQuote();
  nextDayButtonState();
}

function nextDayButtonState() {
  const today = new Date().toISOString().split("T")[0];
  if (currentDate >= today) {
    nextDayButton.disabled = true;
    nextDayButtonImage.classList.add("disabled-img");
  } else {
    nextDayButton.disabled = false;
    nextDayButtonImage.classList.remove("disabled-img");
  }
}

function saveEntry() {
  entries[currentDate] = {
    productivity: productivityScale.value,
    mood: moodScale.value,
    todos: [
      {
        checked: document.getElementById("checkbox1").checked,
        text: document.getElementById("checkbox1-text").value,
      },
      {
        checked: document.getElementById("checkbox2").checked,
        text: document.getElementById("checkbox2-text").value,
      },
      {
        checked: document.getElementById("checkbox3").checked,
        text: document.getElementById("checkbox3-text").value,
      },
      {
        checked: document.getElementById("checkbox4").checked,
        text: document.getElementById("checkbox4-text").value,
      },
    ],
    thankful1: thankful1.value,
    thankful2: thankful2.value,
    lessons: lessonsEntry.value,
    sucks: sucksEntry.value,
  };
  localStorage.setItem("journalEntries", JSON.stringify(entries));
  saveButton.innerHTML = "Saved!";
  saveButton.style.color = "green";
  setTimeout(() => {
    saveButton.innerHTML = "Save";
    saveButton.style.color = '';
  }, 1300);
}

function loadEntry() {
  if (entries[currentDate]) {
    productivityScale.value = entries[currentDate].productivity || "";
    moodScale.value = entries[currentDate].mood || "";
    if (Array.isArray(entries[currentDate].todos)) {
      entries[currentDate].todos.forEach((todo, index) => {
        document.getElementById(`checkbox${index + 1}`).checked = todo.checked;
        document.getElementById(`checkbox${index + 1}-text`).value = todo.text;
      });
    }
    thankful1.value = entries[currentDate].thankful1 || "";
    thankful2.value = entries[currentDate].thankful2 || "";
    lessonsEntry.value = entries[currentDate].lessons || "";
    lessonsEntry.placeholder = "Edit today's lesson";
    sucksEntry.value = entries[currentDate].sucks || "";
  } else {
    resetFields();
  }
}
function resetFields() {
  productivityScale.value = "";
  moodScale.value = "";
  for (let i = 1; i <= 4; i++) {
    document.getElementById(`checkbox${i}`).checked = false;
    document.getElementById(`checkbox${i}-text`).value = "";
  }
  thankful1.value = "";
  thankful2.value = "";
  lessonsEntry.value = "";
  lessonsEntry.placeholder = "Enter today's lesson";
  sucksEntry.value = "";
}

function getPreviousDay() {
  let date = new Date(currentDate);
  date.setDate(date.getDate() - 1);
  currentDate = date.toISOString().split("T")[0];
  updateDateDisplay();
  loadEntry();
}

function getNextDay() {
  let date = new Date(currentDate);
  date.setDate(date.getDate() + 1);
  currentDate = date.toISOString().split("T")[0];
  updateDateDisplay();
  loadEntry();
}

saveButton.addEventListener("click", saveEntry);
previousDayButton.addEventListener("click", getPreviousDay);
nextDayButton.addEventListener("click", getNextDay);

function limitInputValue(input) {
  if (input.value > 10) {
    input.value = 10;
  } else if (input.value < 0) {
    input.value = 0;
  }
}

productivityScale.addEventListener("input", function () {
  limitInputValue(this);
});

moodScale.addEventListener("input", function () {
  limitInputValue(this);
});
lessonsEntry.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});

updateDateDisplay();
loadEntry();

export { currentDate };
