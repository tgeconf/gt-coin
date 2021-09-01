const Blockchain = require('./chain');
const Transaction = require('./transaction');

let gtCoin = new Blockchain();
console.log('Creating some transactions...');
gtCoin.createTransaction(new Transaction('address1', 'address2', 100));
gtCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('Starting the miner...');
gtCoin.minePendingTransactions('xaviers-address');// xaviers-address is the miner
console.log('Balance of Xaviers address is', gtCoin.getBalanceOfAddress('xaviers-address'));
// 发给矿工的奖励在新的transaction里面，所以再次挖矿就会收到奖励。
console.log('Starting the miner again!');
gtCoin.minePendingTransactions("xaviers-address");
console.log('Balance of Xaviers address is', gtCoin.getBalanceOfAddress('xaviers-address'));
