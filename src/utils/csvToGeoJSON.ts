// utils/csvToGeoJSON.ts

export interface CrashData {
  report_number: string;
  crash_year: number;
  role: string;
  injury_severity: number;
  non_motorist_description_code?: number;
  crash_date_time: string;
  latitude: number;
  longitude: number;
}

export interface CrashDetail {
  role: string;
  injury_severity: number;
  non_motorist_description_code?: number;
}

export interface GeoJSONFeature {
  type: "Feature";
  id: string;
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: {
    report_number: string;
    crash_year: number;
    crash_date_time: string;
    details: CrashDetail[];
  };
}

export interface GeoJSON {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}

// utils/csvToGeoJSON.ts (continued)

export const convertToGeoJSON = (data: CrashData[]): GeoJSON => {
  // Create a map to group data by report_number
  const crashMap: Map<string, CrashData[]> = new Map();

  data.forEach((item) => {
    if (!crashMap.has(item.report_number)) {
      crashMap.set(item.report_number, []);
    }
    crashMap.get(item.report_number)!.push(item);
  });

  // Convert the map to GeoJSON features
  const features: GeoJSONFeature[] = Array.from(crashMap.entries()).map(
    ([report_number, crashItems]) => {
      const firstItem = crashItems[0]; // Assuming crash_year and crash_date_time are same for all items
      const details: CrashDetail[] = crashItems.map((item) => ({
        role: item.role,
        injury_severity: item.injury_severity,
        non_motorist_description_code: item.non_motorist_description_code,
      }));

      return {
        type: "Feature",
        id: report_number,
        geometry: {
          type: "Point",
          coordinates: [firstItem.longitude, firstItem.latitude],
        },
        properties: {
          report_number: report_number,
          crash_year: firstItem.crash_year,
          crash_date_time: firstItem.crash_date_time,
          details: details,
        },
      };
    }
  );

  return {
    type: "FeatureCollection",
    features,
  };
};
