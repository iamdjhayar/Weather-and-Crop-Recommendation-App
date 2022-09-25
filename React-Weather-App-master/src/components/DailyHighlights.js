import React, { useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import {
  ArrowCircleUpIcon,
  ArrowCircleDownIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";

function DailyHighlights(props) {
  const deg = props.data.wind_deg;
  let windDirection = "";

  if (deg >= 11.25 && deg < 33.75) {
    windDirection = "NNE";
  } else if (deg >= 348.75 && deg <= 360 && deg == 0 && deg < 11.25) {
    windDirection = "N";
  } else if (deg >= 33.75 && deg < 56.35) {
    windDirection = "NE";
  } else if (deg >= 56.25 && deg < 78.75) {
    windDirection = "E";
  }

  function convert(code) {
    let unix_timestamp = code;
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime =
      hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

    return formattedTime;
  }

  console.log(props.daily, "rainfall");
  let rainfall = 0;
  props?.daily.map((item) => {
    rainfall = rainfall + item.rain;
  });

  console.log((rainfall / props?.daily.length) * 25, "this is the rainfall");

  return (
    <div>
      <p className="font-bold">Todays Highlights</p>
      <div className="sm:flex-none lg:flex flex-row mt-3">
        <div className="sm:w-full lg:w-4/12 bg-white rounded-md shadow-sm p-3 m-3">
          <div className="text-gray-500 text-sm">UV Index</div>
          <div className="mt-2 flex justify-center items-center">
            <div
              style={{
                width: "200px",
                height: "150px",
              }}
            >
              <ReactSpeedometer
                needleColor="darkgray"
                fluidWidth={true}
                maxValue={11}
                value={props.data.uvi}
                customSegmentStops={[0, 2, 5, 7, 10, 11]}
                segmentColors={[
                  "#F6BDC0",
                  "#F1959B",
                  "#F07470",
                  "#EA4C46",
                  "#DC1C13",
                ]}
              />
            </div>
          </div>
        </div>
        <div className="lg:w-4/12 bg-white rounded-md shadow-sm p-3 m-3">
          <div className="text-gray-500 text-sm">Wind Status</div>
          <div className="flex flex-col justify-center items-center h-full mb-2">
            <div className="font-bold text-4xl text-center text-red-500">
              {props.data.wind_speed}
              <span className="text-base">km/h</span>
            </div>
            <div>
              <span className="text-xs">
                Wind Gust: {props.data.wind_gust}km/h
              </span>
            </div>
            <div className="text-xl text-center mt-2 flex flex-row">
              <LocationMarkerIcon className="h-8 w-8 text-red-500 mr-3" />
              {windDirection}
            </div>
          </div>
        </div>
        <div className="lg:w-4/12 bg-white rounded-md shadow-sm p-3 m-3">
          <div className="text-gray-500 text-sm">Sunrise/Sunset</div>
          <div className="flex justify-center items-center h-full mb-2">
            <div>
              <div className="flex flex-row p-2 items-center">
                <div>
                  <ArrowCircleUpIcon className="h-8 w-8 text-red-500 mr-3" />
                </div>
                {convert(props.data.sunrise)}
              </div>
              <div className="flex flex-row p-2 items-center">
                <div>
                  <ArrowCircleDownIcon className="h-8 w-8 text-red-500 mr-3" />
                </div>
                {convert(props.data.sunset)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:flex lg:flex-row mb-5">
        <div className="lg:w-4/12 bg-white rounded-md shadow-sm p-3 m-3">
          <div className="text-gray-500 text-sm">Humidity</div>
          <div className="font-bold text-4xl text-center mt-2 text-red-500">
            {props.data.humidity + "%"}
          </div>
          <div>
            <span className="text-xs">Pressure: {props.data.pressure} hPa</span>
          </div>
          <div>
            <span className="text-xs">
              Dew Point: {Math.round(props.data.dew_point - 273.15) + "\u00b0C"}
            </span>
          </div>
        </div>
        <div className="lg:w-4/12 bg-white rounded-md shadow-sm p-3 m-3">
          <div className="text-gray-500 text-sm">Visibility</div>
          <div className="font-bold text-4xl text-center mt-2 text-red-500">
            {props.data.visibility / 1000}
            <span className="text-base">km</span>
          </div>
        </div>
        <div className="lg:w-4/12 bg-white rounded-md shadow-sm p-3 m-3">
          <div className="text-gray-500 text-sm">Rainfall</div>
          <div className="font-bold text-4xl text-center mt-2 text-red-500">
            {Math.round(rainfall / props?.daily.length)}
            <span className="text-base">mm/week</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyHighlights;
