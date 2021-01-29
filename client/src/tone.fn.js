//functions for/selection of tones
import * as Tone from "tone";

export function playC4() {
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease("C4", "4n");
}
export function playD4() {
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease("D4", "4n");
}
export function playE4() {
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease("E4", "4n");
}
export function playF4() {
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease("F4", "4n");
}
export function playG4() {
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease("G4", "4n");
}
export function playA4() {
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease("A4", "4n");
}
export function playB4() {
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease("B4", "4n");
}
export function playC5() {
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease("C5", "4n");
}

export function playFilterSynth() {
  const filter = new Tone.Filter().toDestination();
  // set values using an object
  filter.set({
    frequency: "C6",
    type: "highpass",
  });
  const player = new Tone.Player(
    "https://tonejs.github.io/audio/berklee/Analogsynth_octaves_highmid.mp3"
  ).connect(filter);
  player.autostart = true;
}

export function playStopOscillator() {
  const source = new Tone.Oscillator().toDestination();
  source.start();
  source.stop("+3.5"); // stops the source 3.5 seconds from now
}

//same thing as above but you specify the note
export function playDurationOscillator() {
  const source = new Tone.Oscillator("C2").toDestination();
  source.start();
  source.stop("+6"); // IF this is not included the tone renders infinitely
}

export function playChord() {
  const synth = new Tone.PolySynth().toDestination();
  synth.triggerAttackRelease(["C3", "C4", "D4", "E4", "B4"], 3);
}

export function playDetunedChord() {
  const synth = new Tone.PolySynth().toDestination();
  // set the attributes across all the voices using 'set'
  synth.set({ detune: -1200 });
  // play a chord
  synth.triggerAttackRelease(["C3", "C4", "D4", "E4", "B4"], 3);
}
