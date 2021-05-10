import { group } from 'd3-array'
import classnames from 'classnames'

export default function ChallengeList(props) {
  const { challenges, selectedChallengeId, setSelectedChallengeId} = props
  const groupedByTiers = Array.from(group(challenges, d => d.tier)).sort((a, b) => a[0] - b[0])

  return (
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
  )
}