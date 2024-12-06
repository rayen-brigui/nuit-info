import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

const HeartCirculatory = ({ activeText }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    // Load a human model
    const loader = new OBJLoader();
    loader.load('/models/human.obj', (object) => {
      scene.add(object);
    });

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

    // Add 3D text
    const fontLoader = new FontLoader();
    fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
      const textGeometry = new TextGeometry(activeText, {
        font: font,
        size: 0.5,
        height: 0.1,
      });
      const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.set(-1.5, 2, 0);
      scene.add(textMesh);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    camera.position.z = 20;
    camera.position.y = 30
    animate();

    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, [activeText]);

  return <div ref={mountRef} style={{ width: '33%', height: '500px' }} />;
};

export default HeartCirculatory;
