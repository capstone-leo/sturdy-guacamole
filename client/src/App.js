import React, { useEffect } from 'react';
import { BoxHelper } from 'three';
import * as three from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import * as Tone from 'tone';
import Instrument from './3d-instrument';
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
  formatChords,
  onRepeat,
  sinB4,
  sinA4,
  sinC4,
  sinD4,
  sinE4,
  sinF4,
  sinG4,
} from './tone.fn.js';

const App = () => {
  useEffect(() => {
    //instantiate a CAMERA and a RENDERER
    const camera = new three.OrthographicCamera(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / -2,
      -1000,
      1000
    );
    camera.position.z = 30;
    const renderer = new three.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x38373d, 1);
    //tag it to the document
    document.body.appendChild(renderer.domElement);

    //soundstuffs

    // Tone.Transport.scheduleRepeat(onRepeat, '16n');
    // Tone.Transport.start();
    // Tone.Transport.bpm.value = 90;

    // const synth = new Tone.Synth();
    // const gain = new Tone.Gain(0.7);
    // synth.oscillator.type = 'sine';
    // gain.toDestination();
    // synth.connect(gain);

    //JAMSPACE & HAMMER ----------------------------------------------------------------------
    const jamSpaceGeometry = new three.RingGeometry(10, 10, 32);
    const jamSpaceMaterial = new three.MeshBasicMaterial({
      color: 0x1be322,
      side: three.DoubleSide,
      wireframe: true,
      wireframeLinewidth: 2,
    });
    const jamSpace = new three.LineLoop(jamSpaceGeometry, jamSpaceMaterial);
    jamSpace.scale.set(20, 20, 20);

    const hammerGeometry = new three.BoxGeometry(0.1, 10, 0.1);
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

    //INSTRUMENTS

    const instrument = new Instrument();
    const instruments = [];
    instruments.push(instrument);
    console.log(instruments);

    //SCENE
    const scene = new three.Scene();
    scene.add(camera);
    scene.add(jamSpace);
    jamSpace.add(hammer);

    let draggableObjects = [];
    instruments.forEach((instrument) => {
      scene.add(instrument.mesh);
      draggableObjects.push(instrument.mesh);
    });

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
      hammerBox
        .copy(hammer.geometry.boundingBox)
        .applyMatrix4(hammer.matrixWorld);

      hammerBox.setFromObject(hammer);
      jamSpace.rotation.z += 0.05;

      instruments.forEach((instrument) => {
        instrument.mesh.rotation.y += 0.01;
        instrument.mesh.rotation.x -= 0.01;
        instrument.boundary
          .copy(instrument.mesh.geometry.boundingBox)
          .applyMatrix4(instrument.mesh.matrixWorld);
      });

      if (instrument.boundary.intersectsBox(hammerBox)) {
        if (instrument.alreadyPlayed === false) {
          instrument.playSound();
          instrument.alreadyPlayed = true;
        }
      } else {
        instrument.alreadyPlayed = false;
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
