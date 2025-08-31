import axios from "axios"
import { useState } from "react";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  interface WeatherData {
  weather: { description: string; icon: string }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  sys:{
    country:string
  };
  wind:{
    speed:number;
  }
  name:string;
  
}  
function App() {
  
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const [location,setLocation] = useState('');

const url =  `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`

  const searchLocation = (e : React.KeyboardEvent<HTMLInputElement>) => {
       if(e.key === 'Enter'){
           axios.get(url).then((response) => {
      setWeather(response.data);
      console.log(response.data);
      
    })
    setLocation('')
       }
  }
  return (
    <>
       <div className="app">
          <div className="search">
            <input 
            onChange={(e) => setLocation(e.target.value)}
             type="text" 
              value={location}
              placeholder="Enter city"
              className="text-4xl text-center"
              onKeyDown={searchLocation}
              />
          </div>
           <div className="container">
             <div className="top">
                <div className="location">
                  <p>{weather?.name}</p>
             </div>
              <div className="temp">
                   {/* <h1 className="font-bold"> {weather?.main.temp.toFixed()}  </h1> */}
                                  {weather?.main ? <p className='bold'>{weather?.main.feels_like.toFixed()}°C</p> : null}
              </div>
              <div className="description">
                <p>{weather?.weather?.[0].main}</p>
              </div>

              {weather?.name !== undefined &&
                   <div className="bottom">
              <div className="feels">
                   <p className="font-bold">{weather?.main.feels_like.toFixed()}</p>
                   <p>Feels Like </p>

              </div>
              <div className="humidity">
                <p className="font-bold">{weather?.main.humidity.toFixed()}</p>
                <p>Humidity  </p>
              </div>
              <div className="wind">
                < p className="font-bold"> {weather?.wind.speed.toFixed()}</p>
                <p>Wind Speed</p>
              </div>
             
             </div>
              }
        
           </div>
      </div> 
      </div>
      
    </>
  )
}

export default App;
