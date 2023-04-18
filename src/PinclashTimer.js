import { useEffect, useState } from 'react'
import initChallenges from './initChallenges'
import { db } from './firebase'

import Challenge from './Challenge'
import ChallengeGenerator from './ChallengeGenerator'
import ChallengeList from './ChallengeList'
import classNames from 'classnames'
import { CogIcon } from '@heroicons/react/solid'
export const pinclashEvent = 'godzilla'
export default function PinclashTimer(props) {
  const { user, logout } = props
  console.log(user)
  const [challenges, setChallenges] = useState([])
  const [selectedChallengeId, setSelectedChallengeId] = useState(null)
  const [configVisible, setConfigVisible] = useState(false)
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
      setChallenges(data)
      setSelectedChallengeId(data[0].id)

    }
    fetch()
    // initChallenges() // you likely need to adjust firebase firestore usage permissions to allow this
  }, [])

  const toggleConfig = () => {
    setConfigVisible(v => !v)
  }
  return (
    <div className='text-lg text-center mx-auto container'>
      <CogIcon onClick={toggleConfig} className="fixed cursor-pointer h-10 w-10 inset-1 text-black-500 hover:text-blue-500 z-40" />
      <ChallengeGenerator setSelectedChallengeId={setSelectedChallengeId} challenges={challenges} />
      {selectedChallengeId !== null ?
        <Challenge user={user} challenge={challenges.find(d => d.id === selectedChallengeId)} />
        : null
      }

      <div className={classNames('w-full h-full absolute top-0 left-0 bg-black', { hidden: !configVisible })} >
        <button onClick={logout}>log out</button>

        <ChallengeList challenges={challenges} selectedChallengeId={selectedChallengeId} setSelectedChallengeId={setSelectedChallengeId} />
      </div>
    </div>
  )
}
