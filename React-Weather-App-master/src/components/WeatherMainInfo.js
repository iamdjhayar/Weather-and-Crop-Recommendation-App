import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";

function WeatherMainInfo(props) {
  const [weatherData, setWeatherData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isPredicting, setIsPredicting] = useState(false);
  const [dataset, setDataset] = useState({
    n: 150,
    p: 60,
    k: 60,
    ph: 7,
  });
  const [crop, setCrop] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
          position.coords.latitude +
          "&lon=" +
          position.coords.longitude +
          "&appid=" +
          props.api
      )
        .then((res) => {
          return res.json();
        })
        .then(function (res) {
          setWeatherData(res);
          console.log(res);
          setIsLoading(false);
          if (res) predict();
        });
    });
  }, []);

  let rain = 0;
  props?.daily?.map((item) => {
    rain = rain + item.rain;
    console.log(item.rain);
  });
  console.log(rain * 2, "rain");
  console.log(weatherData, "here");

  const predict = async () => {
    console.log("hello");
    setIsPredicting(true);
    let params = {
      nitro: parseFloat(dataset.n),
      phosp: parseFloat(dataset.p),
      potas: parseFloat(dataset.k),
      temp: Math.round(weatherData?.main.temp - 273.15),
      humid: weatherData?.main.humidity,
      ph: parseFloat(dataset.ph),
      rain: rain * 3,
    };

    console.log(params, "here");
    try {
      await axios
        .post("http://192.168.0.105:5000/predict", params)
        .then((response) => {
          console.log(JSON.stringify(response.data.message));
          setCrop(response.data.message);
          setIsPredicting(false);
        })
        .catch((err) => console.error(err)); // promise;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  console.log(props.daily);

  // if (weatherData) {
  //   let params = {
  //     nitro: dataset.n,
  //     phosp: dataset.p,
  //     potas: dataset.k,
  //     temp: Math.round(weatherData?.main.temp - 273.15),
  //     humid: weatherData?.main.humidity,
  //     ph: dataset.ph,
  //     rain: rain * 3,
  //   };

  //   axios.post("http://192.168.0.105:5000/predict", params).then((response) => {
  //     console.log(JSON.stringify(response.data.message));
  //     setCrop(response.data.message);
  //   });
  // }

  const handleChange = (e) => {
    let value = e.target.value;
    let input = e.target.name;
    if (input === "nitro") {
      setDataset({ ...dataset, ["n"]: value });
    }
    if (input === "phos") {
      setDataset({ ...dataset, ["p"]: value });
    }
    if (input === "potas") {
      setDataset({ ...dataset, ["k"]: value });
    }
    if (input === "ph") {
      setDataset({ ...dataset, ["ph"]: value });
    }
  };

  return (
    <div className="sm:flex-none lg:flex lg:flex-col sm:w-full lg:w-3/12 rounded-tr-lg p-8 rounded-br-lg shadow-md">
      {isLoading ? null : (
        <div className="flex flex-row items-center">
          <LocationMarkerIcon className="h-6 w-6 text-red-500" />
          <span className="font-semibold text-lg">
            {weatherData.name + ", " + weatherData.sys.country}
          </span>
        </div>
      )}
      <div className="flex flex-col justify-center items-center mt-10">
        <div>
          {isLoading ? null : (
            <img
              className="w-full"
              src={
                "http://openweathermap.org/img/wn/" +
                weatherData.weather[0].icon +
                "@2x.png"
              }
            />
          )}
        </div>
        <div className="text-center">
          {isLoading ? null : (
            <span className="text-2xl text-red-500 uppercase">
              {weatherData.weather[0].description}
            </span>
          )}
        </div>
        <div className="font-bold text-8xl">
          {isLoading
            ? null
            : Math.round(weatherData.main.temp - 273.15) + "\u00b0C"}
        </div>

        <div className="flex flex-row mt-5">
          <div className="flex flex-row">
            {isLoading ? null : (
              <div>
                <ArrowDownIcon className="h-8 w-8 text-red-500" />
                <span className="ml-2 mr-2">
                  {Math.round(weatherData.main.temp_min - 273.15) + "\u00b0C"}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-row">
            {isLoading ? null : (
              <div>
                <ArrowUpIcon className="h-8 w-8 text-red-500" />
                <span className="ml-2 mr-2">
                  {Math.round(weatherData.main.temp_max - 273.15) + "\u00b0C"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex space-x-2 mt-10">
        <div>
          <div className="relative mt-1 rounded-md shadow-sm">
            <label>N</label>
            <input
              type="number"
              name="nitro"
              id="price"
              value={dataset.n}
              onBlur={predict}
              onChange={handleChange}
              className="block w-full rounded-md border p-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10"
              placeholder="N"
            />
          </div>
        </div>
        <div>
          <div className="relative mt-1 rounded-md shadow-sm">
            <label>P</label>
            <input
              type="number"
              name="phos"
              id="price"
              value={dataset.p}
              onBlur={predict}
              onChange={handleChange}
              className="block w-full rounded-md border p-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10"
              placeholder="P"
            />
          </div>
        </div>
        <div>
          <div className="relative mt-1 rounded-md shadow-sm">
            <label>K</label>
            <input
              type="number"
              name="potas"
              id="price"
              value={dataset.k}
              onBlur={predict}
              onChange={handleChange}
              className="block w-full rounded-md border p-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10"
              placeholder="K"
            />
          </div>
        </div>
        <div>
          <div className="relative mt-1 rounded-md shadow-sm">
            <label>Ph</label>
            <input
              type="number"
              name="ph"
              id="price"
              value={dataset.ph}
              onBlur={predict}
              onChange={handleChange}
              className="block w-full rounded-md border p-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10"
              placeholder="Ph"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center h-full">
        Recommended crop to plant:{" "}
        <p className="font-bold capitalize text-xl">
          {isPredicting ? "predicting..." : crop}
        </p>
      </div>
      {/* <Modal /> */}
    </div>
  );
}

export default WeatherMainInfo;
