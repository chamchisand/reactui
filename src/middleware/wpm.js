export const grossWpm = (count, ms) => {
  if (ms === 0){
    return '--'
  }

  // 60 : 1 = x : 1
  // 60 x = 1
  const min = Math.floor(ms / 1000 / 60)
  return Math.floor((count / 5) / min)
}

export const netWpm = (count, errorCount, ms) => {
  if (ms === 0) {
    return '--'
  }

  const min = ms / 1000 / 60
  const wpm = Math.floor(((count / 5) - errorCount) / min)
  return wpm > 0 ? wpm : 0
}
