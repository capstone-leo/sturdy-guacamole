import React, { useState, useEffect } from 'react';
import * as three from 'three';
import * as Tone from 'tone';

const App = () => {
  useEffect(() => {
    //instantiate a CAMERA and a RENDERER
    const camera = new three.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new three.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xa9a9a9, 1);
    //tag it to the document
    document.body.appendChild(renderer.domElement);

    //create a cube using pre determined geometry and mesh/skin
    const geometry = new three.RingGeometry(10, 10, 32);
    const material = new three.MeshBasicMaterial({
      color: 0xffff00,
      side: three.DoubleSide,
      wireframe: true,
      wireframeLinewidth: 2,
    });
    const circle = new three.LineLoop(geometry, material);

    const planeGeometry = new three.PlaneGeometry(0.5, 20, 32);
    const planeMaterial = new three.MeshBasicMaterial({
      color: 0xffff00,
      side: three.DoubleSide,
    });
    const plane = new three.Mesh(planeGeometry, planeMaterial);

    //create a scene and add a cube
    const scene = new three.Scene();
    scene.add(circle);
    scene.add(plane);
    //camera position z:  greater ints zoom out
    camera.position.z = 20;

    const chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination().start();
    // const synth = new Tone.PolySynth().connect(chorus);
    //render the scene
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);

      circle.rotation.z += 0.01;

      plane.rotation.z += 0.01;
    }
    animate();
  }, []);
  return <div className="App"></div>;
};

export default App;
