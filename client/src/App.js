import React, { useEffect } from 'react';
import { BoxHelper } from 'three';
import * as three from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import * as Tone from 'tone'
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
    let intersects;
    let count = 0
    //instantiate a CAMERA and a RENDERER
    const camera = new three.OrthographicCamera(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / -2,
      1,
      1000
    );
    const renderer = new three.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x38373d, 1);
    //tag it to the document
    document.body.appendChild(renderer.domElement);

    //SHAPES ----------------------------------------------------------------------
    //create a cube using pre determined geometry and mesh/skin
    const geometry = new three.RingGeometry(10, 10, 32);
    const material = new three.MeshBasicMaterial({
      color: 0x1be322,
      side: three.DoubleSide,
      wireframe: true,
      wireframeLinewidth: 2,
    });
    const circle = new three.LineLoop(geometry, material);

    const boxGeometry = new three.BoxGeometry(20, 20, 20);
    const boxMaterial = new three.MeshBasicMaterial({ wireframe: true, color: 0x1be322, });
    const boxOne = new three.Mesh(boxGeometry, boxMaterial);
    boxOne.geometry.computeBoundingBox();
    const boxOneBoundary = new three.Box3().setFromObject(boxOne);
    const boxOneHelper = new three.BoxHelper(boxOne, 0xff0000);
    boxOneHelper.object = boxOne;
    boxOne.position.setX(-300)

    const boxTwo = new three.Mesh(boxGeometry, boxMaterial);
    boxOne.geometry.computeBoundingBox();
    const boxTwoBoundary = new three.Box3().setFromObject(boxOne);
    const boxTwoHelper = new three.BoxHelper(boxOne, 0xff0000);
    boxTwoHelper.object = boxTwo;
    boxTwo.position.setX(-300)
    boxTwo.position.setY(150)
    
    const hammerGeometry = new three.BoxGeometry(0.1, 10, .1);
    const hammerMaterial = new three.MeshBasicMaterial({
      color: 0x1be322,
      side: three.DoubleSide,
      wireframe: false,
    });
    const hammer = new three.Mesh(hammerGeometry, hammerMaterial);
    hammer.position.y = 5;
    hammer.geometry.computeBoundingBox();
    let hammerBox = new three.Box3();
    hammerBox.setFromObject(hammer);

    //create a scene and add a cube
    const scene = new three.Scene();
    scene.add(camera);
    scene.add(circle);
    scene.add(boxOne)
    circle.scale.set(20, 20, 20);
    circle.add(hammer);

    let draggableObjects = [];
    draggableObjects.push(boxOne);

    camera.position.z = 30;

    //MOUSE EVENTS
    const controls = new DragControls(
      [...draggableObjects],
      camera,
      renderer.domElement
    );
    controls.addEventListener('drag', render);
let alreadyPlayed = false;
    //render the scene
    function animate() {
      requestAnimationFrame(animate);
      hammerBox.copy(hammer.geometry.boundingBox).applyMatrix4(hammer.matrixWorld)
      hammerBox.setFromObject(hammer)
      circle.rotation.z += 0.05;
      boxOne.rotation.y += 0.01;
      boxOne.rotation.x -= 0.01;
  
      boxOneBoundary
      .copy(boxOne.geometry.boundingBox)
      .applyMatrix4(boxOne.matrixWorld);

      if (boxOneBoundary.intersectsBox(hammerBox)) {
        if (alreadyPlayed === false) {
          playC4()
          alreadyPlayed = true
        }}

        if (!boxOneBoundary.intersectsBox(hammerBox)) {
          alreadyPlayed = false
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
