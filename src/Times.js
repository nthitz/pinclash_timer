import { useEffect, useState } from "react"
import { db } from './firebase'
import { pinclashEvent } from './PinclashTimer'
import { format, addMilliseconds } from 'date-fns'
import { TrashIcon } from '@heroicons/react/solid'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

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
        setTimes(times)
      })
  }, [challenge.id, user.uid])
  const sorted = [...times]
  sorted.sort(cols[selectedSortColumnIndex].sort)

  const trash = (time) => async () => {
    const deleteConfirmed = async () => {
      try {
        await db.collection('userData').doc(user.uid).collection('times').doc(`${pinclashEvent}-${challenge.id}`).collection('times').doc(time.id).delete()
      } catch (error) {
        console.log(error)
      }
    }
    confirmAlert({
      title: 'Are you sure you want to delete that time?',
      // message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Delete',
          onClick: deleteConfirmed
        },
        {
          label: 'Keep',
          onClick: () => {}
        }
      ]
    });
  }
  return (
    <div>
      {sorted.length ?
        <table className='w-full'>
          <thead>
            <tr>
              {cols.map((col, colIndex) =>
                <th className='cursor-pointer' key={col.label} onClick={() => setSelectedSortColumnIndex(colIndex)}>
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
                <td>
                  <TrashIcon onClick={trash(time)} className="cursor-pointer h-5 w-5 text-black-500 hover:text-red-500"/>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        : 'No times yet'
      }
    </div>
  )
}