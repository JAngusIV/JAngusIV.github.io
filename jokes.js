// Looks for window size of 500px width and less
var x = window.matchMedia("(max-width: 501px)")
window.onload = mediaQuery(x); // Call listener function at run time
// Actively watches for changed screen size
x.addEventListener("change", mediaQuery)



// Initializes variables for when mouse hovers over button and clicks button
var hoverCount = 0;
var clickCount = 0;

// Initializes the text contents of Joke div and button, and prepares each for further input.
const jokeButton = document.querySelector(".getJoke");
const jokeHolder = document.querySelector(".joke");

/* Creates array for text that will fill in button each time it is pressed */
const buttonText = 
[
  "ugh",
  "omg dad",
  "you are the worst",
  "seriously",
  "stop it",
  "please stop",
  "that was the worst one",
  "no more",
  "stooooop",
  "this has to end",
  "you must be tired of this",
  "o m g",
  "i cant even right now",
  "pls",
  "ok that one was alright",
  "what year is it?"
];

/* Function to call a random item from an array */
// Will not repeat the same item twice.
function randomItemFromArray(arr, not) 
{
    const item = arr[Math.floor(Math.random() * arr.length)];

    if (item == not) 
    {
        console.log("Ah! we used that one last time, look again");
        return randomItemFromArray(arr, not);
    }
        
    return item;
}

/* API query for generating a random Dad Joke */
async function fetchJoke() 
{
  const response = await fetch("https://icanhazdadjoke.com", 
    {
        headers:
        {
            Accept: "application/json"
        },
    });

    const data =  response.json();
    return data;
}

/* Function for when user clicks button */
// Calls fetchJoke and generates text for random Dad Joke.
// Calls a random item from buttonText to replace text read on button with each click.
// Increments clickCount by one on successful button press.
async function handleClick() 
{
    const { joke } = await fetchJoke();
    //console.log(joke);
    jokeHolder.textContent = joke;
    jokeButton.textContent = randomItemFromArray
    (
        buttonText,
        jokeButton.textContent
    );

    clickCount++;
}


/* When button is successfully clicked, call function handleClick */
jokeButton.addEventListener("click", handleClick);


/* Function for hovering over button will cause the button's color to change to a randomly generated color */
function changeColor()
{
    document.getElementById('button1').style.backgroundColor = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);  
 
}

/* Function to scan window size */
// If window size is 500px or below, background becomes pink and button will remain static.
// If window size is greater than 500px, button will hop to a random position on mouse hover.
function mediaQuery(x) {

  if (x.matches) { // If media query matches
    document.body.style.backgroundColor = "gray";
  } else {
   document.body.style.backgroundColor = "white";
  
   /* Makes button move at random when hovered over
   $(function() {
      $("button").on({
        mouseover: function() {
          $(this).css({
            left: (-10 + Math.random() * 20) + "em",
            top: (-10 + Math.random() * 20) + "em", 
          });
          changeColor()
          hoverCount++
        }
      });
    });
    */

  }
}