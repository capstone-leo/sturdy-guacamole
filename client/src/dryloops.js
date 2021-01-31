import * as three from 'three';
// let draggableObjects = []
// const scene = new three.Scene();

export function generateBoxes() {
  let box1, box2, box3, box4, box5, box6, 
  box1Boundary, box2Boundary, box3Boundary, box4Boundary, box5Boundary, box6Boundary
  const boxGeometry = new three.BoxGeometry(20, 20, 20);
  let boxNames = [box1, box2, box3, box4, box5, box6]
  let boxBoundaryNames = [box1Boundary, box2Boundary, box3Boundary, box4Boundary, box5Boundary, box6Boundary]
  const boxColorArr = [
    0xff7700,
    0xe525fa,
    0x00eaff,
    0xffe100,
    0xff0000,
    0x6200ff,
  ];

  const boxSetXArr = [-300, 300];
  const boxSetYArr = [0, 150, -150, 0, 150, -150];

  for (let i = 0; i < 6; i++) {
       boxNames[i] = new three.Mesh(
        boxGeometry,
        new three.MeshBasicMaterial({ color: boxColorArr[i], wireframe: true })) 
      boxNames[i].position.x = i < 3 ? boxSetXArr[0] : boxSetXArr[1];
      boxNames[i].position.y = boxSetYArr[i]
      boxNames[i].geometry.computeBoundingBox();
      }

    for (let j = 0; j < 6; j++) {
        boxBoundaryNames[j] = new three.Box3().setFromObject(boxNames[j])
        boxBoundaryNames[j].copy(boxNames[j].geometry.boundingBox).applyMatrix4(boxNames[j].matrixWorld);
    }
    return [boxNames, boxBoundaryNames]
}
