import moment from "moment";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { Navigate } from "react-big-calendar";
import "./CustomToolBar.css";

const CustomToolBar = ({ onclick, ...toolbar }: any) => {
  const [selectedView, setSelectedView] = useState(toolbar.view);
  const goToBack = () => {
    toolbar.onNavigate(Navigate.PREVIOUS);
  };

  const goToNext = () => {
    toolbar.onNavigate(Navigate.NEXT);
  };

  const goToCurrent = () => {
    toolbar.onNavigate(Navigate.TODAY);
  };

  const handleViewChange = (e: any) => {
    setSelectedView(e.value);
    toolbar.onView(e.value);
  };
  const formatLabel = () => {
    const date = toolbar.date;
    return moment(date).format("D MMMM YYYY");
  };
  const viewOptions = [
    { label: "Day", value: "day" },
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
  ];

  return (
    <div className="toolbar-view">
      <div className="toolbar">
        <Button
          label="Schedule test"
          outlined
          className="btn-1"
          onClick={() => onclick()}
        />
        <div className="today" onClick={() => goToCurrent()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M13 2H11V1H10V2H6V1H5V2H3C2.45 2 2 2.45 2 3V13C2 13.55 2.45 14 3 14H13C13.55 14 14 13.55 14 13V3C14 2.45 13.55 2 13 2ZM13 13H3V6H13V13ZM13 5H3V3H5V4H6V3H10V4H11V3H13V5Z"
              fill="#3F3F4A"
            />
          </svg>
          <span>Today</span>
        </div>
        <div className="next-day">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 16 16"
            fill="none"
            onClick={() => goToBack()}
          >
            <path
              d="M5 8L10 3L10.7 3.7L6.4 8L10.7 12.3L10 13L5 8Z"
              fill="black"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 16 16"
            fill="none"
            onClick={() => goToNext()}
          >
            <path
              d="M11 8L6.00005 13L5.30005 12.3L9.60005 8L5.30005 3.7L6.00005 3L11 8Z"
              fill="black"
            />
          </svg>
        </div>
        <span className="rbc-toolbar-label">{formatLabel()}</span>
      </div>
      <div className="gap"></div>
      <div className="toolbar-1">
        <Dropdown
          value={selectedView}
          options={viewOptions}
          onChange={handleViewChange}
          placeholder="Select View"
          className="viewOption"
        />
      </div>
    </div>
  );
};

export default CustomToolBar;
