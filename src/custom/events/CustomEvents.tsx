import { executionEvent } from "../FullCalendar";

const CustomEvents = ({ event }: { event: executionEvent }) => {
  console.log(event);
  return (
    <section className="events">
      <h3 className="title">{event.title}</h3>

      <span>{event.description}</span>
      <span>{event.status}</span>
    </section>
  );
};

export default CustomEvents;
