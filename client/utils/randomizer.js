const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
const nums = "0123456789"

function getRandomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function randomizer(includeItems, charLength){
  let final = ""
  let choices = ""
  if( includeItems.includes("a") ) choices += chars
  if( includeItems.includes("1") ) choices += nums

  for( let i = 0; i < charLength; i++ ){
    final += choices[getRandomNumber(0, choices.length-1)]
  }

  return final
}