import './Weather5days.css'


function Weather5days({ weather5days }){
    console.log("Dados Recebidos: ", weather5days)
    if(!weather5days || !weather5days.list){
        return <p>Carregando previsão . . .</p>
    }


    let dailyForecast = {}

        for(let forecast of weather5days.list){
            const date = new Date(forecast.dt * 1000).toLocaleDateString()

            if(!dailyForecast[date]){
                dailyForecast[date] = forecast
        }
    }



const nextFiveDays = Object.values(dailyForecast).slice(1,6)


function covertDate(data){
    const newDate = new Date(data.dt * 1000).toLocaleDateString('pt-BR', {weekday: 'long', day: '2-digit'})
    return newDate
}



    return(
        <div className='weather-container'>
            <h3>Previsão próximos 5 dias</h3>
            <div className='weather-list'>
                {nextFiveDays.map(forecast => (
                    <div key={forecast.dt} className='weather-item'>
                        <p className='forecast-day'>{covertDate(forecast)}</p>
                        <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}/>
                        <p className='forecast-description'>{forecast.weather[0].description}</p>
                        <p>{Math.round(forecast.main.temp_min)}°C Min / {Math.round(forecast.main.temp_max)}°C Max</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Weather5days