import { useState } from 'react'
import { group } from 'd3-array'
import classnames from 'classnames'

export default function ChallengeList(props) {
  const { challenges, selectedChallengeId, setSelectedChallengeId} = props
  const groupedByTiers = Array.from(group(challenges, d => d.tier)).sort((a, b) => a[0] - b[0])

  const [viewChallenges, setViewChallenges] = useState(false)

  const toggleChallenges = () => {
    setViewChallenges(!viewChallenges)
  }

  return (
    <div className='m-1'>
      <div onClick={toggleChallenges} className={classnames('cursor-pointer', { bold: viewChallenges })}>
        View challenges
      </div>
      <div className={classnames({hidden: !viewChallenges})}>
        {groupedByTiers.map(([tier, tierValues]) => {
          return (
            <div key={tier}>
              <h3 className='font-bold'>Tier {tier}</h3>
              {tierValues.map((challenge, challengeIndex) => {
                return  <div onClick={() => setSelectedChallengeId(challenge.id)} key={challenge.id} className={classnames({ 'bg-green-800': challenge.id === selectedChallengeId })}>
                  {challenge.challenge}
                </div>
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}