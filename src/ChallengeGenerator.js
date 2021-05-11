import { useEffect, useRef, useState } from "react"
import TWEEN from '@tweenjs/tween.js'
import soundEffect from './media/challengeGenerator.mp3'
import { shuffle } from 'd3-array'
import classNames from "classnames"
import { RefreshIcon } from '@heroicons/react/solid'

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

  const [idsPicked, setIdsPicked] = useState([])
  const [respin, setRespin] = useState(false)
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
  const challengesAtSelectedTiers = challenges.filter(challenge => selectedTiers.includes(challenge.tier))
  const challengesToConsider = challengesAtSelectedTiers.filter(challenge => !idsPicked.includes(challenge.id))
  const spin = () => {

    if (challengesAtSelectedTiers.length === 0) {
      return
    }
    if (challengesToConsider.length === 0) {
      if (!respin) {
        setIdsPicked(ids => [...ids].filter(challengeId => !challengesAtSelectedTiers.find(d => d.id === challengeId)))
        setRespin(true)
      }
      return
    }
    const shuffledChallenges = shuffle([...challengesToConsider])
    setGeneratorChallengeIndex(0)
    setShuffledChallengesToConsider(shuffledChallenges)
    setSpinning(true)
    const random = Math.floor((Math.random() * 4 + 8) * shuffledChallenges.length)
    const oneLeft = shuffledChallenges.length === 1
    const duration = oneLeft ? 1 : 7.5 * 1000
    const delay = oneLeft ? 1 : 2000

    new TWEEN.Tween({ index: 0 }).to({index: random}, duration)
      .easing(TWEEN.Easing.Quintic.InOut)
      .onUpdate(({index}) => setGeneratorChallengeIndex(Math.round(index) % shuffledChallenges.length))
      .onComplete(() => {
        const id = shuffledChallenges[random % shuffledChallenges.length].id
        setSelectedChallengeId(id)
        setSpinning(false)
        setGeneratorChallengeIndex(null)
        setIdsPicked(ids => [...ids, id])
      })
      .delay(delay)
      .start()
    if (soundEffectRef.current && !oneLeft) {
      soundEffectRef.current.play()
    }

  }
  if (respin) {
    setRespin(false)
    spin()
  }
  let selectedChallengeInfo = <div>&nbsp;</div>
  if (generatorChallengeIndex !== null) {
    const selectedChallenge = shuffledChallengesToConsider[generatorChallengeIndex]
    const { tier, challenge } = selectedChallenge
    selectedChallengeInfo = (
      <div className='m-2'>
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

  const resetPicked = () => {
    setIdsPicked([])
  }

  return (
    <div className='flex-auto m-2'>
      <div className='m-2'>
        Challenge Generator
      </div>
      <div className='m-2'>
        Tiers:{' '}
        {availableTiers.map(tier => {
          const selected = selectedTiers.includes(tier)
          return <span
              key={tier}
              className={classNames('cursor-pointer p-2 m-1 rounded-md', {'bg-green-200': selected, 'opacity-40': !selected })}
              onClick={toggleTier(tier)}
            >
              {emojis[tier]}
            </span>
        })}
      </div>

      {selectedChallengeInfo}
      <button onClick={spin} disabled={spinning}>spin</button>
      <div>
        Remaining: {challengesToConsider.length}
        <RefreshIcon onClick={resetPicked} className="inline-block cursor-pointer h-5 w-5 text-black-500 hover:text-red-500"/>
      </div>
      <audio src={soundEffect} ref={soundEffectRef}/>

    </div>
  )
}