import React, { useCallback, useState } from "react";
import { geoMercator } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

import brTopoJson from "./data/br-topo.json";
import "./App.css";

var width = 960,
  height = 600;

var projection = geoMercator()
  .scale(850)
  .center([-52, -15])
  .translate([width / 2, height / 2]);

const markers = [
  {
    markerOffset: -30,
    name: "Brasil",
    coordinates: [-58.3816, -34.6037],
  },
  { markerOffset: 15, name: "Brasilia", coordinates: [-47.8825, -15.7942] },
  { markerOffset: 15, name: "São Paulo", coordinates: [-46.6388, -23.5489] },
];

const MapChart = () => {
  const [test, setTest] = useState("");
  const [qnt, setQnt] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");

  const testHandle = useCallback((geo) => {
    setTest(geo.properties.nome);
  });
  const qntHandle = useCallback((geo) => {
    setQnt(geo.properties.quantidade);
  });
  const cityHandle = useCallback((geo) => {
    setCity(geo.properties.city);
  });
  const statusHandle = useCallback((geo) => {
    setStatus(geo.properties.status);
  });
  return (
    <>
      <ComposableMap projection={projection}>
        <Geographies geography={brTopoJson}>
          {({ geographies }) => (
            <>
              {geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    testHandle(geo);
                    cityHandle(geo);
                    qntHandle(geo);
                    statusHandle(geo);
                  }}
                  style={{
                    default: {
                      fill: "#fff",
                      outline: "none",
                    },
                    hover: {
                      fill: "#D71920",
                      outline: "none",
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none",
                    },
                  }}
                ></Geography>
              ))}
            </>
          )}
        </Geographies>
        {markers.map(({ name, coordinates, markerOffset }) => (
          <Marker key={name} coordinates={coordinates}>
            <g
              fill="none"
              stroke="#FF5533"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(-12, -24)"
            >
              <circle cx="12" cy="10" r="3" />
              <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
            </g>
            <text
              textAnchor="middle"
              y={markerOffset}
              style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
            >
              {name}
            </text>
          </Marker>
        ))}
      </ComposableMap>
      <h1>Estado:{test}</h1>
      <h1>Cidade:{city}</h1>
      <h1>Status:{status}</h1>
    </>
  );
};

export default MapChart;
