
import { useEffect, useState } from 'react'
import { db } from './firebase'
import { pinclashEvent } from './PinclashTimer'
import TWEEN from '@tweenjs/tween.js'

function now() {
  return window.performance && window.performance.now ? window.performance.now() : Date.now()
}

export default function Timer(props) {
  const { user, challenge } = props

  const [running, setRunning] = useState(false)

  const [lastTime, setLastTime] = useState(now())
  const [elapsedTime, setElapsedTime] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setRunning(false)
    setSubmitted(false)
    setElapsedTime(0)

  }, [challenge])


  useEffect(() => {
    let rafId = null
    const update = () => {
      rafId = window.requestAnimationFrame(update)
      TWEEN.update()
      const time = now()

      const delta = time - lastTime
      if (running) {
        setElapsedTime(t => t + delta)
      }
      setLastTime(now)
    }
    rafId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId)
  }, [lastTime, running])

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