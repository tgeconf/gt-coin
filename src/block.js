const SHA256 = require("crypto-js/sha256");
class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.hash = this.calculateHash();// calculate hash according to the content in this node
        this.nonce = 0;// number of times to find an effective hash
    }

    calculateHash() {
        return SHA256(
            this.previousHash +
            this.timestamp +
            JSON.stringify(this.transactions) +
            this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
            // console.log('MINED TIMES: ', this.nonce, this.hash);
        }
        console.log("BLOCK MINED: " + this.nonce + ', ' + this.hash);
    }

}

module.exports = Block;