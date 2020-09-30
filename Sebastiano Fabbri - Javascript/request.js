const key = '51584938d8ea7636f6e4a7134aee61cd';

const requestCity = async (city)=>{
  const baseURL = 'http://api.openweathermap.org/data/2.5/weather'
  const query = `?q=${city}&units=metric&lang=it&appid=${key}`;

  //prima di assegnare il valore a 'response', aspetta che arrivi il valore di fetch()
  const response = await fetch(baseURL+query);

  //promise data 
  const data = await response.json();
  return data;
}



