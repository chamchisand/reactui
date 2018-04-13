const expect = require('chai').expect
const server = require('../server')

describe('ping', () => {
  it('should return pong', () => {
    return server.inject({
      method: 'GET',
      url: '/ping'
    }).then(resp => {
      expect(resp.payload).to.equal('pong')
    })
  })
})

