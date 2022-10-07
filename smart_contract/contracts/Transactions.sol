pragma solidity ^0.8.17;

contract Transactions {
    uint256 transctionCount;

    event Transfer (address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

    struct TransferStruct{
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

     Transactions [] transactions; 



     function addToBlockchain () public {

     }
     function getAllTransactions () public view returns( TransferStruct [] memory) {
        //Return Transactions;

     }
     function getTransactionCount () public view returns (uint256) {
 
        //return TransactionCount;
     }
}