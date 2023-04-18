
const challengeMap = {
  'Tier 1':
      `Start any Kaiju Battle
      Start Godzilla Multiball
      Start Mechagodzilla Multiball
      Start Fighter Attack
      Recruit an Ally
      Use a Heat Ray
      Collect 1 City Combo
      Start Hedorah
      50,000,000+ Score`.split('\n').map(s => s.trim()).filter(s => s)
  ,
  'Tier 2':
    `Defeat Ebirah
    Defeat Gigan
    Defeat Titanosaurus
    Start Tesla Strike
    Start Bridge Attack Multiball
    Start Tank Attack Multiball
    Collect 6 Jet Fighters
    Collect a Carnage Bonus
    Recruit 2 Allies
    Collect a Destruction Jackpot
    Collect a Godzilla Multiball Super Jackpot
    Collect a Mechagodzilla Multiball Super Jackpot
    Collect a Bridge Multiball Super Jackpot
    100,000,000+ Score`.split('\n').map(s => s.trim()).filter(s => s)
  ,
  'Tier 3':
    `Defeat Megalon
    Collect a 20,000,000+ Destruction Jackpot
    Collect a Tank Multiball Super Jackpot
    Collect a 2x+ Carnage Bonus
    Collect a 10,000,000+ Hedorah Shot or Jackpot
    Collect 2 City Combos (Premium/LE)
    Start Super Train (Premium/LE)
    Collect Train Big Score (Pro)
    150,000,000+ Score`.split('\n').map(s => s.trim()).filter(s => s)
  ,
  'Tier 4':
    `	Recruit 3 Allies
    Collect two Destruction Jackpots
    Defeat Ebirah & Gigan
    Defeat Gigan & Titanosaurus
    Complete Tesla Strike
    Start Rampage
    Collect Godzilla Powerup Level 2
    Light 1 Ally in Super Train (Premium/LE)
    250,000,000+ Score`.split('\n').map(s => s.trim()).filter(s => s)
  ,
  'Tier 5':
    `Defeat Megalon & Any Other Kaiju
    Collect 12 Jet Fighters
    Collect a 75,000,000+ Destruction Jackpot
    Start a Tier 2 Battle
    Collect a 100,000,000+ Carnage Bonus
    400,000,000+ Score`.split('\n').map(s => s.trim()).filter(s => s)

}


const challenges = []
Object.keys(challengeMap).forEach(key => {
  const tier = parseInt(key.split('Tier ')[1], 10)
  const list = challengeMap[key]
  list.forEach(challenge => {
    challenges.push({ tier, challenge })
  })
})
console.log(challenges)


export default challenges
