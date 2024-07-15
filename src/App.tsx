import React, { useState } from "react";
import "./App.css";
import FullCalendar from "./custom/FullCalendar";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import EventDialog from './sidebar/EventDialog';
import { DataProvider } from "./store/store";

export type SelectedDate = {
  start: Date | null;
  end: Date | null;
};
function App() {
  const [selectedDate,setSelectedDate] = useState<SelectedDate>({start:null,end:null})

  const getBlockDate =(start:Date,end: Date) =>{
    setSelectedDate({start,end});
  }
  return (
    <DataProvider>
    <div style={{ height: "95vh" }}>
      <FullCalendar getEventDate={getBlockDate}/>
      <EventDialog eventDate ={selectedDate} />
    </div>
    </DataProvider>
  );
}

export default App;
