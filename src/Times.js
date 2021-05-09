import { useEffect, useState } from "react"
import { db } from './firebase'
import { pinclashEvent } from './PinclashTimer'
import { format, addMilliseconds } from 'date-fns'
export default function Times(props) {
  const { challenge, user } = props
  const [times, setTimes] = useState([])
  useEffect(() => {
    db.collection('userData').doc(user.uid).collection('times').doc(`${pinclashEvent}-${challenge.id}`).collection('times')
      .onSnapshot(qs => {
        var times = []
        qs.forEach(doc => {
          console.log(doc)
          times.push({
            ...doc.data(),
            id: doc.id,
          })
        })
        console.log(times)
        setTimes(times)
      })
  }, [challenge.id, user.uid])

  return (
    <div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {times.map(time =>
            <tr key={time.id}>
              <td>
                {format(time.timestamp, 'Pp')}
              </td>
              <td>
                {format(addMilliseconds(new Date(0), time.time), 'mm:ss.S')}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}