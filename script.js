// Slectng Element From the Html 
const calorieCounter             = document.getElementById("calorie-counter");
const budgetNumberInput = document.getElementById("budget");
const entryDropdown          = document.getElementById("entry-dropdown");
const addEntryButton         = document.getElementById("add-entry");
const clearButton                 = document.getElementById("clear");
const output                          = document.getElementById("output");

// Setting state or global variables
let isError = false;

// Defining  a global functions to clean the input fields
function cleanInputString(str){
      const regex = /[+-\s]/g;
      return str.replace(regex, " ");
};

// Defining  a global functions to clean the input fields
function isInvadeInput(str){
      const regex = /\d+e\d+/i;
  return str.match(regex);
};

// A function for addEntry Button
function addEntry() {
      const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
      const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;

      // Create html element
      const HTMLString = `
      <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
      <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
      <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
      <input type="number" min="0" id="${entryDropdown.value}-${entryNumber}-calories"placeholder="Calories" />`;
      targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
    }

// A function to calculate the calories 
function calculateCalories(e){
      e.preventDefault();
      isError = false;

      // Querying All the calories input fields
      const breakfastNumberInputs = document.querySelectorAll("#breakfast input[type=number]");
      const lunchNumberInputs       = document.querySelectorAll("#lunch input[type=number]");
      const dinnerNumberInputs      = document.querySelectorAll("#dinner input[type=number]");
      const snacksNumberInputs     = document.querySelectorAll("#snacks input[type=number]");
      const exerciseNumberInputs   = document.querySelectorAll("#exercise input[type=number]");

      // Computing each calories using getCaloriesFromInputs function
      const breakfastCalories     = getCaloriesFromInputs(breakfastNumberInputs);
      const lunchCalories            = getCaloriesFromInputs(lunchNumberInputs);
      const dinnerCalories          = getCaloriesFromInputs(dinnerNumberInputs);
      const snacksCalories           = getCaloriesFromInputs(snacksNumberInputs);
      const exerciseCalories       = getCaloriesFromInputs(exerciseNumberInputs);
      const budgetCalories        = getCaloriesFromInputs([budgetNumberInput]);

      // Checking for error using if statement
      if (isError) return;

      // Summing up the Total Calories and remaining calories 
      const consumedCalories  = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
      const remainingCalories   = (budgetCalories - consumedCalories) + exerciseCalories;

      // Checking for deficit or suplus from the calculation using tenary operation
      const deficitOrSuplus =  remainingCalories >= 0 ? "Suplus" : "Deficit";
      
      // Display the result from the operation to the HTML
      output.innerHTML = `
      <span class="${deficitOrSuplus.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${deficitOrSuplus}</span>
      <hr>
      <p>${budgetCalories} Calories Budgeted</p>
      <p>${consumedCalories} Calories Consumed</p>
      <p>${exerciseCalories} Calories Burned</p>
      `;
      output.classList.remove('hide');
};

// A function to get Calories from the input element
function getCaloriesFromInputs(list){
      let calories = 0;
      // Looping through the list array
      for (let i = 0; i < list.length; i++) {
            const currVal = cleanInputString(list[i].value);
            const invalidInputMatch = isInvadeInput(currVal);

            if (invalidInputMatch){
                  alert(`Invalid Input: ${invalidInputMatch[0]}`)
                  isError = true;
                  return null;
            };
            calories += Number(currVal);
      };
      return calories;
};

// A function to clear the form fields
function clearForm(){
      const inputContainers = Array.from(document.querySelectorAll(".input-container"));

      for (let i = 0; i < inputContainers.length; i++) {
            inputContainers[i].innerHTML = "";
      };
      budgetNumberInput.value = "";
      output.innerText = "";
      output.classList.add("hide");
}

// Adding eventlistener to the buttons
addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);
clearButton.addEventListener("click", clearForm);

