import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import * as Tone from 'tone';
import Instrument from './Instrument';
import { Slider } from './Slider';
import Modal from 'react-modal';

<<<<<<< HEAD
=======
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

>>>>>>> db8bb6e6787369118eb92e5cf092da1011695b61
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
	sinG4
} from './tone.fn.js';
import { generateBoxes } from './dryloops.js';

<<<<<<< HEAD
let objectSelect;

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    //instantiate a CAMERA and a RENDERER
    //Orthographic camera projects 3D space as a 2D image
    const camera = new THREE.OrthographicCamera(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / -2,
      -1000,
      1000
    );
    camera.position.z = 30;
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x38373d, 1);
    document.body.appendChild(renderer.domElement);

    function onWindowResize() {
      const aspect = window.innerWidth / window.innerHeight;

      camera.left = (window.innerWidth * aspect) / -2;
      camera.right = (window.innerWidth * aspect) / 2;
      camera.top = window.innerWidth / 2;
      camera.bottom = window.innerWidth / -2;

      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

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
    const jamSpaceGeometry = new THREE.RingGeometry(10, 10, 32);
    const jamSpaceMaterial = new THREE.MeshBasicMaterial({
      color: 0x1be322,
      side: THREE.DoubleSide,
      wireframe: true,
      wireframeLinewidth: 2,
    });
    const jamSpace = new THREE.LineLoop(jamSpaceGeometry, jamSpaceMaterial);
    jamSpace.scale.set(20, 20, 20);

    const hammerGeometry = new THREE.BoxGeometry(0.1, 10, 0.1);
    const hammerMaterial = new THREE.MeshBasicMaterial({
      color: 0x1be322,
      side: THREE.DoubleSide,
      wireframe: false,
    });

    const hammer = new THREE.Mesh(hammerGeometry, hammerMaterial);
    hammer.position.y = 5;
    hammer.geometry.computeBoundingBox();
    let hammerBox = new THREE.Box3();
    hammerBox.setFromObject(hammer);

    //INSTRUMENTS
    //generates a randomized set of instruments (in this case, 6)
    //includes random coordinates outside of jamSpace, and random sound
    const instruments = [];
    for (let i = 0; i <= 6; i++) {
      instruments.push(new Instrument());
    }

    //SCENE
    const scene = new THREE.Scene();
    scene.add(camera);
    scene.add(jamSpace);
    jamSpace.add(hammer);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    //adds each instrument to the scene as a draggable object
    //notice, the instruments mesh is added
    let draggableObjects = [];
    instruments.forEach((instrument) => {
      scene.add(instrument.mesh);
      draggableObjects.push(instrument.mesh);
    });

    //MOUSE EVENTS
    //makes objects(instruments) draggable
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    let drag = false;
    function onMouseMove(event) {
      event.preventDefault();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    let controls = new DragControls(
      [...draggableObjects],
      camera,
      renderer.domElement
    );
    controls.addEventListener('drag', onDrag);
    function onDrag() {
      drag = true;
      render();
    }

    let sliderValue = 0.05;
    let slider = document.getElementById('slider');
    slider.addEventListener('input', onInput);
    function onInput() {
      sliderValue = Number(slider.value);
    }

    function addInstrument() {
      const newInstrument = new Instrument();
      instruments.push(newInstrument);
      scene.add(newInstrument.mesh);
      draggableObjects.push(newInstrument.mesh);
      controls = new DragControls(
        [...draggableObjects],
        camera,
        renderer.domElement
      );
    }

    function playSound() {
      if (objectSelect) {
        if (objectSelect.hover) {
          objectSelect.sound();
        }
      }
    }

    window.addEventListener('dblclick', addInstrument, false);
    window.addEventListener('click', playSound, false);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onWindowResize);

    //render the scene
    function animate() {
      //requests a render for every frame (60/fps)
      requestAnimationFrame(animate);

      //sets the collision trigger for the hammer
      hammerBox
        .copy(hammer.geometry.boundingBox)
        .applyMatrix4(hammer.matrixWorld);
      hammerBox.setFromObject(hammer);

      jamSpace.rotation.z += sliderValue;
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
      //raycaster set up
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(draggableObjects);
      if (intersects.length > 0) {
        if (objectSelect !== intersects[0].object) {
          if (objectSelect)
            objectSelect.material.emissive.setHex(objectSelect.currentHex);

          objectSelect = intersects[0].object;
          objectSelect.hover = true;
          objectSelect.currentHex = objectSelect.material.emissive.getHex();
          objectSelect.material.emissive.setHex(0xff0000);
        }
      } else {
        if (objectSelect)
          objectSelect.material.emissive.setHex(objectSelect.currentHex);

        objectSelect = null;
      }
      //RENDER
      renderer.render(scene, camera);
    }
    animate();
  }, []);
  return (
    <div className="App" style={{ background: '#38373d', color: 'whitesmoke' }}>
      <Slider id="slider" />
      <button
        className="about"
        style={{
          color: 'whitesmoke',
          position: 'relative',
          background: 'transparent',
          border: 'transparent',
        }}
        onClick={() => setModalOpen(!modalOpen)}
      >
        about
      </button>
      <Modal className="Modal" isOpen={modalOpen}>
        <div className="modalTextDiv">
          double click these shapes to adjust their sounds
          <br />
          single click to play a sound
          <br />
          jam with your friends or play by yourself <br />
          PLACEHOLDERS
        </div>
        <button className="closer" onClick={() => setModalOpen(!modalOpen)}>
          close
        </button>
      </Modal>
    </div>
  );
