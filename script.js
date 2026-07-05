let search_input = document.querySelector(".input");
let card_list = document.querySelector(".card-list");
let loading = document.querySelector(".loading");
let top_div = document.querySelector(".top");
let all_countries = [];

function renderCountries(all_countries) {
    card_list.innerHTML = "";
    all_countries.forEach(function(val) {
        if(val.name && val.capital && val.population){
            let cards = document.createElement("div");
            cards.classList.add("cards");
            let img_div = document.createElement("div");
            img_div.classList.add("img");
            let img = document.createElement("img");
            img.setAttribute("src", val.media?.flag || "")
            img.onerror = function() {
                this.style.display = "none"
            }


            let name = document.createElement("h3");
            name.textContent = `Name: ${val.name}`;
            let population = document.createElement("h3");
            population.textContent = `Population: ${val.population}`;
            let capital = document.createElement("h3");
            capital.textContent = `Capital: ${val.capital}`;
        
            img_div.appendChild(img);
            cards.appendChild(img_div);
            cards.appendChild(name);
            cards.appendChild(population);
            cards.appendChild(capital);

            card_list.appendChild(cards);
        }
    })
}

async function fetchCountries() {
    card_list.style.display = "none";
    loading.style.display = "block";

    try {
        let response = await fetch("https://api.sampleapis.com/countries/countries");
        if(response.ok) {
            let data = await response.json();
            all_countries = data.filter(c => c.name && c.capital && c.population);  
            loading.style.display = "none";
            card_list.style.display = "flex";
            renderCountries(all_countries);
        }
        else {
            throw new Error("Loading Error: " + `${response.status}`);
        }
    }
    catch(err) {
        loading.textContent = err.message;
    }
}

function searchCountries() {
    let inp = search_input.value.trim().toLowerCase();
    let filtered = all_countries.filter(function(country) {
        return country.name.toLowerCase().includes(inp);
    })
    renderCountries(filtered);
}

search_input.addEventListener("input", function(val) {
    searchCountries();
})

fetchCountries();