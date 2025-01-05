document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".btn");
  const clearButton = document.getElementById("clear");
  const equalsButton = document.getElementById("equals");

  let currentInput = "";

  // Handle button clicks
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.getAttribute("data-value");
      if (value && value !== "=" && value !== "C") {
        // Only append if value is not null or empty
        currentInput += value;
        display.value = currentInput;
      }
    });
  });

  // Handle "=" button click
  equalsButton.addEventListener("click", () => {
    console.log(`Current Input: ${currentInput}`); // Debugging line

    // Remove leading/trailing operators
    currentInput = currentInput.replace(/^[+\-*/]+|[+\-*/]+$/g, "");

    // Validate input
    if (!/^\d/.test(currentInput) || /[+\-*/]$/.test(currentInput)) {
      display.value = "Error";
      currentInput = "";
      return;
    }

    // Evaluate the expression
    try {
      const result = new Function(`return ${currentInput}`)();
      display.value = result;
      currentInput = result.toString();
    } catch (error) {
      display.value = "Error";
      currentInput = "";
    }
  });

  // Handle "C" button click
  clearButton.addEventListener("click", () => {
    currentInput = "";
    display.value = "";
  });
});

