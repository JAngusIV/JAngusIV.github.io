
var hoverCount = 0;
var clickCount = 0;


const jokeButton = document.querySelector(".getJoke");
const jokeHolder = document.querySelector(".joke");

const buttonText = 
[
  "ugh.",
  "omg dad.",
  "you are the worst",
  "seriously",
  "stop it",
  "please stop",
  "that was the worst one",
  "no more",
  "stooooop",
  "this has to end",
  "you must be tired of this",
];





 
/* Hovering over button will cause the button's color to change to a randomly generated color */
function changeColor()
{
    document.getElementById('button1').style.backgroundColor = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);  
 
}


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






function mediaQuery(x) {

    if (x.matches) { // If media query matches
      document.body.style.backgroundColor = "#FFBCD9";
    } else {
     document.body.style.backgroundColor = "white";

     /* Makes button move at random when hovered over */
     $(function() {
        $("button").on({
          mouseover: function() {
            $(this).css({
              left: (-10 + Math.random() * 20) + "em",
              top: (-10 + Math.random() * 20) + "em", 
            });
            changeColor()
          }
        });
      });
    }
  }

// Looks for window size of 500px width and less
var x = window.matchMedia("(max-width: 501px)")
window.onload = mediaQuery(x); // Call listener function at run time
// Actively watches for changed screen size
x.addEventListener("change", mediaQuery)


/* When button is clicked, call function handleClick */
jokeButton.addEventListener("click", handleClick);