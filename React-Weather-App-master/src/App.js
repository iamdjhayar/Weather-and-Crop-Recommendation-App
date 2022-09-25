import React, { useEffect, useState } from "react";
import WeatherMainInfo from "./components/WeatherMainInfo";
import MainContainer from "./components/MainContainer";

function App() {
  const [key] = useState("19bb8f46b9b8c5df003baea3570c989b");
  const [oneCall, setOneCall] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [crop, setCrop] = useState("");
  const [daily, setDaily] = useState();

  console.log(daily, "daily");
  let rain = 0;
  daily?.map((item) => {
    rain = rain + item.rain;
    console.log(item.rain);
  });
  console.log(rain * 2, "rain");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          position.coords.latitude +
          "&lon=" +
          position.coords.longitude +
          "&appid=" +
          key
      )
        .then((res) => {
          return res.json();
        })
        .then(function (res) {
          setOneCall(res);
          setDaily(res.daily);
          setIsLoading(false);
          console.log(res, "main");
          let data = res?.current;
          console.log(Math.round(data.temp - 273.15));
        });
    });
  }, []);

  return (
    <div className="lg:flex sm:flex-none lg:h-full">
      {isLoading ? null : <WeatherMainInfo api={key} daily={oneCall.daily} />}
      {isLoading ? null : <MainContainer data={oneCall} rain={rain} />}
    </div>
  );
}

export default App;
