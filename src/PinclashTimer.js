import { useEffect, useState } from 'react'
// import initChallenges from './initChallenges'
import { db } from './firebase'

import { group } from 'd3-array'
import classnames from 'classnames'
import Challenge from './Challenge'
export const pinclashEvent = 'avengers'
export default function PinclashTimer(props) {
  const { user } = props
  console.log(user)
  const [challenges, setChallenges] = useState([])
  const [selectedChallengeId, setSelectedChallengeId] = useState(null)
  useEffect(() => {
    const fetch = async () => {
      const challenges = await db.collection('challenges').doc(pinclashEvent).collection('challenges').get()
      const data = []
      challenges.forEach(d => {
        const c = d.data()
        c.id = d.id
        data.push(c)
      })
      data.sort((a, b) => {
        return a.tier - b.tier
      })
      console.log(data)
      setChallenges(data)
      setSelectedChallengeId(data[0].id)

    }
    fetch()
    // initChallenges()
  }, [])

  const groupedByTiers = Array.from(group(challenges, d => d.tier)).sort((a, b) => a[0] - b[0])
  return (
    <div className='flex'>
      <div className='flex-1'>
        {groupedByTiers.map(([tier, tierValues]) => {
          return (
            <div key={tier}>
              <h3>Tier {tier}</h3>
              {tierValues.map((challenge, challengeIndex) => {
                return  <div onClick={() => setSelectedChallengeId(challenge.id)} key={challenge.id} className={classnames({ 'bg-green-200': challenge.id === selectedChallengeId })}>
                  {challenge.challenge}
                </div>
              })}
            </div>
          )
        })}
      </div>
      <div className='flex-1'>
        {selectedChallengeId !== null ?
          <Challenge user={user} key={selectedChallengeId} challenge={challenges.find(d => d.id === selectedChallengeId)} />
          : null
        }
      </div>
    </div>
  )
}