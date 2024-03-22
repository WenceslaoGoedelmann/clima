

const API_KEY = "8e99183ac22ab0aeb4e9bb4e89a4da31"; 

const requestCity = async (city) => { 
  const baseURL = "https://api.openweathermap.org/data/2.5/weather";
  const queryParams = `?q=${city}&appid=${API_KEY}&lang=es`;

  try { 
    const response = await fetch(baseURL + queryParams); 
    const data = await response.json(); 
    console.log(data, "data from OpenWeather");
    return data; 
  } catch (error) { 
    alert("Hubo un error al consultar la API de OpenWeather!");
  }
};

