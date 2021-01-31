import * as three from 'three';

class JamSpace {
  constructor() {
    this.geometry = new three.RingGeometry(10, 10, 32);
    this.material = new three.MeshBasicMaterial({
      color: 0x1be322,
      side: three.DoubleSide,
      wireframe: true,
      wireframeLinewidth: 2,
    });
    this.mesh = new three.LineLoop(this.geometry, this.material);
  }
}

export default JamSpace;
