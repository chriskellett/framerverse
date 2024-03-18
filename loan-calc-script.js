// Listen for when the DOM content is fully loaded to initialize script
document.addEventListener("DOMContentLoaded", function () {
  // Grab references to DOM elements that will be manipulated or read from
  const FRloanAmountInput = document.getElementById("FRloanAmountInput"); // Loan amount input field
  const FRmonthsSlider = document.getElementById("FRmonthsSlider"); // Loan term (months) slider input
  const FRmonthsDisplay = document.getElementById("FRmonthsDisplay"); // Display for loan term slider value
  const FRcreditButtons = document.querySelectorAll(
    "#FRcreditScoreSection button"
  ); // Buttons for selecting credit score
  const FRmonthlyAmount = document.getElementById("FRmonthlyAmount"); // Display for calculated monthly repayment amount
  const FRloanAmountOutput = document.getElementById("FRloanAmountOutput"); // Display for entered loan amount
  const FRcompletionFee = document.getElementById("FRcompletionFee"); // Display for calculated completion fee
  const FRinterestOutput = document.getElementById("FRinterestOutput"); // Display for calculated interest
  const FRtotalRepayable = document.getElementById("FRtotalRepayable"); // Display for total amount repayable
  let FRcurrentCredit = "Poor"; // Default credit score selection

  // Call updateCalculations once at start to initialize values
  updateCalculations();

  // Event listener to format and display the loan amount as currency while typing
  FRloanAmountInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/[^\d]/g, ""); // Remove non-digit characters
    value = parseInt(value).toLocaleString(); // Convert to integer and format as string
    e.target.value = "£" + value; // Prefix with £ symbol
    updateCalculations(); // Update calculations whenever the loan amount changes
  });

  // Event listener for the loan term slider to update display and calculations on change
  FRmonthsSlider.addEventListener("input", function (e) {
    FRmonthsDisplay.textContent = e.target.value + " months"; // Update display with new loan term
    updateCalculations(); // Recalculate values based on new loan term
  });
  
  // Event listeners for credit score buttons
FRcreditButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        FRcreditButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        FRcurrentCredit = this.textContent;
        updateCalculations();
    });
});


  // Add click event listeners to credit score buttons to update the active selection and recalculate
  FRcreditButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      FRcreditButtons.forEach((btn) => btn.classList.remove("active")); // Remove 'active' class from all buttons
      this.classList.add("active"); // Add 'active' class to clicked button
      FRcurrentCredit = this.textContent; // Update current credit score based on button text
      updateCalculations(); // Recalculate values based on new credit score
    });
  });

  // Function to calculate and update loan details based on inputs and selected credit score
  function updateCalculations() {
    const loanAmount =
      parseInt(FRloanAmountInput.value.replace(/[^\d]/g, "")) || 0; // Parse loan amount or default to 0
    const months = parseInt(FRmonthsSlider.value); // Parse loan term in months
    const completionFee = loanAmount * 0.05; // Calculate completion fee as 5% of loan amount
    let interestRate;

    // Determine interest rate based on selected credit score
    switch (FRcurrentCredit) {
      case "Poor":
        interestRate = 0.3; // 30% APR for poor credit
        break;
      case "Average":
        interestRate = 0.2; // 20% APR for average credit
        break;
      case "Great":
        interestRate = 0.1; // 10% APR for great credit
        break;
    }

    const interest = ((loanAmount * interestRate) / 12) * months; // Calculate total interest over the loan term
    const totalRepayable = loanAmount + completionFee + interest; // Calculate total amount repayable
    const monthlyRepayment = totalRepayable / months; // Calculate monthly repayment amount

    // Update DOM elements with calculated values
    FRloanAmountOutput.textContent = `Loan amount: £${loanAmount.toLocaleString()}`;
    FRcompletionFee.textContent = `Completion Fee: £${completionFee.toLocaleString(
      undefined,
      { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    )}`;
    FRinterestOutput.textContent = `Interest: £${interest.toLocaleString(
      undefined,
      { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    )}`;
    FRtotalRepayable.textContent = `Total amount repayable: £${totalRepayable.toLocaleString(
      undefined,
      { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    )}`;
    FRmonthlyAmount.textContent = `£${monthlyRepayment.toLocaleString(
      undefined,
      { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    )}`;
  }
});
