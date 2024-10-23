// Variables
// Variable to hold the random number
let y;


// Counting the number of guesses
let guess = 0; 

// max range set
let max;


// Best Score counter -saved
let bestScore;

if (localStorage.getItem('bestScore')) {
    bestScore = parseInt(localStorage.getItem('bestScore'));
} else {
    bestScore = Infinity;
}

// Display initial best score ( set to "Infinity if there is no bestScore saved")
if (bestScore === Infinity) {
    document.getElementById("best_score").innerText = "Best score until now: N/A";
} else
 { 
    document.getElementById("best_score").innerText = `Best score until now: ${bestScore}`;
}

//-----------------------------------------------------------------------------

// Start new game function

document.getElementById("start_game").onclick = function () {
    const selectedRange = parseInt(document.getElementById("range_selector").value);

    max = selectedRange;
  

    // Random number generator based on selected range
    y = Math.floor(Math.random() * max) + 1;
    
    // Reset guess count
    guess = 0; 

    // Displays the guess section
    document.getElementById("guess_section").style.display = 'block';

    // Displays guess count 
    document.getElementById("guess_count").style.display = 'block'; 

    // Initialize displayed guess count
    document.getElementById("count").innerText = guess; 
    alert(`A new number has been selected between 1 and ${selectedRange}. Start guessing!`);
    

    // Clear hint element display
    document.getElementById('hint').innerText = '';

     // Enable the submit button in case it was disabled
     document.getElementById("submit_guess").disabled = false;

};


//-----------------------------------------------------------------------------

// Function to check/compare the numbers
document.getElementById("submit_guess").onclick = function () {
    check_number();
};

function check_number() {
    let x = parseInt(document.getElementById("guess_input_field").value);

    // Increment the guess count
    guess++;

    // Update the displayed guess count
    document.getElementById("count").innerText = guess;

    // Variable to hold hint messages
    let hintMessage = "";

    if (x === y) {
        document.getElementById('hint').style.color = "green";
        hintMessage = `Congratulations! You guessed the number in: ${guess} guesses`;
        
        // Check and update best score
        if (guess < bestScore) {
            bestScore = guess;
            localStorage.setItem('bestScore', bestScore);
        }


    // Update best score display
    document.getElementById("best_score").innerText = `Best score: ${bestScore}`;




 // Disable the submit button after a correct guess
 document.getElementById("submit_guess").disabled = true;

    } else if (x <= 0 || x > max ) {
        alert('Your number is not in the range. Try again!');

    } 
    
    else if (x > y) {
        document.getElementById('hint').style.color = "red";
        hintMessage = "The number is SMALLER. Try again!";
    } 
    
    else {
        document.getElementById('hint').style.color = "red";
        hintMessage = "The number is BIGGER. Try again!";
    }

   

    // Update the hint display area
    document.getElementById("hint").innerText = hintMessage;

    // Clear the input field after each guess
    document.getElementById("guess_input_field").value = '';

    // Automatically place the cursor on the input field
    document.getElementById("guess_input_field").focus();
}

//-----------------------------------------------------------------------------


// Event listener for ENTER key in the guess input field
document.getElementById("guess_input_field").addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        // Call the function to check the guess
        check_number(); 
    }
});


