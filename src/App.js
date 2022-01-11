import { useState } from 'react';
import axios from 'axios';
import './App.css';

let apikey = 'f8520a623608c0dd76cddb2116c822cb'
const current = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const day = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const date = `${day[current.getDay()]} ${current.getDate()}th ${monthNames[current.getMonth()]} ${current.getFullYear()}`;


function App() {

  const [city, setcity] = useState('')
  const [weather, setweather] = useState({})
  
  const icon = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;

  const handlecity = e => {
    setcity(e.target.value);
  }

  const handleweather = (e) => {
    e.preventDefault()
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apikey}`

    axios.get(url)
      .then((response) => {
        setweather(response.data)
        setcity('')
        console.log(weather)
      })
      .catch((error) => {
        console.log(error)
      })
  }


  return (
    <div className='maindiv'>
      <div className='overlay'>
        <div className='seconddiv'>
          <form onSubmit={handleweather}>
            <input type='text' placeholder='Search...' value={city} onChange={handlecity} required />
            <input type='submit' value='Search' />
          </form>
        </div>

        {
          (typeof weather.main != 'undefined') ? (
            <div>
              <div className='dynamic'>
                <div className='city'><h1>{weather.name}</h1></div>
                <div className='date'><h3>{date}</h3></div>
                <div className='degree'><h1>{Math.round(weather.main.temp)}&deg;C</h1></div>
                   <div className="desc">
                <img src={icon} alt="img" />
                <p>{weather.weather[0].description}</p>
              </div>
              </div>
            </div>
          ) : (<div className='nodata'><h1>Enter a Location</h1></div>)
        }
      </div>
    </div >
  );
}

export default App;
