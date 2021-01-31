import React, { useEffect } from 'react';
import { BoxHelper } from 'three';
import * as three from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import * as Tone from 'tone';
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

    //soundstuffs
    const chords = [
      'A0 C1 E1',
      'F0 A0 C1',
      'G0 B0 D1',
      'D0 F0 A0',
      'E0 G0 B0',
    ].map(formatChords);

    Tone.Transport.scheduleRepeat(onRepeat, '16n');
    Tone.Transport.start();
    Tone.Transport.bpm.value = 90;
    const synth = new Tone.Synth();
    const gain = new Tone.Gain(0.7);
    synth.oscillator.type = 'sine';
    gain.toDestination();
    synth.connect(gain);

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

    let draggableObjects = [];

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

    //create a scene and add a cube
    const scene = new three.Scene();
    scene.add(camera);
    scene.add(circle);

    circle.scale.set(20, 20, 20);
    circle.add(hammer);

    generateBoxes()[0]
      .map((box) => scene.add(box))
      .map((box) => draggableObjects.push(box));

    camera.position.z = 30;

    //MOUSE EVENTS
    const controls = new DragControls(
      [...draggableObjects],
      camera,
      renderer.domElement
    );
    controls.addEventListener('drag', render);
    let alreadyPlayed = false;
    let alreadyPlayed2 = false;
    let alreadyPlayed3 = false;
    let alreadyPlayed4 = false;
    let alreadyPlayed5 = false;
    let alreadyPlayed6 = false;
    //render the scene
    function animate() {
      requestAnimationFrame(animate);
      hammerBox
        .copy(hammer.geometry.boundingBox)
        .applyMatrix4(hammer.matrixWorld);
      hammerBox.setFromObject(hammer);
      circle.rotation.z += 0.05;
      scene.children.slice(2).map((box) => (box.rotation.y += 0.01));
      scene.children.slice(2).map((box) => (box.rotation.x += 0.01));

      let boundaries = generateBoxes()[1];
      boundaries.map((box, i) =>
        box
          .copy(scene.children.slice(2)[i].geometry.boundingBox)
          .applyMatrix4(scene.children.slice(2)[i].matrixWorld)
      );

      console.log(boundaries);
      console.log(scene.children.slice(2));

      if (boundaries[0].intersectsBox(hammerBox)) {
        if (alreadyPlayed === false) {
          sinA4();
          alreadyPlayed = true;
        }
      }

      if (!boundaries[0].intersectsBox(hammerBox)) {
        alreadyPlayed = false;
      }

      if (boundaries[1].intersectsBox(hammerBox)) {
        if (alreadyPlayed2 === false) {
          sinB4();
          alreadyPlayed2 = true;
        }
      }

      if (!boundaries[1].intersectsBox(hammerBox)) {
        alreadyPlayed2 = false;
      }

      if (boundaries[2].intersectsBox(hammerBox)) {
        if (alreadyPlayed3 === false) {
          sinF4();
          alreadyPlayed3 = true;
        }
      }

      if (!boundaries[2].intersectsBox(hammerBox)) {
        alreadyPlayed3 = false;
        Tone.Transport.stop();
      }

      if (boundaries[3].intersectsBox(hammerBox)) {
        if (alreadyPlayed4 === false) {
          sinC4();
          alreadyPlayed4 = true;
        }
      }

      if (!boundaries[3].intersectsBox(hammerBox)) {
        alreadyPlayed4 = false;
      }

      if (boundaries[4].intersectsBox(hammerBox)) {
        if (alreadyPlayed5 === false) {
          sinD4();
          alreadyPlayed5 = true;
        }
      }

      if (!boundaries[4].intersectsBox(hammerBox)) {
        alreadyPlayed5 = false;
      }

      if (boundaries[5].intersectsBox(hammerBox)) {
        if (alreadyPlayed6 === false) {
          sinE4();
          alreadyPlayed6 = true;
        }
      }

      if (!boundaries[5].intersectsBox(hammerBox)) {
        alreadyPlayed6 = false;
      }
      render();
    }
    console.log(chords);
    function render() {
      //RENDER
      renderer.render(scene, camera);
    }
    animate();
  }, []);
  return <div className='App'></div>;
};

export default App;
