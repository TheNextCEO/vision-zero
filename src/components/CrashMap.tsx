"use client";

import { useState } from "react";
import CrashDate from "./CrashDate";
import CrashSeverity from "./CrashSeverity";
import CrashType from "./CrashType";
import Map from "./Map";

const CrashMap = () => {
  const [typeOption, setTypeOption] = useState("ALL");
  const [severityOption, setSeverityOption] = useState("CRASHES");
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());

  const handleTypeOptionClick = (option: string) => {
    setTypeOption(option);
  };

  const handleSeverityOptionClick = (option: string) => {
    setSeverityOption(option);
  };

  const handleFromDateChange = (date: Date) => {
    setFromDate(date);
  };

  const handleToDateChange = (date: Date) => {
    setToDate(date);
  };

  return (
    <div className="flex flex-col py-3">
      <div className="text-xl font-bold py-3">FILTER CRASHES</div>
      <div className="w-full space-y-3">
        <CrashType
          selectedOption={typeOption}
          handleOptionClick={handleTypeOptionClick}
        />
        <CrashSeverity
          selectedOption={severityOption}
          handleOptionClick={handleSeverityOptionClick}
        />
        <CrashDate
          toDate={toDate}
          fromDate={fromDate}
          handleToDateChange={setToDate}
          handleFromDateChange={handleFromDateChange}
        />
        <div className="italic">
          Data updated as of the last day of: {new Date().toLocaleDateString()}
        </div>
      </div>
      <Map />
    </div>
  );
};

export default CrashMap;
