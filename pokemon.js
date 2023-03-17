const pokemonNames = ["bulbasaur", "charmander", "squirtle", "pikachu", "eevee"]; // my pokeman array 
const pokemonData = {}; // created a empty object 
const form = document.forms["form-data"]; //I want to get a my form from it html and linked to form in javascript
// my api call ---------------------------------------------------------------------------------------------------------
form.addEventListener("submit", (event) => { // here I'm adding a event listener on submit 
  event.preventDefault(); // this preventdefaults 
  const name = form.elements["name"].value.toLowerCase();
  if (pokemonNames.includes(name)) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`) // getting my pokemon from my pokie api 
      .then((response) => { //
        if (response.ok) { // if the response is ok or status code 200 return the JSON data
          return response.json();
        } else {// if there's an error, throw an error with a message including the name and status code

          throw new Error(`Error retrieving data for ${name}: ${response.status}`);
        }
      })
      .then((pokemonJson) => {
       // I'm getting the data from the JSON response
        const abilities = pokemonJson.abilities.map((ability) => ability.ability.name);
        const spriteUrl = pokemonJson.sprites.front_shiny;
        const baseExperience = pokemonJson.base_experience;
        const attackBaseStat = pokemonJson.stats[1].base_stat;
        const hpBaseStat = pokemonJson.stats[0].base_stat;
        const defenseBaseStat = pokemonJson.stats[2].base_stat;
        
        // I'm storing the data in the pokemonData object under the name of the pokemon
        pokemonData[name] = {
          abilities,
          spriteUrl,
          baseExperience,
          attackBaseStat,
          hpBaseStat,
          defenseBaseStat,
        };

        show_My_Pokemon_Data(name, pokemonData[name]);
      })
      .catch((error) => console.log(error));
  } else {
    displayError(`Invalid Pokemon name: ${name}`);
  }
});

// buidl my function to function to display the pokemon data in a table
function show_My_Pokemon_Data(name, data) {
  // get a reference to the table element in the HTML
  const table = document.querySelector("table");

  // create a new row in the table
  const row = table.insertRow();

  // I'm createing a a row for each piece of data and insert it into the row
  const nameCell = row.insertCell();
  const abilitiesCell = row.insertCell();
  const spriteUrlCell = row.insertCell();
  const baseExperienceCell = row.insertCell();
  const attackBaseStatCell = row.insertCell();
  const hpBaseStatCell = row.insertCell();
  const defenseBaseStatCell = row.insertCell();
   
  // conntect text or HTML content of each cell to the relevant data
  nameCell.textContent = name;
  abilitiesCell.textContent = data.abilities.join(", ");
  spriteUrlCell.innerHTML = `<img src="${data.spriteUrl}" alt="${name} sprite">`;
  baseExperienceCell.textContent = data.baseExperience;
  attackBaseStatCell.textContent = data.attackBaseStat;
  hpBaseStatCell.textContent = data.hpBaseStat;
  defenseBaseStatCell.textContent = data.defenseBaseStat;
}
//------------------------------------------------------------------------------------
