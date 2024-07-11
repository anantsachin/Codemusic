Clock.bpm = 140

// Main synth
let synth = Synth('sawtooth', {gain: 0.4})
  .note.seq([0,4,7,11], 1/4)
  .fx.add(Delay(1/6), Reverb())

// Bass
let bass = Mono('square', {gain: 0.6})
  .note.seq([0,-7], 1/2)

// Drums
let kick = EDrums('x...x...x..x.x..')
let snare = EDrums('....x.......x...')
let hihat = EDrums('.x.x.x.x')

// Pad
let pad = Synth('sine', {gain: 0.3})
  .note.seq([0,2,4,7], 2)
  .triggerAttack()
  .fx.add(Reverb({roomSize: 0.9}))

// Arpeggiator
let arp = Synth('triangle', {gain: 0.3})
  .note.seq([0,4,7,12,16,12,7,4], 1/16)
  .fx.add(Delay(1/8))

// Start performance
Score.start()
