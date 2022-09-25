import React from "react";
import DailyHighlights from "./DailyHighlights";
import DaysOfForcast from "./DaysOfForcast";

function MainContainer(props) {
  return (
    <div className="sm:w-full lg:w-9/12 p-8 bg-gray-100 h-full">
      <DailyHighlights data={props.data.current} daily={props.data.daily} />
      <DaysOfForcast data={props.data.daily} />
    </div>
  );
}

export default MainContainer;
