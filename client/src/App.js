import React, { useState, useEffect } from 'react';
import * as three from 'three';

const App = () => {
  useEffect(() => {
    //instantiate a CAMERA and a RENDERER
    const camera = new three.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new three.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    //tag it to the document
    document.body.appendChild(renderer.domElement);

    //create a cube using pre determined geometry and mesh/skin
    const geometry = new three.BoxGeometry();
    const material = new three.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new three.Mesh(geometry, material);

    //create a scene and add a cube
    const scene = new three.Scene();
    scene.add(cube);
    //camera position z:  greater ints zoom out
    camera.position.z = 3;

    //render the scene
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      //rotate the cube this fast
      cube.rotation.x += 0.05;
      cube.rotation.y += 0.01;
    }
    animate();
  }, []);
  return <div className="App"></div>;
};

export default App;
