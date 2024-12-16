"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";

import Map from "./MapLayers";
import { convertToGeoJSON, CrashData } from "@/utils/csvToGeoJSON";

const CrashMap = () => {
  const [visibleData, setVisibleData] = useState<any>(null);

  const crashData = getLeonCountyCrashData();

  useEffect(() => {
    // Flatten the data into GeoJSON
    if (crashData) {
      // const flattenedData = flattenCrashDataToGeoJSON(crashData);
      const geojson = convertToGeoJSON(crashData);
      setVisibleData(geojson);
    }
  }, [crashData]);

  if (!crashData) {
    return <pre>Loading...</pre>;
  }

  return (
    <div className="flex flex-col md:flex-row ">
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
