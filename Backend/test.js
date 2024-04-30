fetch(
  "https://script.google.com/macros/s/AKfycbyRsK4LUEB0RqmZKn41y85w8H_BiUZBT0GdSEUfOVfDf7ZBEEeEZPE4o5sIXfNeBrN3zQ/exec"
)
  .then((response) => response.json())
  .then((data) => {
    // Do something with the data
    console.log(data);
  })
  .catch((error) => {
    // Handle any errors
    console.error("Error:", error);
  });
