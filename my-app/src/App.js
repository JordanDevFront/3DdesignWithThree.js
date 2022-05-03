import "./App.css";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";

import Brazil from "@svg-maps/brazil";
import { SVGMap } from "react-svg-map";

import React, { useState, Suspense } from "react";
import { MapBrazil } from "react-brazil-map";

import MapChart from "./MapChart";

import Grafico from "./components/Grafico";
import CardInfo from "./components/Card";
import Menu from "./components/Navbar";
import "react-svg-map/lib/index.css";
import { Earth } from "./components/earth";

import brTopoJson from "./data/br-topo.json";

import ReactTooltip from "react-tooltip";

const CanvasContainer = styled.div`
  width: 100%;
`;

const ContainerDashboard = styled.div`
  width: 100%;
  height: 720px;
  display: flex;
`;

const EarthMap = styled.div`
  width: 50%;
  height: 700px;
  margin: 10px;
`;

const Map = styled.div`
  width: 100%;
  height: 520px;
  position: relative;
  top: -30px;
`;

const Modal = styled.div`
  color: white;
  margin: 10px;
  width: 98%;
  height: 20%;
  display: flex;
`;

const UserBox = styled.div`
  margin: 10px;
  width: 49%;
`;

const Box = styled.div`
  width: 25%;
  height: 700px;
  border: 1px solid white;
  color: white;
`;

const Container = styled.div`
  width: 100%;
  height: 300px;
`;

const Maps = styled.div`
  text-align: center;
  .svg-map {
    width: 50%;
    height: auto;
    stroke: #666;
    stroke-width: 1;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .svg-map__location {
    fill: #00ffff;
    opacity: 0.8;
    cursor: pointer;
  }

  .svg-map__location:focus,
  .svg-map__location:hover {
    fill: #00ffff;
    opacity: 0.4;
    outline: 0;
  }

  .svg-map__location[aria-checked="true"] {
    fill: #0000ff;
  }
`;

function App() {
  return (
    <CanvasContainer>
      <Menu />
      <ContainerDashboard>
        <Box></Box>
        <EarthMap>
          <Modal>
            <UserBox>
              <CardInfo />
            </UserBox>
            <UserBox>
              <CardInfo />
            </UserBox>
          </Modal>
          <Map>
            <Canvas>
              <Suspense fallback={null}>
                <Earth />
              </Suspense>
            </Canvas>
          </Map>
        </EarthMap>
        <Box>Moedas</Box>
      </ContainerDashboard>

      {/*<Container>
        <Grafico />
      </Container> */}
    </CanvasContainer>
  );
}

export default App;
