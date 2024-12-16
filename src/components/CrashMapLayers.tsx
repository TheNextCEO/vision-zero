"use client";

import {
  convertToGeoJSON,
  CrashData,
  GeoJSONFeatureCollection,
} from "@/utils/csvToGeoJSON";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import CrashSeverity from "./CrashSeverity";
import CrashType from "./CrashType";
import Map from "./MapLayers";

const CrashMap = () => {
  const [visibleData, setVisibleData] = useState<any>(null);
  const [crashTypeOption, setCrashTypeOption] = useState<
    "ALL" | "MOTOR VEHICLE" | "PEDESTRIAN" | "BICYCLIST"
  >("ALL");
  const [crashSeverityOption, setCrashSeverityOption] = useState<
    "ALL" | "FATAL" | "INJURY"
  >("ALL");

  const crashData = getLeonCountyCrashData();

  useEffect(() => {
    // Flatten the data into GeoJSON
    if (crashData) {
      // const flattenedData = flattenCrashDataToGeoJSON(crashData);
      const geojson = convertToGeoJSON(crashData);
      setVisibleData(geojson);
    }
  }, [crashData]);

  // Update the map source data based on the filter
  useEffect(() => {
    if (crashData) {
      const geojson = convertToGeoJSON(crashData);
      let filteredFeatures = geojson.features;

      if (crashSeverityOption === "FATAL") {
        filteredFeatures = geojson.features.filter(
          (feature) => feature.properties.is_fatal
        );
      } else if (crashSeverityOption === "INJURY") {
        filteredFeatures = geojson.features.filter(
          (feature) => !feature.properties.is_fatal
        );
      }

      // Filter by Crash Type
      if (crashTypeOption !== "ALL") {
        filteredFeatures = filteredFeatures.filter((feature) =>
          feature.properties.crash_types.includes(crashTypeOption)
        );
      }

      const filteredGeoJSON: GeoJSONFeatureCollection = {
        type: "FeatureCollection",
        features: filteredFeatures,
      };

      setVisibleData(filteredGeoJSON);
    }
  }, [crashSeverityOption, crashTypeOption, crashData]);

  if (!crashData) {
    return <pre>Loading...</pre>;
  }

  return (
    <div className="flex flex-col md:flex-row ">
      <div className="col-lg-4 py-3 px-4">
        {/* <div className="text-xl font-bold py-3">FILTER CRASHES</div> */}
        <div className="w-full space-y-5">
          <CrashType
            selectedOption={crashTypeOption}
            handleOptionClick={(option: string) =>
              setCrashTypeOption(
                option as "ALL" | "MOTOR VEHICLE" | "PEDESTRIAN" | "BICYCLIST"
              )
            }
          />
          <CrashSeverity
            selectedOption={crashSeverityOption}
            handleOptionClick={(option: string) =>
              setCrashSeverityOption(option as "INJURY" | "FATAL" | "ALL")
            }
          />
          {/* <CrashDate
            toDate={toDate}
            fromDate={fromDate}
            handleToDateChange={setToDate}
            handleFromDateChange={setFromDate}
          /> */}
          <div className="italic">
            Data updated as of: {new Date(2023, 5, 12).toLocaleDateString()}
          </div>
        </div>
      </div>
      {visibleData && <Map data={visibleData} />}
    </div>
  );
};

export default CrashMap;

const getLeonCountyCrashData = (): CrashData[] | null => {
  const csvURL =
    "https://raw.githubusercontent.com/Open-Data-Tallahassee/vision-zero/41-first-map/crash-data/quarterly-tranches/processed/leon-people-2019-q2.csv";

  const [data, setData] = useState<CrashData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(csvURL);
        const csvText = await response.text();

        Papa.parse<CrashData>(csvText, {
          header: true,
          dynamicTyping: false, // We'll handle type conversions manually
          skipEmptyLines: true,
          complete: (results) => {
            const parsedData: CrashData[] = results.data.map((d) => ({
              report_number: d.report_number, // Keep as string
              crash_year: d.crash_year ? Number(d.crash_year) : 0,
              role: d.role || "N/A",
              injury_severity: d.injury_severity
                ? Number(d.injury_severity)
                : 0,
              non_motorist_description_code: d.non_motorist_description_code
                ? Number(d.non_motorist_description_code)
                : 0,
              crash_date_time: d.crash_date_time,
              latitude: d.latitude ? Number(d.latitude) : 0,
              longitude: d.longitude ? Number(d.longitude) : 0,
            }));

            setData(parsedData);
          },
          error: (error: any) => {
            console.error("Error parsing CSV:", error);
            setData(null);
          },
        });
      } catch (error) {
        console.error("Error fetching CSV data:", error);
        setData(null);
      }
    };

    fetchData();
  }, [csvURL]);

  return data;
};
