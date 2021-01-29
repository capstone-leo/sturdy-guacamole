import React, { useState, useEffect } from 'react';
import * as three from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import * as Tone from 'tone';

const App = () => {
  useEffect(() => {
    //instantiate a CAMERA and a RENDERER
    let INTERSECTED;
    let mouseDown;
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
    scene.add(circle);
    scene.add(sphere);
    circle.add(plane);
    let objects = [];
    objects.push(sphere);

    const group = new three.Group();
    scene.add(group);

    //camera position z:  greater ints zoom out
    camera.position.z = 20;

    //MOUSE EVENTS

    const raycaster = new three.Raycaster();
    const mouse = new three.Vector2();
    const controls = new DragControls(
      [...objects],
      camera,
      renderer.domElement
    );
    controls.addEventListener('drag', render);

    // function onMouseMove(event) {
    //   event.preventDefault();
    //   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    //   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    //   //If the raycaster beam touches anything, it is registered as an intersection by .intersectObjects
    //   const intersects = raycaster.intersectObjects(scene.children);
    //   //checks if there are any intersections
    //   if (intersects.length > 0) {
    //     //checks if it's not already chosen, otherwise this would fire every frame
    //     if (INTERSECTED !== intersects[0].object) {
    //       if (INTERSECTED) {
    //         //not really sure what this if statement does, works without it, probably weird edge case
    //         //maybe if it loads as an intersection already?
    //         INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
    //       }
    //       //this picks up the latest intersected object, grabs its current color
    //       //then setsHex to a "selected" hex value
    //       INTERSECTED = intersects[0].object;
    //       INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
    //       INTERSECTED.material.emissive.setHex(0xff0000);
    //       if (mouseDown) {
    //         const deltaX = event.clientX - mouse.x;
    //         const deltaY = event.clientY - mouse.y;
    //         dragAction(deltaX, deltaY, INTERSECTED);
    //       }
    //     }
    //   } else {
    //     if (INTERSECTED)
    //       INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

    //     INTERSECTED = null;
    //   }
    // }

    function getMousePosition(event) {
      mouse.x = (event.client / window.innerWidth) * 2 - 1;
      mouse.y = -(event.client / window.innerHeight) * 2 - 1;
    }

    function onClick(event) {
      event.preventDefault();
      let enableSelection;
      // if (enableSelection === true) {
      //   const draggableObjects = controls.getObjects();
      //   draggableObjects.length = 0;

      //   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      //   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      //   raycaster.setFromCamera(mouse, camera);

      //   const intersections = raycaster.intersectObjects(objects, true);

      //   if (intersections.length > 0) {
      //     const object = intersections[0].object;

      //     if (group.children.includes(object) === true) {
      //       object.material.emissive.set(0x000000);
      //       scene.attach(object);
      //     } else {
      //       object.material.emissive.set(0xaaaaaa);
      //       group.attach(object);
      //     }

      //     controls.transformGroup = true;
      //     draggableObjects.push(group);
      //   }

      //   if (group.children.length === 0) {
      //     controls.transformGroup = false;
      //     draggableObjects.push(...objects);
      //   }
      // }

      render();
    }

    //render the scene
    function animate() {
      requestAnimationFrame(animate);

      //raycaster sends a literal BEAM from your mouse straight forward through the scene
      raycaster.setFromCamera(mouse, camera);

      //CIRCLE ROTATION
      circle.rotation.z += 0.01;
      render();
    }

    function render() {
      //RENDER
      renderer.render(scene, camera);
    }
    //document.addEventListener('click', onClick);

    animate();
  }, []);
  return <div className="App"></div>;
};

export default App;
