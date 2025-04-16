const countriesContainer = document.getElementById("countries");
const searchInput = document.getElementById("search");
let allCountries = [];

window.addEventListener("load", function () {
  setTimeout(function () {
    document.getElementById("loader").style.display = "none";
    document.getElementById("content").style.display = "block";
  }, 1000);
});

fetch("https://restcountries.com/v3.1/all")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    allCountries = data.sort(function (a, b) {
      return a.name.common.localeCompare(b.name.common);
    });

    displayCountries(allCountries);
  })
  .catch(function (error) {
    countriesContainer.innerHTML = "<p>Failed to load countries.</p>";
    console.error("Fetch error:", error);
  });

searchInput.addEventListener("input", function () {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    displayCountries(allCountries);
    return;
  }
  const filtered = allCountries.filter(function (country) {
    return country.name.common.toLowerCase().includes(query);
  });
  displayCountries(filtered);
});

function displayCountries(countries) {
  countriesContainer.innerHTML = "";

  countries.forEach(function (country) {
    const card = document.createElement("div");
    card.className = "country-card";

    card.innerHTML = `
      <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
      <h3>${country.name.common}</h3>
      <p><strong>Capital:</strong> ${
        country.capital ? country.capital[0] : "N/A"
      }</p>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
    `;

    countriesContainer.appendChild(card);
  });
}
