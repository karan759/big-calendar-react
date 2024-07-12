import moment from "moment";
import { useEffect, useState } from "react";
import {
  Calendar,
  DateLocalizer,
  momentLocalizer
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomEvents from "./events/CustomEvents";
import CustomToolBar from "./toolbar/CustomToolBar";

const localizer: DateLocalizer = momentLocalizer(moment);
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
  const [events, setEvents] = useState<executionEvent[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      const res = await fetch("http://localhost:8000/events");
      const data = await res.json();

      setEvents(data);
    }
    fetchEvents();
  }, []);

  const eventItems = events.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));

  return (
    <Calendar
      selectable
      onSelectSlot={props.onClick}
      {...props}
      localizer={localizer}
      components={{
        toolbar: (toobarProps) => (
          <CustomToolBar {...toobarProps} onclick={props.onClick} />
        ),
        event: CustomEvents,
      }}
      events={eventItems}
    />
  );
};

export default FullCalendar;
