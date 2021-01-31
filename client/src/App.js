import React, { useEffect } from 'react';
import * as three from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import * as Tone from 'tone';
import Instrument from './Instrument';
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
import { generateBoxes } from './dryloops.js';

const App = () => {
  useEffect(() => {
    //instantiate a CAMERA and a RENDERER
    //Orthographic camera projects 3D space as a 2D image
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
    document.body.appendChild(renderer.domElement);

    //soundstuffs
    // const chords = [
    //   'A0 C1 E1',
    //   'F0 A0 C1',
    //   'G0 B0 D1',
    //   'D0 F0 A0',
    //   'E0 G0 B0',
    // ].map(formatChords);

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
    //generates a randomized set of instruments (in this case, 6)
    //includes random coordinates outside of jamSpace, and random sound
    const instruments = [];
    for (let i = 0; i <= 6; i++) {
      instruments.push(new Instrument());
    }

    //SCENE
    const scene = new three.Scene();
    scene.add(camera);
    scene.add(jamSpace);
    jamSpace.add(hammer);

    //adds each instrument to the scene as a draggable object
    //notice, the instruments mesh is added
    let draggableObjects = [];
    instruments.forEach((instrument) => {
      scene.add(instrument.mesh);
      draggableObjects.push(instrument.mesh);
    });

    //MOUSE EVENTS
    //makes objects(instruments) draggable
    const controls = new DragControls(
      [...draggableObjects],
      camera,
      renderer.domElement
    );
    controls.addEventListener('drag', render);

    //render the scene
    function animate() {
      //requests a render for every frame (60/fps)
      requestAnimationFrame(animate);

      //sets the collision trigger for the hammer
      hammerBox
        .copy(hammer.geometry.boundingBox)
        .applyMatrix4(hammer.matrixWorld);
      hammerBox.setFromObject(hammer);
      jamSpace.rotation.z += 0.05;

      //NEEDS OPTIMIZING ---
      instruments.forEach((instrument) => {
        //every instrument is rotated
        instrument.mesh.rotation.y += 0.01;
        instrument.mesh.rotation.x -= 0.01;

        //every instruments' collision trigger is set
        instrument.boundary
          .copy(instrument.mesh.geometry.boundingBox)
          .applyMatrix4(instrument.mesh.matrixWorld);

        //if the hammer strikes the instrument, play note
        if (instrument.boundary.intersectsBox(hammerBox)) {
          if (instrument.alreadyPlayed === false) {
            instrument.playSound();
            instrument.alreadyPlayed = true;
          }
        } else {
          instrument.alreadyPlayed = false;
        }
      });

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
