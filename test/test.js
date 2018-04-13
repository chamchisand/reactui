const expect = require('chai').expect
const server = require('../server')

describe('1 == 1', function() {
  it('true', function() {
    expect(1).to.equal(1)
  })

  it('true', function() {
    expect(2).to.equal(2)
  })
})

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

