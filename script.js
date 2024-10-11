// Retrieve the player's score from localStorage
let playerScore = localStorage.getItem("playerScore");

// If no score is found, default to 0
if (playerScore === null) {
  playerScore = 0;
}

// Display the score in a div or any element on the index page
document.getElementById(
  "scoreDisplay"
).textContent = `Score: ${playerScore} 🏆`;

setCookie = (cName, cValue, expDays) => {
  let date = new Date();
  date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
  const expires = "expires= " + date.toUTCString();
  document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
};

getCookie = (cName) => {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie);
  const cArr = cDecoded.split("; ");
  let value;
  cArr.forEach((val) => {
    if (val.indexOf(name) === 0) value = val.substring(name.length);
  });

  return value;
};

document.querySelector("#cookies-btn").addEventListener("click", () => {
  const username = document.querySelector("#username").value;
  const email1 = document.querySelector("#email1").value;

  if (username && email1) {
    document.querySelector("#cookies").style.display = "none";
    setCookie("username", username, 30);
    setCookie("email1", email1, 30);
    displayUserMessage(username);
  } else {
    alert("Please fill in both username and email1.");
  }
});

const displayUserMessage = (username) => {
  const greeting = document.querySelector("#greeting");
  greeting.textContent = `${username}`;
};

const cookieMessage = () => {
  if (!getCookie("username")) {
    document.querySelector("#cookies").style.display = "block";
  } else {
    const username = getCookie("username");
    displayUserMessage(username);
  }
};

// Function to hide the cookie section
const hideCookieSection = () => {
  document.getElementById("cookies").style.display = "none";
};

document
  .getElementById("cancelBtn")
  .addEventListener("click", hideCookieSection);

window.addEventListener("load", cookieMessage);

const windowElement = window;

// Get the .scoreDisplay element
const scoreDisplay = document.querySelector(".scoreDisplay");

// Determine the position to switch from sticky to fixed
const switchPosition = 150; // Change this value to the scroll position where you want the change to happen

// Function to check and change the position
function checkPosition() {
  // window.pageYOffset === window.scrollY;
  if (window.scrollY > switchPosition) {
    scoreDisplay.style.position = "fixed";
    scoreDisplay.style.top = "10px"; // Adjust this value as needed
    scoreDisplay.style.right = "10px";
  } else {
    scoreDisplay.style.position = "-webkit-sticky";
    scoreDisplay.style.position = "absolute";
    scoreDisplay.style.top = "160px"; // Adjust this value as needed
    scoreDisplay.style.right = "10px";
  }
}

// Listen for scroll events
windowElement.addEventListener("scroll", checkPosition);
