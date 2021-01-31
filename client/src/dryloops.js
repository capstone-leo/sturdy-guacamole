import * as three from 'three';
let scene;
let draggableObjects;

function generateBoxes() {
  const boxGeometry = new three.BoxGeometry(20, 20, 20);
  const boxNames = []
  const boxBoundaryNames = []
  const boxColorArr = [
    0xff7700,
    0xe525fa,
    0x00eaff,
    0xffe100,
    0xff0000,
    0x6200ff,
  ];

  const boxSetXArr = [-300, 300];

  const boxSetYArr = [150, -150, 0];

  for (let i = 0; i < 7; i++) {
      boxNames.push(eval(`let box${i} = new three.Mesh${(
        boxGeometry,
        new three.MeshBasicMaterial({ color: boxColorArr[i], wireframe: true })
      )}`
    ))
//   boxNames[i] = new three.Mesh(
    //   boxGeometry,
    //   new three.MeshBasicMaterial({ color: boxColorArr[i], wireframe: true })
    boxNames[i].position.x = i < 3 ? boxSetXArr[0] : boxSetXArr[1];

    boxNames[i].position.y =
      i < 2 ? boxSetYArr[0] : i < 4 && i > 1 ? boxSetYArr[1] : boxSetYArr[2];

    boxNames[i].geometry.computeBoundingBox();

    for (let i = 0; i < 7; i++) {
        boxBoundaryNames.push(eval(`let box${i} = new three.Box3().setFromObject(${boxNames[i]})`))
        boxBoundaryNames[i].copy(box.geometry.boundingBox).applyMatrix4(box.matrixWorld)
      
    const boxBoundary = new three.Box3().setFromObject(boxNames[i]);
    boxBoundary.copy(box.geometry.boundingBox).applyMatrix4(box.matrixWorld);
    scene.add(box, boxBoundary);

    draggableObjects.push(box);
  }
}
