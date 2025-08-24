export function buildBirthdayPrompt(receiverName: string, genre: string, gender: 'male'|'female'|'other') {
    const pronoun = gender === 'female' ? 'her' : gender === 'male' ? 'him' : 'them'
    const poss   = gender === 'female' ? 'her' : gender === 'male' ? 'his' : 'their'
  
    return (
  `Wish a happy birthday to ${receiverName}.
  
  Ensure that "Happy birthday" is mentioned at least twice in the lyrics, and it should rhyme. The lyrics should use simple, short, and easy to pronounce words.
  
  Write 16 lines of ${genre} lyrics that I can dedicate to ${pronoun} for ${poss} birthday. Each line can have maximum of 8 words or 40 characters.
  
  The lyrics should be unique, avoid copyrights, offensive language, or any unrelated names/places.`
    )
  }
  