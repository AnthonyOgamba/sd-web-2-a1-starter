"use strict";

// sample data - expanded Star Wars characters with varied ages
const characters = [
  { id: 1, name: "Luke Skywalker", age: 23 },
  { id: 2, name: "Darth Vader", age: 45 },
  { id: 3, name: "Princess Leia", age: 23 },
  { id: 4, name: "Obi-Wan Kenobi", age: 57 },
  { id: 5, name: "Yoda", age: 900 },
  { id: 6, name: "Han Solo", age: 32 },
  { id: 7, name: "Chewbacca", age: 234 },
  { id: 8, name: "R2-D2", age: 33 },
  { id: 9, name: "C-3PO", age: 112 },
  { id: 10, name: "Padmé Amidala", age: 27 },
];

// broken test data for exercise 6 (includes multiple valid + invalid)
const brokenCharacters = [
  { id: 101, age: 50 },            // missing name
  { id: 102, name: "", age: 22 },  // invalid name (empty)
  { id: 103, age: 900 },           // missing name
  null,                            // not an object
  { id: 104, name: "Rey", age: 20 },
  { id: 105, name: "Finn", age: 23 },
  { id: 106, name: "Poe Dameron", age: 31 },
];

/* ---------- Small helpers ---------- */
function clearElement(el) {
  if (el) el.innerHTML = "";
}

function appendLi(listEl, text) {
  const li = document.createElement("li");
  li.textContent = text;
  listEl.appendChild(li);
}

function appendError(errorEl, message) {
  const p = document.createElement("p");
  p.className = "error-message";
  p.textContent = message;
  errorEl.appendChild(p);
}

/* ---------- Exercise 3 + 5 function (enhanced with error handling) ---------- */
/**
 * Takes ANY array of objects and renders names into a target <ul>.
 * If an object has no "name", logs error and (if provided) prints it on the page.
 */
function renderNameList(array, listEl, errorEl) {
  clearElement(listEl);
  if (errorEl) clearElement(errorEl);

  array.forEach((item, index) => {
    // Exercise 5: check for name property before using it
    if (!item || typeof item !== "object") {
      const msg = `Item at index ${index} is not a valid object.`;
      console.error(msg, item);
      if (errorEl) appendError(errorEl, msg);
      return;
    }

    if (!("name" in item)) {
      const msg = `Missing "name" property for item at index ${index} (id: ${item.id ?? "unknown"}).`;
      console.error(msg, item);
      if (errorEl) appendError(errorEl, msg);
      return;
    }

    if (typeof item.name !== "string" || item.name.trim() === "") {
      const msg = `Invalid "name" value for item at index ${index} (id: ${item.id ?? "unknown"}).`;
      console.error(msg, item);
      if (errorEl) appendError(errorEl, msg);
      return;
    }

    // valid name
    appendLi(listEl, item.name.trim());
  });
}

/* ---------- Exercise 4 + 5 function (enhanced with error handling) ---------- */
/**
 * Takes an array and an age threshold, filters below threshold, then renders names.
 */
function renderNamesBelowAge(array, ageThreshold, listEl, errorEl) {
  const filtered = array.filter((item) => {
    return item && typeof item === "object" && typeof item.age === "number" && item.age < ageThreshold;
  });

  // Reuse the Exercise 3 function (and its error handling)
  renderNameList(filtered, listEl, errorEl);
}

/* ---------- EXERCISE 1 ---------- */
const namesList = document.getElementById("names-list");

characters.forEach((character) => {
  console.log(character.name); // required console output
  appendLi(namesList, character.name); // required DOM output
});

/* ---------- EXERCISE 2 ---------- */
const youngList = document.getElementById("young-characters-list");

const under40 = characters.filter((character) => character.age < 40);

under40.forEach((character) => {
  console.log(character.name); // required console output
  appendLi(youngList, character.name); // required DOM output
});

/* ---------- EXERCISE 3 ---------- */
const functionList = document.getElementById("function-list");
renderNameList(characters, functionList);

/* ---------- EXERCISE 4 ---------- */
const ageFilterList = document.getElementById("age-filter-list");
renderNamesBelowAge(characters, 40, ageFilterList);

/* ---------- EXERCISE 5 ---------- */
const errorHandlingList = document.getElementById("error-handling-list");
const errorMessages = document.getElementById("error-messages");

// Use mostly valid data + one broken object to demonstrate Exercise 5 clearly
const exercise5Test = [...characters, { id: 999, age: 30 }]; // missing name on purpose
renderNameList(exercise5Test, errorHandlingList, errorMessages);

/* ---------- EXERCISE 6 ---------- */
const brokenArrayList = document.getElementById("broken-array-list");
const brokenArrayErrors = document.getElementById("broken-array-errors");

// Pass brokenCharacters to the same error-handling functions
renderNameList(brokenCharacters, brokenArrayList, brokenArrayErrors);
