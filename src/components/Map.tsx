import mapboxgl from "!mapbox-gl";
import { select } from "d3";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_REACT_APP_MAPBOX_TOKEN;

const Map = ({ data, colorScale, colorValue }: any) => {
  const mapWidthOffset = 180;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-84.2875);
  const [lat, setLat] = useState(30.4543);
  const [zoom, setZoom] = useState(11.53);

  const project = (d) => {
    return map.current.project(new mapboxgl.LngLat(d.longitude, d.latitude));
  };

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    if (!data) {
      return;
    }

    select(map.current.getCanvasContainer()).selectAll("svg").remove();

    const svg = select(map.current.getCanvasContainer())
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .style("position", "absolute")
      .style("pointer-events", "none");

    map.current.on("load", () => {
      const dots = svg
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 4)
        .style("fill", (d: any) => colorScale(colorValue(d)))
        .style("opacity", 0.7);

      const render = () => {
        dots.attr("cx", (d) => project(d).x).attr("cy", (d) => project(d).y);
      };

      map.current.on("viewreset", render);
      map.current.on("move", render);
      map.current.on("moveend", render);
      render();

      return () => {
        map.current.remove();
      };
    });
  }, []);

  // update dots on the map
  useEffect(() => {
    if (!map.current || !data) return; // wait for map to initialize
    const oldSvg = select(map.current.getCanvasContainer()).select("svg");
    oldSvg.remove();

    const svg = select(map.current.getCanvasContainer())
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .style("position", "absolute")
      .style("pointer-events", "none");

    const dots = svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", 4)
      .style("fill", (d: any) => colorScale(colorValue(d)))
      .style("opacity", 0.7);

    // render correct position
    const render = () => {
      dots.attr("cx", (d) => project(d).x).attr("cy", (d) => project(d).y);
    };
    map.current.on("viewreset", render);
    map.current.on("move", render);
    map.current.on("moveend", render);
    render();
  }, [data]);

  return (
    <div className="w-full h-full">
      <div className="bg-[rgba(35, 55, 75, 0.9)]">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div
        ref={mapContainer}
        className="map-container h-[calc(100vh_-_140px)] w-full relative"
        // className={`map-container h-[calc(100vh_-_${180}px)] w-full relative`}
      />
    </div>
  );
};

export default Map;
