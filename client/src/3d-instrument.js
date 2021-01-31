import * as three from 'three';
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

const soundList = [
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
];

class Instrument {
  constructor() {
    this.geometry = new three.BoxGeometry(20, 20, 20);
    this.material = new three.MeshBasicMaterial({
      wireframe: true,
      color: parseInt(
        '0x' + Math.floor(Math.random() * 16777215).toString(16),
        16
      ),
      wireframeLinewidth: 2,
    });
    this.mesh = new three.Mesh(this.geometry, this.material);
    this.mesh.position.setX(-300);
    this.boundary = new three.Box3().setFromObject(this.mesh);
    this.boundaryHelper = new three.BoxHelper(this.mesh, 0xff0000);
    this.boundaryHelper.object = this.mesh;
    this.sound = soundList[Math.floor(Math.random() * soundList.length)];
    this.alreadyPlayed = false;
  }
  playSound = () => {
    const sound = this.sound;
    sound();
  };
}

export default Instrument;
