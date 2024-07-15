import moment from "moment";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useContext, useEffect, useState } from "react";
import { executionEvent } from "../custom/FullCalendar";
import { CalendarContext } from "../store/store";

const EventDialog = ({ eventDate }: any) => {
  const { start, end } = eventDate;

  const { visible, dispatch } = useContext(CalendarContext);
  const [value, setValue] = useState("");
  const [desc, setDesc] = useState("");
  const [datetime24h, setDateTime24h] = useState<any>(null);
  const [endDateTime, setEndDateTime] = useState<any>(null);
  console.log(datetime24h);

  useEffect(()=>{
if(start && end){
  setDateTime24h(start)
  setEndDateTime(end)
}
  },[start,end])

  const handleHide = () => {
    dispatch({ type: "HIDE", payload: false });
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
        dispatch({ type:'LOAD', payload:true })
        console.log("Data submitted successfully");
      } else {
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
   dispatch({type:"HIDE", payload: false })
  };
  return (
    <Dialog
      header="Schedule events"
      visible={visible}
      style={{ width: "30vw", height: "80vh" }}
      onHide={() => handleHide()}
      className="dialog"
    >
      <div className="card">
        <label htmlFor="input">Title</label>
        <InputText
          value={value}
          onChange={(e) => setValue(e.target.value)}
          id="input"
        />
      </div>
      <div className="card">
        <label htmlFor="input">Description</label>
        <InputText
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          id="input"
        />
      </div>
      <div className="date">
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
            showIcon
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
            showIcon
          />
        </div>
      </div>
      <div className="btn-footer">
        <Button onClick={() => handleSubmit()} severity="secondary" outlined>
          Cancel
        </Button>
        <Button onClick={() => handleSubmit()}>Execute</Button>
      </div>
    </Dialog>
  );
};

export default EventDialog;
