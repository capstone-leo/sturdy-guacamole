import React, { useEffect } from 'react';
import { BoxHelper } from 'three';
import * as three from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import * as Tone from 'tone';
import { playC4, playD4, playE4, playF4, playG4, playA4, playB4, playC5, playFilterSynth, playStopOscillator, playDurationOscillator,
formatChords, onRepeat, sinB4, sinA4, sinC4, sinD4, sinE4, sinF4, sinG4} from './tone.fn.js';

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

    const $inputs = document.querySelectorAll('input'),

    chords = [
      'A0 C1 E1', 'F0 A0 C1', 'G0 B0 D1',
      'D0 F0 A0', 'E0 G0 B0'].map(formatChords)
      var chordIdx = 0,
      step = 0;

      // function handleChord(valueString) {
      //   chordIdx = parseInt(valueString) - 1;
      // }

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

    const boxGeometry = new three.BoxGeometry(20, 20, 20);
    const boxMaterial = new three.MeshBasicMaterial({
      wireframe: true,
      color: 0xff7700,
    });
    const boxOne = new three.Mesh(boxGeometry, boxMaterial);
    boxOne.geometry.computeBoundingBox();
    const boxOneBoundary = new three.Box3().setFromObject(boxOne);
    const boxOneHelper = new three.BoxHelper(boxOne, 0xff0000);
    boxOneHelper.object = boxOne;
    boxOne.position.setX(-300);

    const boxTwoMaterial = new three.MeshBasicMaterial({
      wireframe: true,
      color: 0xe525fa,
    });
    const boxTwo = new three.Mesh(boxGeometry, boxTwoMaterial);
    boxTwo.geometry.computeBoundingBox();
    const boxTwoBoundary = new three.Box3().setFromObject(boxOne);
    const boxTwoHelper = new three.BoxHelper(boxOne, 0xff0000);
    boxTwoHelper.object = boxTwo;
    boxTwo.position.setX(-300);
    boxTwo.position.setY(150);

    const boxThreeMaterial = new three.MeshBasicMaterial({
      wireframe: true,
      color: 0x00eaff,
    });
    const boxThree = new three.Mesh(boxGeometry, boxThreeMaterial);
    boxThree.geometry.computeBoundingBox();
    const boxThreeBoundary = new three.Box3().setFromObject(boxOne);
    const boxThreeHelper = new three.BoxHelper(boxOne, 0xff0000);
    boxThreeHelper.object = boxThree;
    boxThree.position.setX(-300);
    boxThree.position.setY(-150);

    const boxFourMaterial = new three.MeshBasicMaterial({
      wireframe: true,
      color: 0xffe100,
    });
    const boxFour = new three.Mesh(boxGeometry, boxFourMaterial);
    boxFour.geometry.computeBoundingBox();
    const boxFourBoundary = new three.Box3().setFromObject(boxOne);
    const boxFourHelper = new three.BoxHelper(boxOne, 0xff0000);
    boxFourHelper.object = boxFour;
    boxFour.position.setX(300);
    boxFour.position.setY(150);

    const boxFiveMaterial = new three.MeshBasicMaterial({
      wireframe: true,
      color: 0xff0000,
    });
    const boxFive = new three.Mesh(boxGeometry, boxFiveMaterial);
    boxFive.geometry.computeBoundingBox();
    const boxFiveBoundary = new three.Box3().setFromObject(boxOne);
    const boxFiveHelper = new three.BoxHelper(boxOne, 0xff0000);
    boxFiveHelper.object = boxFive;
    boxFive.position.setX(300);
    boxFive.position.setY(0);

    const boxSixMaterial = new three.MeshBasicMaterial({
      wireframe: true,
      color: 0x6200ff,
    });
    const boxSix = new three.Mesh(boxGeometry, boxSixMaterial);
    boxSix.geometry.computeBoundingBox();
    const boxSixBoundary = new three.Box3().setFromObject(boxOne);
    const boxSixHelper = new three.BoxHelper(boxOne, 0xff0000);
    boxSixHelper.object = boxSix;
    boxSix.position.setX(300);
    boxSix.position.setY(-150);

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
    scene.add(boxOne);
    scene.add(boxTwo);
    scene.add(boxThree);
    scene.add(boxFour);
    scene.add(boxFive);
    scene.add(boxSix);
    circle.scale.set(20, 20, 20);
    circle.add(hammer);

    let draggableObjects = [];
    draggableObjects.push(boxOne, boxTwo, boxThree, boxFour, boxFive, boxSix);

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
      boxOne.rotation.y += 0.01;
      boxOne.rotation.x -= 0.01;
      boxTwo.rotation.y += 0.01;
      boxTwo.rotation.x -= 0.01;
      boxThree.rotation.y += 0.01;
      boxThree.rotation.x -= 0.01;
      boxFour.rotation.y += 0.01;
      boxFour.rotation.x -= 0.01;
      boxFive.rotation.y += 0.01;
      boxFive.rotation.x -= 0.01;
      boxSix.rotation.y += 0.01;
      boxSix.rotation.x -= 0.01;
      boxTwoBoundary
        .copy(boxTwo.geometry.boundingBox)
        .applyMatrix4(boxTwo.matrixWorld);
      boxOneBoundary
        .copy(boxOne.geometry.boundingBox)
        .applyMatrix4(boxOne.matrixWorld);
      boxThreeBoundary
        .copy(boxThree.geometry.boundingBox)
        .applyMatrix4(boxThree.matrixWorld);
      boxFourBoundary
        .copy(boxFour.geometry.boundingBox)
        .applyMatrix4(boxFour.matrixWorld);
      boxFiveBoundary
        .copy(boxFive.geometry.boundingBox)
        .applyMatrix4(boxFive.matrixWorld);
      boxSixBoundary
        .copy(boxSix.geometry.boundingBox)
        .applyMatrix4(boxSix.matrixWorld);

          if (boxOneBoundary.intersectsBox(hammerBox)) {
        if (alreadyPlayed === false) {
          sinA4()
          alreadyPlayed = true
        }
          }

      if (!boxOneBoundary.intersectsBox(hammerBox)) {
      alreadyPlayed = false
      }

      if (boxTwoBoundary.intersectsBox(hammerBox)) {
          // handleChord(5)
          if (alreadyPlayed2 === false) {
            sinB4()
            alreadyPlayed2 = true
      }
    }

      if (!boxTwoBoundary.intersectsBox(hammerBox)) {
        alreadyPlayed2 = false;
      }

      if (boxThreeBoundary.intersectsBox(hammerBox)) {
      chordIdx = 3
      if (alreadyPlayed3 === false){
      Tone.start()
      Tone.Transport.start()
      alreadyPlayed3 = true
      }
      }

      if (!boxThreeBoundary.intersectsBox(hammerBox)) {
        alreadyPlayed3 = false
      Tone.Transport.stop()
      }

    

      if (boxFourBoundary.intersectsBox(hammerBox)) {
        if (alreadyPlayed4 === false) {
          sinC4();
          alreadyPlayed4 = true;
        }
      }

      if (!boxFourBoundary.intersectsBox(hammerBox)) {
        alreadyPlayed4 = false;
      }

      if (boxFiveBoundary.intersectsBox(hammerBox)) {
        if (alreadyPlayed5 === false) {
          sinD4();
          alreadyPlayed5 = true;
        }
      }

      if (!boxFiveBoundary.intersectsBox(hammerBox)) {
        alreadyPlayed5 = false;
      }

      if (boxSixBoundary.intersectsBox(hammerBox)) {
        if (alreadyPlayed6 === false) {
          sinE4();
          alreadyPlayed6 = true;
        }
      }

      if (!boxSixBoundary.intersectsBox(hammerBox)) {
        alreadyPlayed6 = false;
      }



      render();
    }
console.log(chords)
    function render() {
      //RENDER
      renderer.render(scene, camera);
    }
    animate();
  }, []);
  return <div className='App'></div>;
};

export default App;
