import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const LungsGasExchange = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const createLungsModel = () => {
      const geometry = new THREE.CylinderGeometry(0.5, 0.5, 2);
      const material = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
      const lungs = new THREE.Mesh(geometry, material);
      scene.add(lungs);
      lungs.position.x = -2;
    };

    const createOceanGasExchangeModel = () => {
      const geometry = new THREE.SphereGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0xADD8E6 });
      const oceanGasExchange = new THREE.Mesh(geometry, material);
      scene.add(oceanGasExchange);
      oceanGasExchange.position.x = 2;
    };

    createLungsModel();
    createOceanGasExchangeModel();

    camera.position.z = 5;
    const loaderCube = new THREE.CubeTextureLoader();
    const textureCube = loaderCube.load([
      '/textures/skybox_px.jpg',
      '/textures/skybox_nx.jpg',
      '/textures/skybox_py.jpg',
      '/textures/skybox_ny.jpg',
      '/textures/skybox_pz.jpg',
      '/textures/skybox_nz.jpg',
    ]);
    scene.background = textureCube;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '33%', height: '500px' }} />;
};

export default LungsGasExchange;
