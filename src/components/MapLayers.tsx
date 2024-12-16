import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_REACT_APP_MAPBOX_TOKEN || "";

const Map = (props: any) => {
  const mapWidthOffset = 180;
  const mapContainer = useRef(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(-84.2875);
  const [lat, setLat] = useState(30.4543);
  const [initZoom, setInitZoom] = useState(11.53);

  useEffect(() => {
    if (mapRef.current) return; // initialize map only once
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current || "",
      style: "mapbox://styles/mapbox/streets-v9",
      center: [lng, lat],
      zoom: initZoom,
    });

    // Add navigation controls
    mapRef.current.addControl(new mapboxgl.NavigationControl());

    mapRef.current.on("load", () => {
      if (mapRef.current) {
        // Add GeoJSON source with clustering enabled
        mapRef.current.addSource("crashData", {
          type: "geojson",
          data: props.data,
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50,
        });

        // Add cluster layers
        addClusterLayers(mapRef.current);

        // Add unclustered points layer
        mapRef.current.addLayer({
          id: "unclustered-points",
          type: "circle",
          source: "crashData",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-radius": 6,
            "circle-color": "#FF0000",
            "circle-opacity": 0.6,
          },
        });

        // Add popups on click for unclustered points
        mapRef.current.on("click", "unclustered-points", (e) => {
          const features = mapRef.current?.queryRenderedFeatures(e.point, {
            layers: ["unclustered-points"],
          });
          const feature = features && features[0];
          if (feature) {
            const coordinates = (feature.geometry as any).coordinates.slice();
            const { report_number, crash_year, crash_date_time, details } =
              feature.properties as {
                report_number: string;
                crash_year: string;
                crash_date_time: string;
                details: string;
              };

            // Create HTML content for the popup
            let popupContent = `
              <strong>Report Number:</strong> ${report_number}<br/>
              <strong>Year:</strong> ${crash_year}<br/>
              <strong>Date & Time:</strong> ${new Date(
                crash_date_time
              ).toLocaleString()}<br/>
              <strong>Details:</strong><ul>
            `;

            JSON.parse(details).forEach((loc: any) => {
              popupContent += `
                <li>
                  <strong>Role:</strong> ${loc.role}<br/>
                  <strong>Injury Severity:</strong> ${loc.injury_severity}<br/>
                  <strong>Non-Motorist Description Code:</strong> ${
                    loc.non_motorist_description_code || "N/A"
                  }
                </li>
              `;
            });

            popupContent += `</ul>`;

            new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(popupContent)
              .addTo(mapRef.current!);
          }
        });

        // Change the cursor to a pointer when over the unclustered points
        mapRef.current.on("mouseenter", "unclustered-points", () => {
          mapRef.current?.getCanvas().style.setProperty("cursor", "pointer");
        });

        mapRef.current.on("mouseleave", "unclustered-points", () => {
          mapRef.current?.getCanvas().style.setProperty("cursor", "");
        });
      }
    });

    // Cleanup on unmount
    // return () => {
    //   if (mapRef.current) mapRef.current.remove();
    // };
  }, [props.data]);

  return (
    <div className="w-full h-full">
      <div className="bg-[rgba(35, 55, 75, 0.9)]">
        Longitude: {lng} | Latitude: {lat} | Zoom: {initZoom}
      </div>
      <div
        ref={mapContainer}
        className="map-container h-[calc(100vh_-_140px)] w-full relative"
        // className={`map-container h-[calc(100vh_-_${180}px)] w-full relative`}
      />
    </div>
  );
};

// Helper function to add cluster layers
const addClusterLayers = (map: mapboxgl.Map | null) => {
  if (!map) return; // Ensure map is not null before proceeding

  // Add cluster circles
  map.addLayer({
    id: "clusters",
    type: "circle",
    source: "crashData",
    filter: ["has", "point_count"],
    paint: {
      "circle-color": [
        "step",
        ["get", "point_count"],
        "#51bbd6",
        100,
        "#f1f075",
        750,
        "#f28cb1",
      ],
      "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
    },
  });

  // Add cluster count labels
  map.addLayer({
    id: "cluster-count",
    type: "symbol",
    source: "crashData",
    filter: ["has", "point_count"],
    layout: {
      "text-field": "{point_count_abbreviated}",
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 12,
    },
  });

  // Add click event for clusters
  map.on("click", "clusters", (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ["clusters"],
    });
    const clusterId = features[0].properties?.cluster_id;
    const source = map.getSource("crashData") as mapboxgl.GeoJSONSource;

    if (clusterId) {
      source.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) return;

        map.easeTo({
          center: (features[0].geometry as any).coordinates,
          zoom: zoom || 0,
        });
      });
    }
  });

  // Change the cursor to a pointer when over clusters
  map.on("mouseenter", "clusters", () => {
    map.getCanvas().style.setProperty("cursor", "pointer");
  });
  map.on("mouseleave", "clusters", () => {
    map.getCanvas().style.setProperty("cursor", "");
  });
};

export default Map;
