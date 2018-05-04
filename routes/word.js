module.exports = {
  method: 'GET',
  path: '/word/next',
  handler: (req, h) => {
    const word = 'abc'
    console.log('word', word)
    return { word }
  }
}
