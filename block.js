const crypto = require('crypto')

class Block {
  constructor ({index, data, previousHash = '', timestamp} = {}) {
    const now = new Date()

    this.index = index
    this.previousHash = previousHash
    this.timestamp = timestamp || now.toISOString()
    this.data = data
    this.hash = this.calculateHash()
  }

  calculateHash () {
    const hash = crypto.createHash('sha256')

    return hash
      .update(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data))
      .digest('base64')
  }
}

module.exports = Block
