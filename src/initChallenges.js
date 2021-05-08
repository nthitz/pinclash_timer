import { db } from './firebase'

import challenges from './avengers_challenges'

export default async function initChallenges() {
  try {
    challenges.forEach(async (challenge) => {
      const name = challenge.challenge.replace(/[^A-Za-z0-9]/g,'')
      await db.collection('challenges').doc('avengers').collection('challenges')
        .doc(name).set(challenge)

    })
  } catch (error) {
    console.log(error)
  }

}
