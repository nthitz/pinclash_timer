import { useEffect, useState } from 'react'
// import initChallenges from './initChallenges'
import { db } from './firebase'

import Challenge from './Challenge'
import ChallengeGenerator from './ChallengeGenerator'
import ChallengeList from './ChallengeList'

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

  return (
    <div>
      <ChallengeGenerator setSelectedChallengeId={setSelectedChallengeId} challenges={challenges} />
      {selectedChallengeId !== null ?
        <Challenge user={user} key={selectedChallengeId} challenge={challenges.find(d => d.id === selectedChallengeId)} />
        : null
      }
      <ChallengeList challenges={challenges} selectedChallengeId={selectedChallengeId} setSelectedChallengeId={setSelectedChallengeId} />

    </div>
  )
}