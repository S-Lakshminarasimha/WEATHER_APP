import React,{useState,useEffect,useCallback} from 'react'
import Title from './Title'
import Search from './Search'
import Forecast from './Forecast'
import Temperature from './Temperature'
import axios from 'axios'
import '../styles/App.css'

function App() {

  const apiKey = '0e31343bb4a703431946509b986c0b6c'  
  const [city,setCity] = useState('Guntur')
  const [weather,setweather]=useState({})
  const [forecast,setForecast] = useState({})
  const [validCity, setValidCity] = useState(true);

  const getData = useCallback(async ()=>{
    try{
      const resWeather = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      setweather(resWeather.data)
      setValidCity(true)

      const resForecast = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
      setForecast(resForecast.data)
    }
    catch(err){
      console.log(err)
      setValidCity(false)
    }
  },[city])

  useEffect(()=>{
    getData()
  },[getData])


  const searchInput=(inp)=>{    // Helpful to get data from the child
    setCity(inp)
  }


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

  console.log(weather)
  const timeStamps = forecast?.list
 
 if (weather.main && forecast.list){
  return (
    <div id='wrapper' className={details?.temperature>=31 && details?.climateStatus==='Clear'? 'sunny' 
                                :details?.temperature<=32 && details?.climateStatus==='Clouds' ? 'cloudy'
                                :details?.temperature<=30 && details?.climateStatus==='Rain'? 'rainy'
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
          <p> Please enter a valid city name</p>
        </div>
      )}
    </div>
  )
 }
  
}

export default App