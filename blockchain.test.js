const test = require('ava')
const crypto = require('crypto')
const Blockchain = require('./blockchain')

test('Genesis block is Jan 1, 2017', t => {
  const myChain = new Blockchain()

  t.is(myChain.getLatestBlock().timestamp, '2017-01-01T00:00:00.000Z')
})

test('chain is valid if block sequence is correct', t => {
  const myChain = new Blockchain()

  myChain.addBlock({amount: 1})
  myChain.addBlock({amount: 12})
  myChain.addBlock({amount: 123})
  myChain.addBlock({amount: 1234})

  t.is(myChain.isValid(), true)
})

test('chain BECOMES invalid if a blocks data was tampered with', t => {
  const myChain = new Blockchain()

  myChain.addBlock({amount: 1})
  myChain.addBlock({amount: 12})
  myChain.addBlock({amount: 123})
  myChain.addBlock({amount: 1234})

  t.is(myChain.isValid(), true)

  myChain.chain[2].data = {amount: 1000000000}

  t.is(myChain.isValid(), false)
})

test('chain BECOMES invalid if a blocks data was tampered with even if hash matches', t => {
  const myChain = new Blockchain()

  myChain.addBlock({amount: 1})
  myChain.addBlock({amount: 12})
  myChain.addBlock({amount: 123})
  myChain.addBlock({amount: 1234})

  t.is(myChain.isValid(), true)

  myChain.chain[2].data = {amount: 1000000000}
  myChain.chain[2].calculateHash()

  t.is(myChain.isValid(), false)
})
