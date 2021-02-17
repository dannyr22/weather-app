import { useState } from 'react'

function App() {

  const api = {
    key: 'add7fbbb2a529e622bc5a8865ad8c366',
    base: 'https://api.openweathermap.org/data/2.5/'
  }
const [query, setQuery] = useState('')
const [weather, setWeather] = useState({})


const search = evt => {
  if (evt.key === 'Enter') {
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setWeather(data)
      setQuery('')
    })
  }
}


  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={
      (typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}
    >
      <main>
        <div className="search-box">
          <input 
          type="text"
           className='search-bar'
           placeholder='search...' 
           onChange={e => setQuery(e.target.value)}
           value={query}
           onKeyPress={search}
          />
        </div>
        <div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°c
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('')}
        </div>
      </main>
    </div>
  );
}

export default App;
