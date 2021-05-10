import { useEffect, useRef, useState } from "react"
import TWEEN from '@tweenjs/tween.js'
import soundEffect from './media/challengeGenerator.mp3'
import { shuffle } from 'd3-array'
export default function ChallengeGenerator(props) {
  const { challenges, setSelectedChallengeId } = props

  const [generatorChallengeIndex, setGeneratorChallengeIndex] = useState(null)
  const soundEffectRef = useRef(null)

  const challengesToConsider = challenges.filter(d => true)

  const [shuffledChallengesToConsider, setShuffledChallengesToConsider] = useState([])

  const spin = () => {
    const shuffledChallenges = shuffle([...challengesToConsider])
    setShuffledChallengesToConsider(shuffledChallenges)

    const random = Math.floor((Math.random() * 4 + 8) * shuffledChallenges.length)
    new TWEEN.Tween({ index: 0 }).to({index: random}, 7.5 * 1000)
      .easing(TWEEN.Easing.Quintic.InOut)
      .onUpdate(({index}) => setGeneratorChallengeIndex(Math.round(index) % shuffledChallenges.length))
      .onComplete(() => {
        setSelectedChallengeId(shuffledChallenges[random % shuffledChallenges.length].id)
      })
      .delay(2000)
      .start()
    if (soundEffectRef.current) {
      soundEffectRef.current.play()
    }

  }
  let selectedChallengeInfo = <div>get 'er spinning</div>
  if (generatorChallengeIndex !== null) {
    const selectedChallenge = shuffledChallengesToConsider[generatorChallengeIndex]
    const { tier, challenge } = selectedChallenge
    selectedChallengeInfo = (
      <div>
        Tier {tier}: {challenge}
      </div>
    )
  }
  return (
    <div>
      <div>
        Next up
      </div>
      {selectedChallengeInfo}
      <button onClick={spin}>spin</button>
      <audio src={soundEffect} ref={soundEffectRef}/>

    </div>
  )
}