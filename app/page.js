// pages/index.js

"use client"; // Directive to ensure this is a client-side component

import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const containerRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const [heroOpacity, setHeroOpacity] = useState(1);
  
  useEffect(() => {
    // Handle scroll for hero section opacity
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Fade hero section as user scrolls down
      if (scrollY > 100) {
        setHeroOpacity(Math.max(1 - scrollY / 500, 0.2));
      } else {
        setHeroOpacity(1);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 200;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    
    // Lights setup
    const topLight = new THREE.DirectionalLight(0xffffff, 1);
    topLight.position.set(500, 500, 500);
    topLight.castShadow = true;
    scene.add(topLight);
    
    const ambientLight = new THREE.AmbientLight(0x334455, 2);
    scene.add(ambientLight);
    
    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // Earth model loading
    let earth;
    const loader = new GLTFLoader();
    
    // You'll need to add the earth model to your public folder
    loader.load('/models/earth/scene.gltf', (gltf) => {
      earth = gltf.scene;
      scene.add(earth);
    });
    
    // Animation and render loop
    const autoRotationSpeed = 0.005;
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (earth) {
        // Auto rotation
        earth.rotation.y += autoRotationSpeed;
        
        // Apply subtle tilt based on mouse position
        earth.rotation.x = -0.2 + mousePosition.current.y * 0.4 / window.innerHeight;
        earth.rotation.z = -0.1 + mousePosition.current.x * 0.2 / window.innerWidth;
      }
      
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Handle mouse movement
    const handleMouseMove = (e) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      controls.dispose();
      renderer.dispose();
    };
  }, []);
  
  return (
    <div className="site-container">
      <Head>
        <title>Map of Wonder | Explore Our World</title>
        <meta name="description" content="Discover the best locations to visit around the world" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap" rel="stylesheet" />
      </Head>
      
      <Header />
      
      <main className="main-content">
        <div className="content-container">
          <div 
            className="hero-section" 
            style={{ opacity: heroOpacity }}
          >
            <h1 className="hero-title">Explore Our Wonderful World</h1>
            <p className="hero-subtitle">Discover breathtaking destinations across the globe</p>
            <button className="explore-button">Start Exploring</button>
          </div>
          
          {/* Add additional content sections here - they will scroll */}
          <div style={{ height: "200vh" }}></div>
        </div>
        
        <div id="globe-container" ref={containerRef} className="globe-container"></div>
      </main>
      
      <Footer />
    </div>
  );
}
