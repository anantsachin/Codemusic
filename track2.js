Clock.bpm = 135

// Main synth
let synth = Synth('square', {gain: 0.4})
  .note.seq([0,4,7,11], 1/4)
  .fx.add(Delay(1/6), Reverb())

// Bass
let bass = Mono('sawtooth', {gain: 0.6})
  .note.seq([0,-7,-5,-3], 1/2)

// Drums
let kick = EDrums('x...x...x..x.x..')
let snare = EDrums('....x.......x...')
let hihat = EDrums('.x.x.x.x.x.x.x.x')

// Pad
let pad = Synth('sine', {gain: 0.3})
  .note.seq([0,2,4,7], 2)
  .triggerAttack()
  .fx.add(Reverb({roomSize: 0.9}))

// Arpeggiator
let arp = Synth('triangle', {gain: 0.3})
  .note.seq([0,4,7,12,16,12,7,4], 1/16)
  .fx.add(Delay(1/8))

// Glitch effect
let glitch = Gibberish.Sampler().connect()
glitch.dec = .1

// Live control functions
window.changeArp = () => {
  arp.note.seq([0,4,7,12,16,19,24,28].rnd(), 1/16)
}

window.addDistortion = () => {
  synth.fx.add(Distortion({pregain: 5, postgain: 0.5}))
}

window.glitchEffect = () => {
  glitch.note(rndi(60,80))
}

// Time-based changes
Score.set([
  [0, () => {
    synth.start()
    bass.start()
    kick.start()
  }],
  [8, () => {
    hihat.start()
    pad.start()
  }],
  [16, () => {
    arp.start()
    snare.start()
    synth.note.seq([0,4,7,11,12,7,4,0], 1/8)
  }],
  [24, () => {
    bass.note.seq([0,-7,-5,-3,2,-10], [1/2,1/4,1/4])
    kick.amp = .8
    snare.amp = .7
  }],
  [32, () => {
    synth.note.seq([0,4,7,11,12,16,7,4], 1/8)
    arp.note.seq([0,4,7,12,16,12,7,4].rnd(), 1/32)
  }],
  [40, () => {
    pad.note.seq([0,2,4,7,11,12], 1)
    hihat.euclid(13,16)
  }],
  [48, () => {
    synth.fx.add(Chorus(), Flanger())
    bass.note.seq([0,-12,-7,-5,2,-10,4,-7], 1/4)
  }],
  [56, () => {
    arp.note.seq([0,4,7,12,16,19,24,28].rnd(), 1/16)
    kick.euclid(5,8)
  }],
  [64, () => {
    synth.note.seq([0,4,7,11,12,16,19,24], 1/16)
    pad.note.seq([0,4,7,11,14,18], 1/2)
  }],
  [72, () => {
    bass.note.seq([-12,-10,-7,-5,0,2,4,7], 1/8)
    snare.euclid(3,8)
  }],
  [80, () => {
    synth.stop()
    arp.stop()
    hihat.stop()
  }],
  [84, () => {
    bass.stop()
    snare.stop()
  }],
  [88, () => {
    kick.stop()
    pad.stop()
  }]
])

Score.start()
