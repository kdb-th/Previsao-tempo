import { useState, useRef, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import WeatherInformations from './componentes/WeatherInformations/WeatherInformations'
import Weather5days from './componentes/weather5days/weather5days'


const weatherBackgrounds = {
  Clear: "linear-gradient(135deg, #4da7db, #f7d070)",        // Dia ensolarado / limpo
  Rain: "linear-gradient(135deg, #2c3e50, #bdc3c7)",         // Chuva
  Drizzle: "linear-gradient(135deg, #2c3e50, #bdc3c7)",      // Chuvisco
  Thunderstorm: "linear-gradient(135deg, #0f2027, #203a43)", // Tempestade
  Clouds: "linear-gradient(135deg, #8b91a0, #79a2ec)",       // Nublado
  Snow: "linear-gradient(135deg, #006a9b, #b3e0ff)",         // Neve (Tons gélidos e esbranquiçados)
  Mist: "linear-gradient(135deg, #606c88, #3f4c6b)",         // Névoa / Neblina
  Smoke: "linear-gradient(135deg, #606c88, #3f4c6b)",        // Fumaça
  Haze: "linear-gradient(135deg, #606c88, #3f4c6b)",         // Névoa seca
  Fog: "linear-gradient(135deg, #606c88, #3f4c6b)",          // Nevoeiro denso
  Default: "linear-gradient(135deg, #4da7db, #f7d070)"       // Inicial / Padrão
};


function App() {
  const [weather, setWeather] = useState()
  const [weather5days, setWeather5days] = useState()
  const [searchCount, setSearchCount] = useState(0)


  const inputRef = useRef()

  
  
  useEffect(() => {
    if (weather && weather.weather && weather.weather[0]) {
      const mainCondition = weather.weather[0].main;
      const gradient = weatherBackgrounds[mainCondition] || weatherBackgrounds.Default;
      document.body.style.background = gradient;
    } else {
      document.body.style.background = weatherBackgrounds.Default;
    }
  }, [weather]);




  async function searchCity() {
    const city = inputRef.current.value
    const key = "bb948f84a51de514b47df4a411b3c29a"

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`
    const url5days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`

    try {
      const apiInfo = await axios.get(url)
      const apiInfo5days = await axios.get(url5days)

      setWeather5days(apiInfo5days.data) 
      setWeather(apiInfo.data) 
      setSearchCount(prev => prev + 1)
    } catch (error) {
      console.error("Erro ao buscar a cidade:", error)
    }
  }

  return (
    <div className='container'>
      <h1>Previsão do Tempo</h1>
      <input ref={inputRef} type='text'
        placeholder='Digite o nome do País/cidade' 
          onKeyDown={(e) => e.key === 'Enter' && searchCity()} />
      <button onClick={searchCity}>Buscar</button>

      {weather && (
        <div key={`current-${searchCount}`} className="animar-entrada">
          <WeatherInformations weather={weather} />
        </div>
      )}
      
      {weather5days && (
        <div key={`forecast-${searchCount}`} className="animar-entrada">
          <Weather5days weather5days={weather5days} />
        </div>
      )}
    </div>
  )
}

export default App

