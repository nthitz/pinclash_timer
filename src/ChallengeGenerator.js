import { useEffect, useRef, useState } from "react"
import TWEEN from '@tweenjs/tween.js'
import soundEffect from './media/challengeGenerator.mp3'
import { shuffle } from 'd3-array'
import classNames from "classnames"
const emojis = {
  1: '1️⃣',
  2: '2️⃣',
  3: '3️⃣',
  4: '4️⃣',
  5: '5️⃣',
  6: '6️⃣',
  7: '7️⃣',
  8: '8️⃣',
  9: '9️⃣',
}
export default function ChallengeGenerator(props) {
  const { challenges, setSelectedChallengeId } = props

  const [generatorChallengeIndex, setGeneratorChallengeIndex] = useState(null)
  const soundEffectRef = useRef(null)


  const [shuffledChallengesToConsider, setShuffledChallengesToConsider] = useState([])

  const [selectedTiers, setSelectedTiers] = useState([])
  const [availableTiers, setAvailableTiers] = useState([])

  const [spinning, setSpinning] = useState(false)

  useEffect(() => {
    const tiers = Object.keys(
      challenges.reduce(
        (accumulator, challenge) => ({ ...accumulator, [challenge.tier]: true }),
        {}
      )
    )
    .map(d => +d)
    .sort((a, b) => a - b)

    setSelectedTiers(tiers)
    setAvailableTiers(tiers)
  }, [challenges])

  const spin = () => {

    const challengesToConsider = challenges.filter(challenge => selectedTiers.includes(challenge.tier))
    if (challengesToConsider.length === 0) {
      return
    }
    const shuffledChallenges = shuffle([...challengesToConsider])
    setGeneratorChallengeIndex(0)
    setShuffledChallengesToConsider(shuffledChallenges)
    setSpinning(true)
    const random = Math.floor((Math.random() * 4 + 8) * shuffledChallenges.length)
    new TWEEN.Tween({ index: 0 }).to({index: random}, 7.5 * 1000)
      .easing(TWEEN.Easing.Quintic.InOut)
      .onUpdate(({index}) => setGeneratorChallengeIndex(Math.round(index) % shuffledChallenges.length))
      .onComplete(() => {
        setSelectedChallengeId(shuffledChallenges[random % shuffledChallenges.length].id)
        setSpinning(false)
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

  const toggleTier = tier => event => {
    setSelectedTiers(tiers => {
      const found = tiers.indexOf(tier)
      const newTiers = [...tiers]
      if (found === -1) {
        newTiers.push(tier)
      } else {
        newTiers.splice(found, 1)
      }
      return newTiers
    })
  }

  return (
    <div>
      <div>
        Next up
      </div>
      <div>
        Tiers:{' '}
        {availableTiers.map(tier =>
          <span
            key={tier}
            className={classNames('cursor-pointer p-1', {'opacity-40': !selectedTiers.includes(tier)})}
            onClick={toggleTier(tier)}
          >
            {emojis[tier]}
          </span>
        )}
      </div>

      {selectedChallengeInfo}
      <button onClick={spin} disabled={spinning}>spin</button>
      <audio src={soundEffect} ref={soundEffectRef}/>

    </div>
  )
}