import { useEffect, useState } from 'react'
// import initChallenges from './initChallenges'
import { db } from './firebase'

import { group } from 'd3-array'
const pinclashEvent = 'avengers'
export default function Timer(props) {
  const { user } = props
  const [challenges, setChallenges] = useState([])
  useEffect(() => {
    const fetch = async () => {
      const challenges = await db.collection('challenges').doc(pinclashEvent).collection('challenges').get()
      const data = []
      challenges.forEach(d => {
        const c = d.data()
        c.id = d.id
        data.push(c)
      })
      console.log(data)
      setChallenges(data)

    }
    fetch()
    // initChallenges()
  }, [])

  const groupedByTiers = Array.from(group(challenges, d => d.tier)).sort((a, b) => a[0] - b[0])
  return (
    <div>
      {groupedByTiers.map(([tier, tierValues]) => {
        return (
          <div key={tier}>
            <h3>Tier {tier}</h3>
            {tierValues.map(challenge => {
              return  <div key={challenge.id}>
                {challenge.challenge}
              </div>
            })}
          </div>
        )
      })}
    </div>
  )
}