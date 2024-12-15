"use client";

import { csv, scaleOrdinal, DSVParsedArray } from "d3";
import { useEffect, useState } from "react";
import CrashDate from "./CrashDate";
import CrashSeverity from "./CrashSeverity";
import CrashType from "./CrashType";
import Map from "./Map";
import { startOfDay, endOfDay } from "date-fns";

const CrashMap = () => {
  const [typeOption, setTypeOption] = useState("ALL");
  const [severityOption, setSeverityOption] = useState("CRASH");
  const [fromDate, setFromDate] = useState<Date>(new Date(2019, 3)); // June 1, 2019
  const [toDate, setToDate] = useState<Date>(new Date(2019, 5, 30));
  const [visibleData, setVisibleData] = useState<any>(null);

  const crashData = useLeonCountyCrashData();

  useEffect(() => {
    if (crashData) {
      const severityData = filterDataBySeverity(
        filterDataByType(crashData, typeOption),
        severityOption
      );

      setVisibleData(filterDataByDate(severityData, fromDate, toDate));
    }
  }, [crashData, typeOption, severityOption, fromDate, toDate]);

  if (!crashData) {
    return <pre>Loading...</pre>;
  }

  const colorValue = (d: any) => d.non_motorist_description_code;

  const colorScale = scaleOrdinal()
    .domain(crashData.map(colorValue).sort())
    .range([
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange",
      "pink",
      "gray",
      "brown",
      "black",
    ]);

  return (
    <div className="flex flex-col md:flex-row ">
      <div className="col-lg-4 py-3 px-4">
        <div className="text-xl font-bold py-3">FILTER CRASHES</div>
        <div className="w-full space-y-3">
          <CrashType
            selectedOption={typeOption}
            handleOptionClick={setTypeOption}
          />
          <CrashSeverity
            selectedOption={severityOption}
            handleOptionClick={setSeverityOption}
          />
          <CrashDate
            toDate={toDate}
            fromDate={fromDate}
            handleToDateChange={setToDate}
            handleFromDateChange={setFromDate}
          />
          <div className="italic">
            Data updated as of: {new Date(2023, 5, 12).toLocaleDateString()}
          </div>
        </div>
      </div>
      {visibleData && (
        <Map
          data={visibleData}
          colorScale={colorScale}
          colorValue={colorValue}
        />
      )}
    </div>
  );
};

export default CrashMap;

const filterDataBySeverity = (data: any, severityOption: any) => {
  if (severityOption) {
    switch (severityOption) {
      case "CRASH":
        return data.filter((d: any) => d.injury_severity != 5);
      case "FATAL":
        return data.filter((d: any) => d.injury_severity == 5);
      default:
        return data;
    }
  }
};

const filterDataByType = (data: any, typeOption: any) => {
  if (typeOption) {
    switch (typeOption) {
      case "ALL":
        return data.filter((d: any) =>
          [0, 1, 3].includes(d.non_motorist_description_code)
        );
      case "PEDESTRIAN":
        return data.filter((d: any) => d.non_motorist_description_code === 1);
      case "BICYCLIST":
        return data.filter((d: any) => d.non_motorist_description_code === 3);
      case "CAR":
        return data.filter((d: any) => d.non_motorist_description_code === 0);
      default:
        return data.filter((d: any) =>
          [0, 1, 3].includes(d.non_motorist_description_code)
        );
    }
  }
};

const filterDataByDate = (data: any, fromDate: Date, toDate: Date) => {
  const start = startOfDay(fromDate);
  const end = endOfDay(toDate);

  return data.filter((d: any) => {
    const crashDate = new Date(d.crash_date_time);
    return crashDate >= start && crashDate <= end;
  });
};

const useLeonCountyCrashData = () => {
  const csvURL =
    "https://raw.githubusercontent.com/Open-Data-Tallahassee/vision-zero/41-first-map/crash-data/quarterly-tranches/processed/leon-people-2019-q2.csv";

  const row = (d: any) => {
    d.crash_date_time = new Date(d.crash_date_time);
    d.injury_severity = +d.injury_severity;
    d.latitude = +d.latitude;
    d.longitude = +d.longitude;
    if (d.non_motorist_description_code === "") {
      d.non_motorist_description_code = 0;
    } else {
      d.non_motorist_description_code = +d.non_motorist_description_code;
    }
    d.report_number = +d.report_number;
    return d;
  };

  const [data, setData] = useState<DSVParsedArray<any> | null>(null);

  useEffect(() => {
    csv(csvURL, row).then((parsedData) => {
      // Slice the first 50 items
      const limitedData = parsedData;
      setData(limitedData);
    });
  }, []);

  return data;
};
