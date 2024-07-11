import React from 'react';
import './App.css';
import FullCalendar from './custom/FullCalendar';
import "primereact/resources/themes/lara-light-cyan/theme.css";

function App() {
  return (
    <div style={{'height': '95vh'}}>
      <FullCalendar />
    </div>
  );
}

export default App;
