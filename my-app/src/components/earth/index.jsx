import { useFrame, useLoader } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TextureLoader } from "three";
import * as THREE from "three";

import EarthDayMap from "../../assets/textures/nuvem2.png";
import Cloud from "../../assets/textures/nuvem2.png";

export function Earth(props) {
  const [earthMap, cloudMap] = useLoader(TextureLoader, [EarthDayMap, Cloud]);
  const earthRef = useRef();
  const cloudRef = useRef();


  const [distritc, setDistrict] = useState('São Paulo')
  console.log(distritc)

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    earthRef.current.rotation.y = elapsedTime / 6;
    cloudRef.current.rotation.y = elapsedTime / 12;
  });

  return (
    <>
      <ambientLight intensity={1} />
      <pointLight color="black" intensity={1.2} />

      <mesh ref={cloudRef}>
        <sphereGeometry args={[3.3, 100, 100]} />
        <meshPhongMaterial
          map={cloudMap}
          opacity={0.9}
          depthWrite={true}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh ref={earthRef}>
        <sphereGeometry args={[3, 100, 100]} />
        <meshPhongMaterial earthMap={earthMap} />
        <meshStandardMaterial
          earthMap={earthMap}
          map={earthMap}
          opacity={0.9}
          metalness={0.4}
          roughness={0.7}
        />

        <Marker rotation={[15, Math.PI / 3, 0]} position={[0, -1.8, 2.8, 4]}>
          <FaMapMarkerAlt style={{ color: "00ffff" }} onClick={setDistrict} />
          <label
            id=""
            style={{
              display: "block",
              position: "absolute",
              color: "white",
              fontSize: 10,
              letterSpacing: -0.5,
              left: 17.5,
              top: -10,
            }}
          >
            {distritc}
          </label>
        </Marker>

        <Teste rotation={[0, Math.PI / 4, 0]} position={[0, 3.5, 0]}>
          <FaMapMarkerAlt style={{ color: "00ffff" }} />
        </Teste>

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.4}
        />
      </mesh>
    </>
  );
}

function Marker({ children, ...props }) {
  // This holds the local occluded state
  const [occluded, occlude] = useState();
  return (
    <Html
      // 3D-transform contents
      transform
      // Hide contents "behind" other meshes
      occlude
      // Tells us when contents are occluded (or not)
      onOcclude={occlude}
      // We just interpolate the visible state into css opacity and transforms
      style={{
        transition: "all 0.2s",
        opacity: occluded ? 0 : 1,
        transform: `scale(${occluded ? 0.25 : 1})`,
      }}
      {...props}
    >
      {children}
    </Html>
  );
}

function Teste({children, ...props}){
  // This holds the local occluded state
  const [occluded, occlude] = useState();
  return (
    <Html
      // 3D-transform contents
      transform
      // Hide contents "behind" other meshes
      occlude
      // Tells us when contents are occluded (or not)
      onOcclude={occlude}
      // We just interpolate the visible state into css opacity and transforms
      style={{
        transition: "all 0.2s",
        opacity: occluded ? 0 : 1,
        transform: `scale(${occluded ? 0.25 : 1})`,
      }}
      {...props}
    >
      {children}
    </Html>
  );
}
