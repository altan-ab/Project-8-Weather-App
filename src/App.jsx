import { useState, useRef, useEffect } from 'react'

const apiKey = process.env.REACT_APP_WEATHER_API_KEY
// console.log('API Key:', apiKey)

const App = () => {
  const cityInputRef = useRef(null) // Şehir input referansı
  const [cityName, setCityName] = useState('Istanbul') // Default şehir adı
  const [weatherData, setWeatherData] = useState(null) // Hava durumu bilgisi

  // Şehir adına göre hava durumu verisini çekme fonksiyonu
  const fetchWeatherData = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=tr`
      const response = await fetch(url)
      const data = await response.json()
      //console.log(data)
      setWeatherData(data)
    } catch (error) {
      console.log('Hava durumu verisi alınamadı:', error)
    }
  }

  // İlk render'da ve şehir değişikliğinde veriyi çek
  useEffect(() => {
    fetchWeatherData(cityName)
  }, [cityName])

  // "ARA" butonuna tıklandığında şehir adını güncelle
  const handleCitySearch = () => {
    const inputCity = cityInputRef.current.value
    setCityName(inputCity)
  }

  // console.log(weatherData)
  // console.log(process.env)

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-center text-2xl font-bold mb-4">
          Project-8 Weather App
        </h1>

        <div className="flex justify-center items-center mb-4">
          <input
            type="text"
            ref={cityInputRef}
            placeholder="Şehir giriniz"
            className="border p-2 w-3/4 rounded-l-lg outline-none"
          />
          <button
            onClick={handleCitySearch}
            className="bg-black text-white p-2 rounded-r-lg"
          >
            ARA
          </button>
        </div>

        {weatherData && weatherData.main ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold">{weatherData.name}</h2>
            <p className="text-gray-500">
              {new Date(weatherData.dt * 1000).toLocaleString('tr-TR', {
                weekday: 'long',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
            <h2 className="text-6xl font-bold my-4">
              {Math.round(weatherData.main.temp)} °C
            </h2>
            <p className="uppercase">{weatherData.weather[0].description}</p>
            <p className="text-gray-500 mt-4">
              Hissedilen: {Math.round(weatherData.main.feels_like)} °C | Nem:{' '}
              {weatherData.main.humidity}%
            </p>
            <hr className="my-6" />
            <div className="flex items-center justify-center">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="Hava durumu simgesi"
              />
            </div>
          </div>
        ) : (
          <p>Hava durumu bilgisi yükleniyor...</p>
        )}
      </div>
    </div>
  )
}
export default App
