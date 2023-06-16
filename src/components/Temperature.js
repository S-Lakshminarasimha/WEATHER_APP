import React from 'react'
import '../styles/temperature.css'
import { DateTime } from 'luxon';


function Temperature(props) {
  const FormatToLocal = (secs=props.weather.sunrise ,format = 'cccc, dd LLL yyyy' )=>{
    return DateTime.fromSeconds(secs).toFormat(format)
  }
  return (
    <div id='temp'>
        <div id='city'>
            <p>{props.weather.city}</p>
            <p>{FormatToLocal()}</p>
        </div>
        <div id='climate'>
              <p>{Math.ceil(props.weather.temperature)}<sup>o</sup></p>
              <p>{props.weather.descrip}</p>
        </div>
        <div id='details'>
          <div className='factor'>
            <div>Humidity</div>
            <div>{props.weather.humidity}%</div>
          </div>
          <div className='factor'>
            <div>Air Pressure</div>
            <div>{props.weather.pressure} hPa</div>
          </div>
          
          <div className='factor'>
            <div>Visibility</div>
            <div>{props.weather.visibility/1000} Km</div>
          </div>
          <div className='factor'>
            <div>Wind Speed</div>
            <div>{props.weather.wind_speed} Km/h</div>
          </div>
        </div>
    </div>
  )
}

export default Temperature