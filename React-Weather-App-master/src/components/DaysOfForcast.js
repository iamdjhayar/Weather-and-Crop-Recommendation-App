import React, { useEffect, useState } from 'react';

function DaysOfForcast(props){
    let count = 0
    
    function convert(code){
        let unix_timestamp = code
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var date = new Date(code * 1000);
        var dayName = days[date.getDay()];
        return dayName
    }

    const daily = props.data.map((item) =>{
            if(count===0){
            }else{
            return <div key={item.dt} className="m-3 p-2 rounded-sm bg-white shadow-sm w-full flex flex-col items-center justify-center">
                <div className="text-sm font-semibold">{convert(item.dt)}</div>
                <div>
                    <img width="100px" src={'http://openweathermap.org/img/wn/'+item.weather[0].icon+'@2x.png'} alt={item.weather[0].icon}/>
                </div>
                <span className="text-xs">{Math.round((item.temp.day-273.15)) + '\u00b0C'}</span>
            </div>
            }
            count++   
        }
    )
    return(
        <div>
            <p className="font-bold">Weekly Forecasts</p>
            <div className="lg:flex lg:flex-row">
                {daily}
            </div>
        </div>
    )
}

export default DaysOfForcast