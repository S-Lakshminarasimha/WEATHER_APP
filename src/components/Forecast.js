import React from 'react'
import '../styles/forecast.css'
function Forecast(props) {
  const { ForecastData = [] } = props;
  return (
    <div id='forecast'>
        <div id='timeline'>
      {
        ForecastData && ForecastData.map((day,index)=>{
          const {dt_txt,main,weather} = day
          const icon = weather[0].icon
          return <div key={index} className='timestamps'> 
              <p>{dt_txt.slice(5,16)}</p>
            
              <div><img src={`https://openweathermap.org/img/wn/${icon}.png`}  alt={weather[0].description}></img></div>
              <p>{Math.ceil(main.temp)}<sup>o</sup></p>
            </div>
        })
      }
        </div>
    </div>
  )
}

export default Forecast