=======
import { auth, db } from './Home';

//Main Component
const App = () => {
	const [modalOpen, setModalOpen] = useState(false);

	const [user] = useAuthState(auth); //user JSON
	console.log('user-->', user);

	//seed
	const citiesRef = db.collection('cities');
	// const sceneRef = db.collection('scenes');

	async function setCities() {
		return await citiesRef.doc('SF').set({
			name: 'San Francisco',
			state: 'CA',
			country: 'USA',
			capital: false,
			population: 860000
		});
	}

	// const sceneRef = db.collection('scenes');

	// async function setScene() {
	//   return await sceneRef.doc('scene').set({
	//     scene:
	//   })
	// }
	// console.log(scene)
	setCities();
	//get
	const cityRef = db.collection('cities').doc('SF');

	async function fetchCities() {
		const doc = await cityRef.get();
		if (!doc.exists) {
			console.log('No such document!');
		} else {
			console.log('Document data:', doc.data());
		}
	}
	fetchCities();

	// //db Collection reference
	// const sessionRef = db.collection('Session');
	// console.log('sessionRef-->', sessionRef);

	// //query
	// const query = async () => await sessionRef.get();
	// console.log('query-->', query());

	// const [SessionList] = useCollectionData(query);
	// console.log('SessionList-->', SessionList);

	useEffect(() => {
		//instantiate a CAMERA and a RENDERER
		//Orthographic camera projects 3D space as a 2D image
		const camera = new THREE.OrthographicCamera(
			window.innerWidth / -2,
			window.innerWidth / 2,
			window.innerHeight / 2,
			window.innerHeight / -2,
			-1000,
			1000
		);
		camera.position.z = 30;
		const renderer = new THREE.WebGLRenderer({ alpha: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(0x38373d, 1);
		document.body.appendChild(renderer.domElement);

		function onWindowResize() {
			const aspect = window.innerWidth / window.innerHeight;

			camera.left = (window.innerWidth * aspect) / -2;
			camera.right = (window.innerWidth * aspect) / 2;
			camera.top = window.innerWidth / 2;
			camera.bottom = window.innerWidth / -2;

			camera.updateProjectionMatrix();

			renderer.setSize(window.innerWidth, window.innerHeight);
		}

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
		const jamSpaceGeometry = new THREE.RingGeometry(10, 10, 32);
		const jamSpaceMaterial = new THREE.MeshBasicMaterial({
			color: 0x1be322,
			side: THREE.DoubleSide,
			wireframe: true,
			wireframeLinewidth: 2
		});
		const jamSpace = new THREE.LineLoop(jamSpaceGeometry, jamSpaceMaterial);
		jamSpace.scale.set(20, 20, 20);

		const hammerGeometry = new THREE.BoxGeometry(0.1, 10, 0.1);
		const hammerMaterial = new THREE.MeshBasicMaterial({
			color: 0x1be322,
			side: THREE.DoubleSide,
			wireframe: false
		});

		const hammer = new THREE.Mesh(hammerGeometry, hammerMaterial);
		hammer.position.y = 5;
		hammer.geometry.computeBoundingBox();
		let hammerBox = new THREE.Box3();
		hammerBox.setFromObject(hammer);

		//INSTRUMENTS
		//generates a randomized set of instruments (in this case, 6)
		//includes random coordinates outside of jamSpace, and random sound
		const instruments = [];
		for (let i = 0; i <= 6; i++) {
			instruments.push(new Instrument());
		}

		//SCENE
		const scene = new THREE.Scene();

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
		const mouse = new THREE.Vector2();
		const raycaster = new THREE.Raycaster();
		let drag = false;
		function onMouseMove(event) {
			mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
			mouse.y = (event.clientY / window.innerHeight) * 2 - 1;
		}

		let controls = new DragControls([...draggableObjects], camera, renderer.domElement);

		controls.addEventListener('drag', onDrag);
		function onDrag() {
			drag = true;
			render();
		}
		let sliderValue = 0.05;
		let slider = document.getElementById('slider');
		slider.addEventListener('input', onInput);
		function onInput() {
			sliderValue = Number(slider.value);
		}

		function addInstrument() {
			if (drag === false) {
				const newInstrument = new Instrument();
				instruments.push(newInstrument);
				scene.add(newInstrument.mesh);
				draggableObjects.push(newInstrument.mesh);
				controls = new DragControls([...draggableObjects], camera, renderer.domElement);
			}
			drag = false;
		}

		window.addEventListener('dblclick', addInstrument, false);
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('resize', onWindowResize);

		const sceneRef = db.collection('scenes');

		async function setScene() {
			return await sceneRef.doc('scenes').set({
				scene: scene.toJSON()
			});
		}

		// setScene();

		async function fetchScene() {
			const doc = await sceneRef.doc('scene').get();
			if (!doc.exists) {
				console.log('No such document!');
			} else {
				console.log('Document data:', doc.data());
			}
		}
		// fetchScene();

		//  async function setCities() {
		//   return await citiesRef.doc('SF').set({
		//     name: 'San Francisco',
		//     state: 'CA',
		//     country: 'USA',
		//     capital: false,
		//     population: 860000,
		//   });
		// }

		//render the scene
		function animate() {
			//requests a render for every frame (60/fps)
			requestAnimationFrame(animate);

			//raycaster set up
			raycaster.setFromCamera(mouse, camera);

			const intersects = raycaster.intersectObjects(scene.children);

			for (let i = 0; i < intersects.length; i++) {
				console.log(intersects);
			}

			//sets the collision trigger for the hammer
			hammerBox.copy(hammer.geometry.boundingBox).applyMatrix4(hammer.matrixWorld);
			hammerBox.setFromObject(hammer);

			jamSpace.rotation.z += sliderValue;
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

			setScene();
			render();
			fetchScene();
		}
		function render() {
			//RENDER
			renderer.render(scene, camera);
		}
		animate();
		// setScene();
	}, []);
	return (
		<div className='App' style={{ background: '#38373d', color: 'whitesmoke' }}>
			<Slider id='slider' />
			<button
				className='about'
				style={{
					color: 'whitesmoke',
					position: 'relative',
					background: 'transparent',
					border: 'transparent'
				}}
				onClick={() => setModalOpen(!modalOpen)}
			>
				about
			</button>
			<Modal className='Modal' isOpen={modalOpen}>
				<div className='modalTextDiv'>
					double click these shapes to adjust their sounds
					<br />
					single click to play a sound
					<br />
					jam with your friends or play by yourself <br />
					PLACEHOLDERS
				</div>
				<button className='closer' onClick={() => setModalOpen(!modalOpen)}>
					close
				</button>
			</Modal>
		</div>
	);
>>>>>>> db8bb6e6787369118eb92e5cf092da1011695b61
};

export default App;
