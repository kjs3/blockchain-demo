const Block = require('./block')
const Blockchain = require('./blockchain')

const kjsCoin = new Blockchain()

kjsCoin.addBlock({amount: 3})
kjsCoin.addBlock({amount: 33})
kjsCoin.addBlock({amount: 213})
kjsCoin.addBlock({amount: 1241})

console.log(JSON.stringify(kjsCoin, null, 2))
console.log('IS VALID: ', kjsCoin.isValid())

kjsCoin.chain[2].data = {amount: 1000000}
kjsCoin.chain[2].calculateHash()

console.log('IS VALID: ', kjsCoin.isValid())
