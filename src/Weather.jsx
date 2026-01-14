import React, { useState } from 'react';
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion

function Weather() {
  const [city, setcity] = useState("");
  const [weather, setweather] = useState("");
  const [temp, settemp] = useState("");
  const [desc, setdesc] = useState("");

  function handleCity(evt) {
    setcity(evt.target.value);
  }

  function getWeather() {
    var weatherData = axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c6f070d58f28628f558af80f40ab0bf7&units=metric`);

    weatherData.then(function (success) {
      setweather(success.data.weather[0].main);
      settemp(success.data.main.temp);
      setdesc(success.data.weather[0].description);
    }).catch(function (error) {
      alert("City not found!");
    });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1a1c1e] p-6">
      {/* ANIMATION: Card slides up and fades in */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl bg-emerald-500 rounded-lg p-10 shadow-2xl min-h-[350px]"
      >
        <h1 className="text-3xl font-bold text-zinc-900 mb-1">Weather Report</h1>
        <p className="text-zinc-800 text-lg mb-6 font-medium">I can give you a weather report about your city!</p>

        <div className="flex flex-col gap-4">
          <input
            onChange={handleCity}
            type="text"
            placeholder="Enter your City Name"
            className="w-64 px-4 py-2 rounded-md border-none text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 shadow-inner"
          />
          
          {/* ANIMATION: Button scales up on hover */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={getWeather}
            className="bg-zinc-900 text-white w-max px-8 py-2.5 rounded-md font-semibold hover:bg-black transition-all"
          >
            Get Report
          </motion.button>
        </div>

        {/* ANIMATION: Results pop in only when 'weather' exists */}
        <AnimatePresence>
          {weather && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mt-8 space-y-2 text-zinc-900 font-bold text-xl"
            >
              <h1><b>Weather: </b><span className="font-normal">{weather}</span></h1>
              <h1><b>Temperature: </b><span className="font-normal">{temp}°C</span></h1>
              <h1><b>Description: </b><span className="font-normal">{desc}</span></h1>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Weather;