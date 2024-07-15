import moment from "moment";
import { useContext, useEffect, useState } from "react";
import {
  Calendar,
  DateLocalizer,
  momentLocalizer,
  Formats,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomEvents from "./events/CustomEvents";
import CustomToolBar from "./toolbar/CustomToolBar";
import { CalendarContext } from "../store/store";

const localizer = momentLocalizer(moment);
export type executionEvent = {
  id?: number;
  title?: string;
  status: string;
  description?: string;
  start: string | Date;
  end: string | Date;
};

export type EventItem = {
  start: Date;
  end: Date;
  data?: { ex?: executionEvent };
};

const FullCalendar = (props: any) => {
  const {dispatch,loading} = useContext(CalendarContext);
  const [events, setEvents] = useState<executionEvent[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      const res = await fetch("http://localhost:8000/events");
      const data = await res.json();

      setEvents(data);
    }
    fetchEvents();
  }, [loading]);

  const formats: Formats = {
    dayFormat: (date: Date) => {
      const dayNumber = moment(date).format("DD");
      const dayName = moment(date).format("dddd");
      return `${dayNumber} ${dayName}`;
    },
    weekdayFormat: (date: Date) => moment(date).format("dddd"),
  };
  const handleSlot = (start: Date,end: Date)=>{
    props.getEventDate(start,end);
   dispatch({type:"SHOW", payload:true })
  }
  const eventItems = events.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));

  return (
    <Calendar
      selectable
      onSelectSlot={({start,end})=>handleSlot(start,end)}
      {...props}
      localizer={localizer}
      components={{
        toolbar: CustomToolBar, 
        event: CustomEvents,
      }}
      events={eventItems}
      formats={formats}
    />
  );
};

export default FullCalendar;
