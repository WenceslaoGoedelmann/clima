const form = document.getElementById("form");
const cityInput = document.querySelector(".search-input");
const cardsContainer = document.querySelector(".card-container");
const waitMsg = document.querySelector(".wait");

let cities = JSON.parse(localStorage.getItem("cities")) || []; // creo la variable donde se van a ir guadando las ciudades buscadas

const saveLocalStorage = (cities) => {//funcion para guardar en el local storage
  localStorage.setItem("cities", JSON.stringify(cities));
};

const hideWaitMsg = (cities) => { //funcion que muestra o saca el mensaje "Ingrese una ciudad..."
  if (cities.length) { //si hay elemento agrego la clase hidden (para entender ver la clase en el CSS)
    waitMsg.classList.add("hidden");
    return;
  }
  waitMsg.classList.remove("hidden");//sino hay elementos saco la clase hidden
};
const convertKelvinToCelsius = (kelvins) => Math.round(kelvins - 273.15); //funcion para convertir de kelvins a °C

const getCityHTML = (city) => {//funcion que nos crea el html de la card
  return `
        <div class="card-clima animate">
        <i class="fa-solid fa-x close" data-id="${city.id}"></i>
        <div class="clima-info">
                    <h2 class="info-title">${city.name}</h2>
                    <p class="info-subtitle">${city.weather[0].description}</p>
                    <div class="info-temp">
                    <span class="temp">${convertKelvinToCelsius(
                      city.main.temp
                    )}°</span>
                    <span class="st">${convertKelvinToCelsius(
                      city.main.feels_like
                    )}° ST</span>
                    </div>
                </div>
                <div class="clima-img">
                    <img src="./assets/img/${city.weather[0].icon}.png" alt=""/>
                </div>
                <div class="clima-temp">
                    <div class="clima-max-min">
                    <span class="clima-max"
                        ><i class="fa-solid fa-arrow-up-long"></i>Max: ${convertKelvinToCelsius(
                          city.main.temp_max
                        )}°</span
                    >
                    <span class="clima-min"
                        ><i class="fa-solid fa-arrow-down-long"></i>Min: ${convertKelvinToCelsius(
                          city.main.temp_min
                        )}°</span>
            </div>
            <span class="clima-humedad">${city.main.humidity}% Humedad</span>
        </div>
        </div>
    `;
};

const renderCitiesList = (cities) => {// funcion para renderizar las card
  cardsContainer.innerHTML = cities.map((city) => getCityHTML(city)).join("");
};

const searchCity = async (e) => { //como la funcion que nos trae la data (requestCity())es una funcion asicrona, esta funcion tambien va a ser asincrona
  e.preventDefault();
  const searchedCity = cityInput.value.trim();//guando la ciudad ingresada en el input y le quito los espacios adelante y atras si los tuviese
  if (searchedCity === "") { //creo un alert por si submitean con el input vacio
    alert("Por favor ingrese una ciudad!");
    return;
  }

  const fetchedCity = await requestCity(searchedCity); //llamo a la funcion que me trae la data de la ciudad buscada y guardo la data

  // si la API encuentra la ciudad enviada nos devuelve un objeto con el ID de la ciudad, las cordenadas, el clima, etc
  // y si no la encuentra nos envia un mensaje de erro 404
  // entonces creo una funcion que le avise al usuario que no encontro la ciudad
  if (!fetchedCity.id) { //si la respuesta es un 404 no va a tener el ID de la cuidad
    alert("La ciudad ingresada no existe!");
    form.reset();
    return;
  } else if (cities.some((city) => city.id === fetchedCity.id)) {// si ya existe la ciudad, le decimos que ya estamos mostrando el clima
    alert("Ya estamos mostrando el clima de esa ciudad!");
    form.reset();
    return;
  }

  cities = [fetchedCity, ...cities];//guardo la nueva ciudad en el array de ciudades
  renderCitiesList(cities); //renderizo la ciudades
  saveLocalStorage(cities); // guardo en el local storage
  hideWaitMsg(cities);
  form.reset();


}

const removeCity = (e) => {//funcion para eliminar una ciudad
  if (!e.target.classList.contains("close")) return; //si hago click en cualquier parte de la card que NO contenga la clase "close", sale
  // si contiente la clase "close":
  const clickedCityId = e.target.dataset.id; //guardo el id de esa card (se lo habiamos asignado en el reder de la card)

  if (window.confirm("Está seguro que desea eliminar esta card de clima?")) {
    cities = cities.filter((city) => city.id !== Number(clickedCityId)); //actualizo el array de ciudades con todas las ciudades qu no tengan el ID guardado en "clickedCityId"
    renderCitiesList(cities);
    saveLocalStorage(cities);
    hideWaitMsg(cities);
  }
};


const init = () => {
  renderCitiesList(cities);
  form.addEventListener("submit", searchCity); // cuando submiteo llamo a la funcion serchCity
  cardsContainer.addEventListener("click", removeCity); // para eliminar una ciudad
  hideWaitMsg(cities);
};
init();
