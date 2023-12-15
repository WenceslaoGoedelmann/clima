/*
URL que nos da la API
    https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

    siempre lo que sigue de un ? en una URL son los query params
*/

const API_KEY = "8e99183ac22ab0aeb4e9bb4e89a4da31"; //esta key la obtengo creandome una cuenta en la pagina

const requestCity = async (city) => { //como va a ser una funcion asincrona, antes de los parametros le tengo que agregar async
  const baseURL = "https://api.openweathermap.org/data/2.5/weather";// primer pedazo de la URL, esta parte no cambia
  const queryParams = `?q=${city}&appid=${API_KEY}&lang=es`;// en esta parte de la URL le tengo que poner la ciudad que quiero ver el clima y mi apiKey

  try { // respuesta de exito
    const response = await fetch(baseURL + queryParams); // esta promesa nos devuelve un objeto de tipo "ReadableStream" por lo cual lo debo pasar a un objeto de tipo JSON
    const data = await response.json(); //lo paso a formato JSON
    console.log(data, "data from OpenWeather");
    return data; //retorno la data
  } catch (error) { //respuesta de fracaso
    alert("Hubo un error al consultar la API de OpenWeather!");
  }
};

//requestCity('Rosario')