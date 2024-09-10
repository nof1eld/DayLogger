const quote = document.getElementById("quote");
const author = document.getElementById("author");
//use the date as an index (for now)
export function displayQuote() {
  import("./index.js").then((module) => {
    const index = module.currentDate[9];
    fetch("./quotes.json")
      .then((response) => response.json())
      .then((data) => {
        const quotes = data.quotes;
        quote.innerHTML = `"${quotes[index].quote}"`;
        author.innerHTML = quotes[index].author;
      });
  });
}
displayQuote();
