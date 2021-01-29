import React, { useState, useEffect } from 'react';
import * as three from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
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
    console.log(camera);

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

    const planeGeometry = new three.PlaneGeometry(0.5, 10, 6);
    const planeMaterial = new three.MeshBasicMaterial({
      color: 0xffff00,
      side: three.DoubleSide,
    });
    const plane = new three.Mesh(planeGeometry, planeMaterial);
    plane.position.y = 5;

    const sphereGeometry = new three.SphereGeometry(2, 10, 30);
    const sphereMaterial = new three.MeshLambertMaterial({
      color: 0xffff00,
    });
    const sphere = new three.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.x = 5;

    //create a scene and add a cube
    const scene = new three.Scene();
    console.log(scene);
    scene.add(circle);
    scene.add(sphere);
    circle.add(plane);

    let draggableObjects = [];
    draggableObjects.push(sphere);

    // const group = new three.Group();
    // scene.add(group);

    //camera position z:  greater ints zoom out
    camera.position.z = 80;

    //MOUSE EVENTS

    //const raycaster = new three.Raycaster();
    //const mouse = new three.Vector2();

    const controls = new DragControls(
      [...draggableObjects],
      camera,
      renderer.domElement
    );
    controls.addEventListener('drag', render);

    //render the scene
    function animate() {
      //MDN window.requestAnimationFrame() -- basically tells browser we're gonna perform an animation 60 times a second
      //we recursively pass animate so the animation is never ending.

      requestAnimationFrame(animate);

      //raycaster basically sends a laser beam from your mouse straight forward through the scene
      //raycaster.setFromCamera(mouse, camera);

      //CIRCLE ROTATION
      circle.rotation.z += 0.01;

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
