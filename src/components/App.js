import React,{useState,useEffect,useCallback} from 'react'
import Title from './Title'
import Search from './Search'
import Forecast from './Forecast'
import Temperature from './Temperature'
import axios from 'axios'
import '../styles/App.css'

function App() {
  const apiKey = '0e31343bb4a703431946509b986c0b6c'   // openweather
  const [city,setCity] = useState('')
  const [weather,setweather]=useState({})
  const [forecast,setForecast] = useState({})
  const [validCity, setValidCity] = useState(true);

  const getMycity= ()=>{
    try{
      navigator.geolocation.getCurrentPosition(async(pos)=>{
        const {latitude,longitude}= pos.coords
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
        const res = await axios.get(url)
        const location = res.data.display_name.split(' ')[0]
        setCity(location)
      })
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getMycity()
  },[])

  const searchInput=(inp)=>{    // Helpful to get data from the child
    setCity(inp)
  }

  const getData =  useCallback(async ()=>{
    try{
      const resWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      setweather(resWeather.data)
      setValidCity(true)

      const resForecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
      setForecast(resForecast.data)
    }
    catch(err){
      if (err.response && err.response.status === 404) {
        console.log("Get request failed due to wrong city name or city was unavailable in this free API service: 404 error");
      }
      setValidCity(false)

    }
  },[city])

  useEffect(()=>{
    console.log(city)
    getData()
 },[city,getData])




const details = {
  'city':weather?.name,
  'temperature':(weather?.main?.temp),
  'descrip':weather?.weather?.[0]?.description,
  'climateStatus':weather?.weather?.[0]?.main,
  'humidity':weather?.main?.humidity,
  'pressure':weather?.main?.pressure,
  'visibility':weather?.visibility,
  'wind_speed':weather?.wind?.speed,
  'icon':weather?.weather?.[0]?.icon,
  'dt':weather?.dt,
  'timezone': weather?.timezone,
  'sunrise':new Date(weather?.sys?.sunrise).getTime(),
  // 'sunset':new Date(weather?.sys?.sunset).getTime()
}

const timeStamps = forecast?.list
 
 if (weather.main && forecast.list){
  return (
    <div id='FoundWrapper' className={details?.temperature>=38 && details?.climateStatus==='Clear'? 'sunny'
                                :details?.climateStatus==='Clear'? 'clear'
                                :details?.climateStatus==='Clouds' ? 'cloudy'
                                :(details?.climateStatus==='Rain' || details?.climateStatus === 'Thunderstorm' || details?.climateStatus === 'Drizzle')? 'rainy'
                                :details?.climateStatus==='Mist'? 'mist'
                                :details?.climateStatus==='Haze'? 'haze'
                                :details?.climateStatus==='Snow'? 'snow'
                                :''}> 
      <Title />
      <Search searchdata={searchInput}/>
      {validCity ? (
        <>
          <Temperature weather={details}/>
          <Forecast ForecastData={timeStamps}/>
        </>
      ) : (
        <div id='invalid'>
          <p> Please enter a valid city name or try searching for other cities.</p>
        </div>
      )}
    </div>
  )
 }
 else{
  return(
    <div id='NotFoundWrapper'> 
      <Title />
      <Search searchdata={searchInput}/>
    
      <div classNames='invalid'>
        <p id='NotFound'> Note: I worked with a free API for my project that serves several major cities. If the data for your city isn't available, try searching for other cities.</p>
      </div>

      <div id='NotFoundImg'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill='#fff'><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM174.6 384.1c-4.5 12.5-18.2 18.9-30.7 14.4s-18.9-18.2-14.4-30.7C146.9 319.4 198.9 288 256 288s109.1 31.4 126.6 79.9c4.5 12.5-2 26.2-14.4 30.7s-26.2-2-30.7-14.4C328.2 358.5 297.2 336 256 336s-72.2 22.5-81.4 48.1zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
      </div>
    </div>
  )
 }
}

export default App