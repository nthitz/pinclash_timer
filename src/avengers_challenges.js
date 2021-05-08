
const challengeMap = {
  'Tier 1': [
    'Collect Black Panther',
    'Collect Black Widow',
    'Collect Hulk',
    'Start a Gem Quest',
    'Start a Hawkeye Challenge',
    'Collect a 3x Hawkeye Combo',
    'Start Thor Multiball',
    'Collect a Shield Bonus',
    'Start any Super Mode'
  ],
  'Tier 2': [
    'Collect Level 1 Black Panther',
    'Collect Level 1 Black Widow',
    'Collect Level 1 Hulk',
    'Start Iron Man Multiball',
    'Start a Gem Quest with 1 Portal Lock',
    'Collect T-H during Thor Multiball',
    'Start Gamma Ray',
    'Collect a Combo Super Jackpot',
    '20,000,000+ Score',
  ],
  'Tier 3': [
    'Collect Level 2 Black Panther',
    'Collect Level 2 Black Widow',
    'Collect Level 2 Hulk',
    'Start a Gem Quest with 2 Portal Locks',
    'Collect an Iron Man 2x Tower Jackpot',
    'Collect a T-H-O during Thor Multiball',
    'Complete any Gem Quest',
    'Collect any Bronze+ trophy',
    'Collect 10,000,000+ in Gamma Ray',
    'Collect 2 Computer Grid Row Awards (3-in-a-row x2)',
    'Collect 2 Combo Super Jackpots',
    '50,000,000+ Score'
  ],
  'Tier 4': [
    'Collect Level 2 Iron Man',
    'Collect any Silver Trophy+',
    'Collect 20,000,000+ in Gamma Ray',
    'Collect 3 Computer Grid Row Awards (3-in-a-row x3)',
    '100,000,000+ Score',
  ],
  'Tier 5': [
    'Collect any Gold Trophy',
    'Collect 30,000,000+ in Gamma Ray',
    'Collect the Soul Gem',
    'Collect a Thor Super Jackpot',
    'Collect an Iron Man Disc Super Jackpot',
    '200,000,000+ Score'
  ]
}


const challenges = []
Object.keys(challengeMap).forEach(key => {
  const tier = parseInt(key.split('Tier ')[1], 10)
  const list = challengeMap[key]
  list.forEach(challenge => {
    challenges.push({ tier, challenge })
  })
})


export default challenges
