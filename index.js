/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for(let i = 0; i < games.length; i++) {


        // create a new div element, which will become the game card
        const game_card = document.createElement('div');


        // add the class game-card to the list
        game_card.classList.add("game-card");


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        game_card.innerHTML = `
        <img src="${games[i].img}" alt="${games[i].name}" class="game-img" />
            <h3>${games[i].name}</h3>
            <p>${games[i].description}</p>
            <p> Backers: ${games[i].backers}</p>
    `;


        // append the game to the games-container
        gamesContainer.appendChild(game_card);
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((sum, game) => sum + game.backers, 0);
// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((sum,game) => sum + game.pledged, 0)
// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;



// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length;
gamesCard.innerHTML = `${totalGames}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unFundedGames = GAMES_JSON.filter((game) => { 
        return game.pledged < game.goal
    });
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unFundedGames)

    // Display the number of unfunded games
    console.log(`Number of unfunded games: ${unFundedGames.length}`);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const FundedGames = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(FundedGames);

    // Display the number of funded games
    console.log(`Number of funded games: ${FundedGames.length}`);

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

    // Display the number of all games
    console.log(`Number of all games: ${GAMES_JSON.length}`);



}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;
const totalPledged = GAMES_JSON.reduce((accumulator, game) => accumulator + game.pledged, 0);

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `
  <p>A total of ${totalPledged.toLocaleString('en-US')} has been raised for a total of ${totalGames} games. 
  Currently, ${unfundedCount} ${unfundedCount === 1 ? "game remains" : "games remain"} unfunded.</p>
`;

// create a new DOM element containing the template string and append it to the description container
const newElement = document.createElement("div");
newElement.innerHTML = displayStr;
descriptionContainer.appendChild(newElement);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [topGame, secondGame] = sortedGames;
// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGameElement = document.createElement("p");
topGameElement.innerHTML = `Top Game: ${topGame.name} with $${topGame.pledged.toLocaleString()} pledged`;
firstGameContainer.appendChild(topGameElement);

// do the same for the runner up item
const secondGameElement = document.createElement("p");
secondGameElement.innerHTML = `Runner-Up: ${secondGame.name} with $${secondGame.pledged.toLocaleString()} pledged`;
secondGameContainer.appendChild(secondGameElement);

// Grab the search bar and button
const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");

// Function to search for a specific game
function searchGame() {
  const query = searchBar.value.toLowerCase(); // Get the search input and convert to lowercase
  deleteChildElements(gamesContainer); // Clear existing game cards

  // Filter games that match the search query
  const matchingGames = GAMES_JSON.filter(game =>
    game.name.toLowerCase().includes(query)
  );

  // If no games match, display a message
  if (matchingGames.length === 0) {
    gamesContainer.innerHTML = `<p>No games found matching "${query}"</p>`;
  } else {
    // Use the existing function to add matching games to the page
    addGamesToPage(matchingGames);
  }
}

// Add event listener to the search button
searchBtn.addEventListener("click", searchGame);

// Add "Enter" key functionality
searchBar.addEventListener("keypress", event => {
  if (event.key === "Enter") {
    searchGame();
  }
});
