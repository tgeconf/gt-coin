const Block = require('./block');
const Transaction = require('./transaction');

class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;// track the difficulty of this blockchain, means the hash of the block must start with two zeros

        this.pendingTransactions = [];// record transactions that need to be deal with, before the new block is created
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new Block("01/01/2017", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    createTransaction(transaction) {
        // 这里应该有一些校验!

        // 推入待处理交易数组
        this.pendingTransactions.push(transaction);
    }

    minePendingTransactions(miningRewardAddress) {
        // 用所有待交易来创建新的区块并且开挖，实际情况中，由于区块大小限制，矿工可以选择在当前区块中哪些jiao'yi达成哪些不达成。
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        // 将新挖的矿加入到链上
        this.chain.push(block);

        // 重置待处理交易列表并且发送奖励，一旦挖到矿系统创建新的交易来给你挖矿奖励
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    /**
     * 检查余额
     * @param {} address 
     * @returns 
     */
    getBalanceOfAddress(address) {
        let balance = 0; // you start at zero!

        // 遍历每个区块以及每个区块内的交易
        for (const block of this.chain) {
            for (const trans of block.transactions) {

                // 如果地址是发起方 -> 减少余额
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }

                // 如果地址是接收方 -> 增加余额
                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }


    isChainValid() {// make sure no one has changed the chain
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

module.exports = BlockChain;