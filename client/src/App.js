import React, { useEffect } from 'react';
import * as three from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import {
  playC4,
  playD4,
  playE4,
  playF4,
  playG4,
  playA4,
  playB4,
  playC5,
  playFilterSynth,
  playStopOscillator,
  playDurationOscillator,
} from './tone.fn.js';

const App = () => {
  useEffect(() => {
    //instantiate a CAMERA and a RENDERER
    const camera = new three.OrthographicCamera(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / -2
    );
    const renderer = new three.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xa9a9a9, 1);
    //tag it to the document
    document.body.appendChild(renderer.domElement);

    //SHAPES ----------------------------------------------------------------------
    //create a cube using pre determined geometry and mesh/skin
    const geometry = new three.RingGeometry(10, 10, 32);
    const material = new three.MeshLambertMaterial({
      color: 0xffff00,
      side: three.DoubleSide,
      wireframe: true,
      wireframeLinewidth: 2,
    });
    const circle = new three.LineLoop(geometry, material);

    const hammerGeometry = new three.PlaneGeometry(0.5, 10, 1);
    const hammerMaterial = new three.MeshBasicMaterial({
      color: 0xffff00,
      side: three.DoubleSide,
      wireframe: false,
    });
    const hammer = new three.Mesh(hammerGeometry, hammerMaterial);
    hammer.position.y = 5;
    hammer.geometry.computeBoundingBox();
    let hammerBox = new three.Box3();
    hammerBox.setFromObject(hammer);
    const hammerHelper = new three.Box3Helper(hammerBox, 0xff0000);

    const sphereGeometry = new three.SphereGeometry(2, 10, 6);
    const sphereMaterial = new three.MeshLambertMaterial({
      color: 0xffff00,
      wireframe: true,
    });
    const sphere = new three.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.y = -50;
    sphere.geometry.computeBoundingSphere();
    const sphereBox = new three.Box3();
    sphereBox.setFromObject(sphere);
    const sphereHelper = new three.Box3Helper(sphereBox, 0xff0000);

    //create a scene and add a cube
    const scene = new three.Scene();
    scene.add(camera);
    scene.add(circle);

    circle.scale.set(50, 50, 50);
    sphere.scale.set(50, 50, 50);
    scene.add(sphere);
    scene.add(sphereHelper);
    // console.log(sphereHelper);

    circle.add(hammer);
    circle.add(hammerHelper);

    let draggableObjects = [];
    draggableObjects.push(sphere);

    camera.position.z = 30;

    //MOUSE EVENTS
    const controls = new DragControls(
      [...draggableObjects],
      camera,
      renderer.domElement
    );
    controls.addEventListener('drag', render);

    //render the scene
    function animate() {
      requestAnimationFrame(animate);

      //CIRCLE ROTATION

      circle.rotation.z += 0.01;
      sphere.rotation.y += 0.01;
      sphere.rotation.x -= 0.01;

      if (sphereBox.intersectsBox(hammerBox)) {
        console.log('hello');
      }
      render();
    }

    function render() {
      //RENDER
      renderer.render(scene, camera);
    }
    animate();
  }, []);
  return <div className="App"></div>;
};

export default App;
