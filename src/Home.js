 import axios from 'axios'
 import React, { useState } from 'react'
 import './style.css'

 function Home() {
  const [data,setData] = useState({
    celcius:25,
    name: 'Patna',
    humidity:10,
    speed : 2,
    image : '/Images/clear.png'
  })
  const [name,setName] = useState("");
  const [error,setError] = useState("");
  const handleClick = () => {
    if(name != ""){
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=da459092bb8e985104586a5e2875b53f&units=metric`;
    axios.get(apiUrl)
    .then(res =>{
      let imagePath = "";
      if(res.data.weather[0].main == "Clouds"){
        imagePath = '/Images/clouds.png'
      }
      else if(res.data.weather[0].main == "Drizzle"){
        imagePath = '/Images/drizzle.png'
      }
      else if(res.data.weather[0].main == "Rain"){
        imagePath = '/Images/rain.png'
      }
      else if(res.data.weather[0].main == "Mist"){
        imagePath = '/Images/mist.png'
      }
      else if(res.data.weather[0].main == "Clear"){
        imagePath = '/Images/clear.png'
      }
      else{
        imagePath = '/Images/clouds.png'
      }
      console.log(res.data);
      setData({...data,celcius:res.data.main.temp,name: res.data.name , 
        humidity: res.data.main.humidity,speed : res.data.wind.speed, image:imagePath})
    })
    .catch(err => {
      if(err.response.status == 404){
        setError("Invalid City Name");
      }else{
        setError(" ");
      }
       console.log(err)
      });
    }
  }
   return (
     <div className='container'>
        <div className='weather'>
        <div className='search'>
  <img src="/Images/logo.png" alt="logo" className="logo-icon" />
  <input type='text' placeholder='Enter City Name' onChange={e => setName(e.target.value)} />
  <button><img src="/Images/search.png" alt='search' onClick={handleClick} /></button>
</div>

            <div className='error'>
              <p>{error}</p>
            </div>
            <div className='winfo'>
              <img src={data.image} alt='' />
              <h1>{Math.round(data.celcius)}°C</h1>
              <h2>{data.name}</h2>
              <div className='details'>
                <div className='col'>
                  <img src='/Images/humidity.png' alt='' />
                  <div className='humidity'>
                    <p>{Math.round(data.humidity)}%</p>
                    <p>Humidity</p>
                  </div>
                </div>
                <div className='col'>
                <img src='/Images/wind.png' alt='' />
                  <div className='wind'>
                    <p>{Math.round(data.speed)} km/h</p>
                    <p>Wind</p>
                  </div>
                </div>
              </div>
            </div>
        </div>
       
     </div>
   )
 }
 export default Home
 