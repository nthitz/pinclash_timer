// import { useEffect, useState } from "react"
// import { db } from './firebase'
// import { pinclashEvent } from './PinclashTimer'

import Notes from './Notes'
export default function Challenge(props) {
  const { challenge } = props
  return (
    <div>
      <div>
        {challenge.challenge}
      </div>
      <Notes {...props} />
    </div>
  )
}
