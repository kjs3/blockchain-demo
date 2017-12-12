const crypto = require('crypto')
const Block = require('./block')

class Blockchain {
  constructor () {
    this.chain = [this.createGenesisBlock()]
  }

  createGenesisBlock () {
    return new Block({
      index: 0,
      timestamp: '2017-01-01T00:00:00.000Z',
      data: 'Genesis block',
      previousHash: null,
    })
  }

  getLatestBlock () {
    return this.chain[this.chain.length - 1]
  }

  addBlock (data) {
    const latestBlock = this.getLatestBlock()
    const newBlock = new Block({
      index: latestBlock.index + 1,
      data: data,
      previousHash: latestBlock.hash,
    })

    this.chain.push(newBlock)

    return newBlock
  }

  isValid () {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i]
      const previousBlock = this.chain[i-1]

      if (currentBlock.hash !== currentBlock.calculateHash()) return false
      if (currentBlock.previousHash !== previousBlock.hash) return false
    }

    return true
  }
}

module.exports = Blockchain
