// Minimal UI sound effects, synthesized with the Web Audio API (no audio files).
// Every sound runs through a short generated reverb so interactions feel like
// they happen in a space rather than right next to the ear.

const STORAGE_KEY = 'sfx'
// A-minor pentatonic, so menu items played in any order stay consonant
const SCALE = [1, 6 / 5, 4 / 3, 3 / 2, 9 / 5, 2]

let ctx: AudioContext | null = null
let master: GainNode
let dry: GainNode
let wet: GainNode
let lastHover = 0

let enabled = (() => {
  try {
    return localStorage.getItem(STORAGE_KEY) !== 'off'
  } catch {
    return true
  }
})()
const listeners = new Set<() => void>()

function impulse(c: AudioContext, seconds: number, decay: number) {
  const length = Math.floor(c.sampleRate * seconds)
  const buffer = c.createBuffer(2, length, c.sampleRate)
  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch)
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay)
    }
  }
  return buffer
}

function audio() {
  if (ctx) return ctx
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Ctor) return null
  ctx = new Ctor()

  master = ctx.createGain()
  master.gain.value = 0.6
  const tone = ctx.createBiquadFilter()
  tone.type = 'lowpass'
  tone.frequency.value = 6000
  master.connect(tone).connect(ctx.destination)

  dry = ctx.createGain()
  dry.connect(master)
  const reverb = ctx.createConvolver()
  reverb.buffer = impulse(ctx, 1.6, 3)
  wet = ctx.createGain()
  wet.connect(reverb).connect(master)
  return ctx
}

// Browsers only allow audio after a user gesture; unlock on the first one
function unlock() {
  const c = audio()
  if (c?.state === 'suspended') void c.resume()
}
if (typeof window !== 'undefined') {
  window.addEventListener('pointerdown', unlock, { once: true, capture: true })
  window.addEventListener('keydown', unlock, { once: true, capture: true })
}

// The context only exists after a gesture; if it is still resuming, sounds
// scheduled now play as soon as it does
function ready() {
  if (!enabled || !ctx || ctx.state === 'closed') return null
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

function voice(
  c: AudioContext,
  { type, freq, endFreq, gain, attack, decay, send, delay = 0 }: {
    type: OscillatorType
    freq: number
    endFreq?: number
    gain: number
    attack: number
    decay: number
    send: number
    delay?: number
  },
) {
  const t = c.currentTime + delay
  const osc = c.createOscillator()
  const env = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t)
  if (endFreq) osc.frequency.exponentialRampToValueAtTime(endFreq, t + decay)
  env.gain.setValueAtTime(0.0001, t)
  env.gain.exponentialRampToValueAtTime(gain, t + attack)
  env.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay)
  const sendGain = c.createGain()
  sendGain.gain.value = send
  osc.connect(env)
  env.connect(dry)
  env.connect(sendGain).connect(wet)
  osc.start(t)
  osc.stop(t + attack + decay + 0.05)
}

function noise(c: AudioContext, { gain, decay, freq }: { gain: number; decay: number; freq: number }) {
  const t = c.currentTime
  const src = c.createBufferSource()
  src.buffer = impulse(c, decay, 1)
  const band = c.createBiquadFilter()
  band.type = 'bandpass'
  band.frequency.value = freq
  band.Q.value = 1.2
  const env = c.createGain()
  env.gain.value = gain
  src.connect(band).connect(env).connect(dry)
  src.start(t)
}

const note = (base: number, index: number) => base * SCALE[index % SCALE.length] * (index >= SCALE.length ? 2 : 1)

export const sfx = {
  /** Soft glassy tick; pitch follows the item's position */
  hover(index = 0) {
    const c = ready()
    if (!c) return
    const now = performance.now()
    if (now - lastHover < 45) return
    lastHover = now
    const f = note(1320, index)
    voice(c, { type: 'sine', freq: f, gain: 0.035, attack: 0.002, decay: 0.09, send: 0.5 })
    voice(c, { type: 'sine', freq: f * 2.01, gain: 0.008, attack: 0.002, decay: 0.05, send: 0.6 })
  },

  /** Muted "tock" with a pitched body and a short air transient */
  click(index = 0) {
    const c = ready()
    if (!c) return
    voice(c, { type: 'sine', freq: 180, endFreq: 70, gain: 0.16, attack: 0.002, decay: 0.12, send: 0.15 })
    voice(c, { type: 'triangle', freq: note(440, index), gain: 0.05, attack: 0.004, decay: 0.35, send: 0.9 })
    noise(c, { gain: 0.05, decay: 0.03, freq: 3200 })
  },

  /** Two-note glide: rising into light, falling into dark */
  toggle(up: boolean) {
    const c = ready()
    if (!c) return
    const [a, b] = up ? [523.25, 783.99] : [783.99, 523.25]
    voice(c, { type: 'sine', freq: a, gain: 0.05, attack: 0.004, decay: 0.18, send: 0.8 })
    voice(c, { type: 'sine', freq: b, gain: 0.05, attack: 0.004, decay: 0.3, send: 0.8, delay: 0.07 })
  },

  get enabled() {
    return enabled
  },

  setEnabled(value: boolean) {
    enabled = value
    try {
      localStorage.setItem(STORAGE_KEY, value ? 'on' : 'off')
    } catch {
      // storage unavailable; setting lasts for this visit
    }
    listeners.forEach((l) => l())
  },

  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
}
