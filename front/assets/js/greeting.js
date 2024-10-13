// Function to update the greeting based on the time of day
function updateGreeting() {
  const hour = new Date().getHours();
  const greetingElement = document.getElementById("greeting");

  if (hour < 12) {
      greetingElement.innerHTML = "Good <br>morning!";
  } else if (hour < 18) {
      greetingElement.innerHTML = "Good <br>afternoon!";
  } else {
      greetingElement.innerHTML = "Good <br>evening!";
  }
}