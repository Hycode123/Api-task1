const countriesContainer = document.getElementById("countries");
const searchInput = document.getElementById("search");

searchInput.addEventListener("input", function(event){
  const query = searchInput.value.trim();


  if (!query) {
    countriesContainer.innerHTML = "";
    return;
  }

  fetch(`https://restcountries.com/v3.1/name/${query}`)
    .then((res) =>  res.json())
    .then((data) => {
      displayCountries(data);
    })
    .catch((error) => {
      countriesContainer.innerHTML = "<p>No country found.</p>";
    });
});

function displayCountries(countries) {
  countriesContainer.innerHTML = "";

  countries.forEach((country) => {
    const card = document.createElement("div");
    card.className = "country-card";

    card.innerHTML = `
      <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
      <h3>${country.name.common}</h3>
      <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
    `;

    countriesContainer.appendChild(card);
  });
}
