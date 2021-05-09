
import { useEffect, useState } from 'react'

export default function Timer(props) {
  const { user, challenge } = props

  const [running, setRunning] = useState(false)

  const now = Date.now()
  // const [startTime, setStartTime] = useState(now)
  // const [currentTime, setCurrentTime] = useState(now)
  // const [timeAlreadyOnTheClock, setTimeAlreadyOnTheClock] = useState(0)

  const [lastTime, setLastTime] = useState(now)
  const [elapsedTime, setElapsedTime] = useState(0)
  useEffect(() => {
    let raf = null
    const update = () => {
      raf = requestAnimationFrame(update)
      const now = Date.now()
      if (running) {
        setElapsedTime(t => t + (now - lastTime))
      }
      setLastTime(now)

    }
    update()
    return () => {
      cancelAnimationFrame(raf)
    }
  }, [running, lastTime])

  const toggle = () => {
    const newRunningState = !running
    // const now = Date.now()
    // if (newRunningState) {
    //   setStartTime(now)
    // } else {
    //   setTimeAlreadyOnTheClock(c => c + (now - startTime))
    // }
    setRunning(newRunningState)

  }

  const reset = () => {
    setElapsedTime(0)
  }

  const submit = () => {

  }
  const delta = elapsedTime / 1000
  const ms = delta - Math.floor(delta)
  let s = delta - ms
  const m = Math.floor(s / 60)
  s -= m * 60


  return (
    <div>
      <button onClick={toggle}>{running ? 'stop' : 'start'}</button>{' '}
      <button onClick={reset}>reset</button>
      <button disabled={running} onClick={submit}>reset</button>

      <div>
        {delta}<br />
        {m ? `${m}:` : ''}{`${`${s}`.padStart(m ? 2 : 1, '0')}`}.{Math.floor(ms * 10)}
      </div>
    </div>
  )
}