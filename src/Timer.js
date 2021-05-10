
import { useEffect, useState } from 'react'
import { db } from './firebase'
import { pinclashEvent } from './PinclashTimer'
import TWEEN from '@tweenjs/tween.js'

export default function Timer(props) {
  const { user, challenge } = props

  const [running, setRunning] = useState(false)

  const now = Date.now()

  const [lastTime, setLastTime] = useState(now)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  useEffect(() => {
    let raf = null
    const update = () => {
      raf = requestAnimationFrame(update)
      TWEEN.update()
      const now = Date.now()
      if (running) {
        setElapsedTime(t => t + (now - lastTime))
      }
      setLastTime(now)

    }
    raf = requestAnimationFrame(update)
    return function cleanup() {
      cancelAnimationFrame(raf)
    }
  }, [running, lastTime])

  const toggle = () => {
    setRunning(!running)
    setSubmitted(false)
  }

  const reset = () => {
    setElapsedTime(0)
  }

  const submit = async () => {
    setSubmitted(true)
    try {
      await db.collection('userData').doc(user.uid).collection('times').doc(`${pinclashEvent}-${challenge.id}`).collection('times').add({
        timestamp: Date.now(),
        time: elapsedTime
      })
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  const delta = elapsedTime / 1000
  const ms = delta - Math.floor(delta)
  let s = delta - ms
  const m = Math.floor(s / 60)
  s -= m * 60


  return (
    <div className='m-1'>
      <button onClick={toggle}>{running ? 'stop' : 'start'}</button>{' '}
      <button onClick={reset}>reset</button>{' '}
      <button disabled={running || submitted || elapsedTime === 0} onClick={submit}>submit</button>

      <div className='font-bold m-1 text-4xl'>
        {m ? `${m}:` : ''}{`${`${s}`.padStart(m ? 2 : 1, '0')}`}.{Math.floor(ms * 10)}
      </div>
    </div>
  )
}