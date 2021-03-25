const legsResult = document.querySelector(".hero-legs-info");
const submitButton = document.querySelector("button");
const inputBox = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const dropdownContent = document.querySelectorAll(".dropdown-content");
const endPoint = "https://api.opendota.com/api/heroes";

async function fetchDotaData() {
    try {
        legsResult.innerHTML = "Counting Legs..."
        const res = await fetch(endPoint);
        const data = res.json();
        console.log(data);
        return data;
    } catch(err) {
        handleError(err);
    }
}

async function displayLegsData(requestedHero) {
   try {
        const dotaInfo = await fetchDotaData();
        //filter Heroes array to find the requested hero and then pop the hero out of the array
        //so that only that we can work with the object directly.
        const requestedHeroInfo = dotaInfo.find(name => name.localized_name === requestedHero);
        legsResult.innerHTML = `<span class="hero">${requestedHeroInfo.localized_name}</span> has <span class="number-of-legs">${requestedHeroInfo.legs}</span> legs!`;
   } catch (err) {
       handleError(err);
   }
}

submitButton.addEventListener("click", event => {
    //prevent form from refreshing page
    event.preventDefault();
    const input = document.querySelector("input");

    //Ensure input name has a capitalized first letter for API comparison
    //If a name has a "-" or a space...
    let heroName = input.value;
    if(heroName.includes("-")) {
         //split name at hyphen, capitalize the first letter of each part, lowercase the rest of the name, and join name back at hyphen
        const namesArray = heroName.split("-");
        const names = namesArray.map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase());
        heroName = names.join("-");
    } else if (heroName.includes(" ")) {
         //split name at space, capitalize the first letter of each part, lowercase the rest of the name, and join name back at space
        const namesArray = heroName.split(" ");
        const names = namesArray.map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase());
        heroName = names.join(" ");
    } else {
        heroName = input.value.charAt(0).toUpperCase() + input.value.slice(1).toLowerCase();
    }

    const requestedHero = heroName;
    displayLegsData(requestedHero);

    input.value = "";
});

async function handleError(err) {
    legsResult.textContent = `There was an error. Please try again. Ensure required characters such as "-" and spaces are included in your search.`;
}





//*******************Code for updates*************************//

// inputBox.addEventListener("focus", event => {
//     console.log(dropdown);
//     dropdown.style.display = "grid";
// });

// fetchDotaData();



