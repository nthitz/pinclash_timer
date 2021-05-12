// import { useEffect, useState } from "react"
// import { db } from './firebase'
// import { pinclashEvent } from './PinclashTimer'

import Notes from './Notes'
import Timer from './Timer'
import Times from './Times'
export default function Challenge(props) {
  const { challenge } = props
  return (
    <div>
      <div className='truncate'>
        Tier {challenge.tier}: {challenge.challenge}
      </div>
      <Notes {...props} />
      <Timer {...props} />
      <Times {...props} />
    </div>
  )
}
