import { useEffect, useState } from "react"
import { db } from './firebase'
import { pinclashEvent } from './PinclashTimer'
export default function Challenge(props) {
  const { challenge, user } = props
  const [notes, setLocalNotes] = useState('')
  useEffect(() => {
    const fetch = async () => {
      const data = await db.collection('userData').doc(user.uid).collection('notes').doc(`${pinclashEvent}-${challenge.id}`).get()
      const response = data.data()
      setLocalNotes(response && response.notes ? response.notes : '')

    }
    fetch()
  }, [challenge.id, user.uid])
  const submit = async () => {
    try {
      await db.collection('userData').doc(user.uid).collection('notes').doc(`${pinclashEvent}-${challenge.id}`).set({ notes })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <textarea placeholder='notes'  value={notes} onBlur={submit} onChange={e => setLocalNotes(e.target.value)}></textarea>
    </div>
  )
}
