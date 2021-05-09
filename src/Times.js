import { useEffect, useState } from "react"
import { db } from './firebase'
import { pinclashEvent } from './PinclashTimer'
import { format, addMilliseconds } from 'date-fns'

const cols = [
  { label: 'Time', field: 'timestamp', sort: (a, b) => b.timestamp - a.timestamp, format: v => format(v, 'Pp') },
  { label: 'Date', field: 'time', sort: (a, b) => a.time - b.time, format: v => format(addMilliseconds(new Date(0), v), 'mm:ss.S') },
]
export default function Times(props) {
  const { challenge, user } = props
  const [times, setTimes] = useState([])
  const [selectedSortColumnIndex, setSelectedSortColumnIndex] = useState(1)
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
  const sorted = [...times]
  sorted.sort(cols[selectedSortColumnIndex].sort)

  return (
    <div>

      <table>
        <thead>
          <tr>
            {cols.map((col, colIndex) =>
              <th key={col.label} onClick={() => setSelectedSortColumnIndex(colIndex)}>
                {col.label} {colIndex === selectedSortColumnIndex ? '^' : ''}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {sorted.map(time =>
            <tr key={time.id}>
              {
                cols.map(col => <td key={col.label}>{col.format(time[col.field])}</td>)
              }
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}