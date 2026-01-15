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

// broken test data for exercise 6
const brokenCharacters = [
  { id: 101, age: 50 },                 // missing name
  { id: 102, name: "", age: 22 },       // empty name (treat as invalid)
  { id: 103, age: 900 },                // missing name
  null,                                 // not an object
  { id: 104, name: "Valid Person", age: 19 },
];

/**
 * Utility: clear a list and/or show an "empty" message
 */
function clearList(listEl) {
  if (!listEl) return;
  listEl.innerHTML = "";
}

/**
 * Utility: add an <li> to a list
 */
function addListItem(listEl, text) {
  const li = document.createElement("li");
  li.textContent = text;
  listEl.appendChild(li);
}

/**
 * Utility: show an error message in a container
 */
function showError(errorContainer, message) {
  if (!errorContainer) return;

  const p = document.createElement("p");
  p.className = "error-message";
  p.textContent = message;
  errorContainer.appendChild(p);
}

/**
 * Exercise 3 + 5:
 * Render a list of names with error handling.
 * - array: array of objects
 * - listEl: target <ul>
 * - errorContainer: target <div> (optional)
 */
function renderNames(array, listEl, errorContainer) {
  clearList(listEl);
  if (errorContainer) errorContainer.innerHTML = "";

  array.forEach((item, index) => {
    // error handling (exercise 5)
    if (!item || typeof item !== "object") {
      const msg = `Item at index ${index} is not a valid object.`;
      console.error(msg, item);
      showError(errorContainer, msg);
      return;
    }

    if (!("name" in item) || typeof item.name !== "string" || item.name.trim() === "") {
      const msg = `Missing or invalid "name" for item at index ${index} (id: ${item.id ?? "unknown"}).`;
      console.error(msg, item);
      showError(errorContainer, msg);
      return;
    }

    // valid name
    addListItem(listEl, item.name.trim());
  });

  // Optional: if nothing got rendered
  if (listEl && listEl.children.length === 0) {
    addListItem(listEl, "No results found.");
    listEl.firstChild.classList.add("empty-list");
  }
}

/**
 * Exercise 4 + 5:
 * Filter by age threshold, then render names with error handling.
 */
function renderNamesBelowAge(array, ageThreshold, listEl, errorContainer) {
  const filtered = array.filter((item) => {
    // only filter real objects with numeric age
    return item && typeof item === "object" && typeof item.age === "number" && item.age < ageThreshold;
  });

  renderNames(filtered, listEl, errorContainer);
}

// ----- EXERCISE 1 -----
const namesList = document.getElementById("names-list");
console.log("Exercise 1: All character names");
characters.forEach((c) => console.log(c.name));
renderNames(characters, namesList); // no errors expected

// ----- EXERCISE 2 -----
const youngList = document.getElementById("young-characters-list");
const under40 = characters.filter((c) => c.age < 40);

console.log("Exercise 2: Characters under 40");
under40.forEach((c) => console.log(c.name));
renderNames(under40, youngList);

// ----- EXERCISE 3 -----
const functionList = document.getElementById("function-list");
renderNames(characters, functionList);

// ----- EXERCISE 4 -----
const ageFilterList = document.getElementById("age-filter-list");
renderNamesBelowAge(characters, 40, ageFilterList);

// ----- EXERCISE 5 -----
const errorHandlingList = document.getElementById("error-handling-list");
const errorMessages = document.getElementById("error-messages");

// We’ll intentionally test error handling using the broken array here,
// but still display the valid names that exist.
renderNames(brokenCharacters, errorHandlingList, errorMessages);

// ----- EXERCISE 6 -----
const brokenArrayList = document.getElementById("broken-array-list");
const brokenArrayErrors = document.getElementById("broken-array-errors");

renderNames(brokenCharacters, brokenArrayList, brokenArrayErrors);
