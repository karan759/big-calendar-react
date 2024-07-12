import moment from "moment";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Sidebar } from "primereact/sidebar";
import { Nullable } from "primereact/ts-helpers";
import { useState } from "react";
import { executionEvent } from "../custom/FullCalendar";
interface IProps {
  visible: boolean;
  onClick: () => void;
}
const CustomSidebar = (props: IProps) => {
  const [value, setValue] = useState("");
  const [desc, setDesc] = useState("");
  const [datetime24h, setDateTime24h] = useState<Nullable<Date>>(null);

  const [endDateTime, setEndDateTime] = useState<Nullable<Date>>(null);
  const t = () => {
    props.onClick();
  };
  const handleSubmit = async () => {
    const start = moment(datetime24h);
    const end = endDateTime
      ? moment(endDateTime)
      : start.clone().add(30, "minutes");

    const data: executionEvent = {
      id: Math.random(),
      title: value,
      description: desc,
      status: "warning",
      start: start.format(),
      end: end.format(),
    };

    try {
      const response = await fetch("http://localhost:8000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Data submitted successfully");
      } else {
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Sidebar visible={props.visible} position="right" onHide={() => t()}>
      <div className="card flex justify-content-center">
        <label htmlFor="input">Title</label>
        <InputText
          value={value}
          onChange={(e) => setValue(e.target.value)}
          id="input"
        />
      </div>
      <div className="card flex justify-content-center">
        <label htmlFor="input">Description</label>
        <InputText
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          id="input"
        />
      </div>
      <div className="card flex justify-content-center">
        <label htmlFor="input">Status</label>
        <InputText
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          id="input"
        />
      </div>
      <div className="flex-auto">
        <label htmlFor="calendar-24h" className="font-bold block mb-2">
          Start
        </label>
        <Calendar
          id="calendar-24h"
          value={datetime24h}
          onChange={(e) => setDateTime24h(e.value)}
          showTime
          hourFormat="24"
        />
      </div>
      <div className="flex-auto">
        <label htmlFor="calendar-24h" className="font-bold block mb-2">
          End
        </label>
        <Calendar
          id="calendar-24h"
          value={endDateTime}
          onChange={(e) => setEndDateTime(e.value)}
          showTime
          hourFormat="24"
        />
      </div>
      <Button onClick={() => handleSubmit()}>Execute</Button>
    </Sidebar>
  );
};

export default CustomSidebar;
