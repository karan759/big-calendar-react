import React, { useState } from "react";
import "./App.css";
import FullCalendar from "./custom/FullCalendar";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import CustomSidebar from "./sidebar/CustomSidebar";

function App() {
  const [visible, setVisible] = useState<boolean>(false);
  const handleSidebar = () => {
    setVisible(true);
  };
  return (
    <div style={{ height: "95vh" }}>
      <FullCalendar onClick={() => handleSidebar()} />
      <CustomSidebar visible={visible} onClick={() => handleSidebar()} />
    </div>
  );
}

export default App;
