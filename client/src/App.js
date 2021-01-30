import React, { useEffect } from 'react';
import * as three from 'three';
import { BoxHelper } from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
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
    const boxGeometry = new three.BoxGeometry(45, 45, 45);
    const boxMaterial = new three.MeshBasicMaterial();
    const boxOne = new three.Mesh(boxGeometry, boxMaterial);
    const boxTwo = new three.Mesh(boxGeometry, boxMaterial);

    boxOne.geometry.computeBoundingBox();
    boxTwo.geometry.computeBoundingBox();

    const boxOneBoundary = new three.Box3().setFromObject(boxOne);
    const boxTwoBoundary = new three.Box3().setFromObject(boxTwo);

    const boxOneHelper = new three.BoxHelper(boxOne, 0xff0000);

    const boxTwoHelper = new three.BoxHelper(boxTwo, 0xff0000);

    //SCENE
    const scene = new three.Scene();
    scene.add(camera);
    scene.add(boxOne);
    scene.add(boxTwo);
    scene.add(boxOneHelper);
    scene.add(boxTwoHelper);

    let draggableObjects = [];
    draggableObjects.push(boxOne);
    draggableObjects.push(boxTwo);

    camera.position.z = 30;

    //MOUSE EVENTS
    const dragControls = new DragControls(
      [...draggableObjects],
      camera,
      renderer.domElement
    );
    dragControls.addEventListener('drag', render);

    //render the scene
    function animate() {
      requestAnimationFrame(animate);
      boxOneBoundary
        .copy(boxOne.geometry.boundingBox)
        .applyMatrix4(boxOne.matrixWorld);
      boxTwoBoundary
        .copy(boxTwo.geometry.boundingBox)
        .applyMatrix4(boxTwo.matrixWorld);

      boxOneHelper.update(boxOneBoundary);
      boxTwoHelper.update(boxTwoBoundary);
      if (boxOneBoundary.intersectsBox(boxTwoBoundary)) {
        console.log('hello');
      }

      //CIRCLE ROTATION
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
