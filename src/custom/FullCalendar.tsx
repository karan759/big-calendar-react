import React from "react";
import {
  Calendar,
  momentLocalizer,
  DateLocalizer,
  CalendarProps,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolBar from "./toolbar/CustomToolBar";

const localizer: DateLocalizer = momentLocalizer(moment);

const FullCalendar = (props: any) => {
  return (
    <Calendar
      {...props}
      localizer={localizer}
      components={{ toolbar: CustomToolBar }}
    />
  );
};

export default FullCalendar;
