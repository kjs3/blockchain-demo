const test = require('ava')
const crypto = require('crypto')
const Block = require('./block')

test('adds ISO date by default', t => {
  const block = new Block()

  t.truthy(block.timestamp)
})

test('hash generation', t => {
  const now = new Date()
  const index = 1
  const previousHash = ''
  const timestamp = now.toISOString()
  const data = 'some data'

  const block = new Block({index, data, timestamp})

  const hashString = index + previousHash + timestamp + JSON.stringify(data)

  const expectedHash = crypto
    .createHash('sha256')
    .update(hashString)
    .digest('base64')

  t.is(block.hash, expectedHash)
})
