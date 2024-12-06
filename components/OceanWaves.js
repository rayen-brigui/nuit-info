import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

const OceanWaves = ({ activeText }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    console.log(camera.position);
    camera.position.y=30

    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    // Load skybox texture
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

    // Create the ocean
    const geometry = new THREE.PlaneGeometry(1000, 1000, 500, 500);
    const material = new THREE.MeshPhongMaterial({
      color: 0x1e90ff,
      flatShading: true,
      side: THREE.DoubleSide,
    });
    const texture = loaderCube.load(['/sea-water-texture.png'])
    const ocean = new THREE.Mesh(geometry, material);
    ocean
    ocean.rotation.x = -Math.PI / 2;
    scene.add(ocean);

    // Add light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5);
    scene.add(light);

    // Add 3D text
    const fontLoader = new FontLoader();
    fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
      const textGeometry = new TextGeometry(activeText, {
        font: font,
        size: 10,
        height: 0.1,
      });
      const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.set(-1.5, 2, 0);
      scene.add(textMesh);
    });

    // Animate the waves
    const animateWaves = () => {
      const time = Date.now() * 0.0005;
      const positionAttribute = ocean.geometry.attributes.position;
      for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);
        const z = Math.sin(time + x + y) * 0.4;
        positionAttribute.setZ(i, z);
      }
      positionAttribute.needsUpdate = true;
    };

    const animate = () => {
      requestAnimationFrame(animate);
      animateWaves();
      controls.update();
      renderer.render(scene, camera);
    };

    camera.position.z = 30;
    animate();

    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, [activeText]);

  return <div ref={mountRef} style={{ width: '33%', height: '500px' }} />;
};

export default OceanWaves;
