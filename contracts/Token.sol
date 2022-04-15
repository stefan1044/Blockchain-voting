// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.1;

contract Token{
    address public contractOwner;
    constructor(){
        contractOwner=msg.sender;
    }
    struct token{
        bool cantVote;
        bool hasToken;
    }

    mapping (address=>token) public tokenCount;
    mapping (address=>uint) public voteCount;

    function viewContractOwner() public view returns (address){
        return contractOwner;
    }
    function viewTokenCount(address _viewAddress) public view returns (bool,bool){
        return (tokenCount[_viewAddress].cantVote, tokenCount[_viewAddress].hasToken);
    }
    function viewVoteCount(address _viewAddress) public view returns (uint){
        return voteCount[_viewAddress];
    }

    function giveToken( address payable _toAddress) public {
        require(contractOwner==msg.sender, "You are not the owner");
        require(tokenCount[_toAddress].cantVote==false, "User cannot vote");
        tokenCount[_toAddress].hasToken=true;
        
    }

    function sendVote( address _toAddress) public {
        require(tokenCount[msg.sender].cantVote==false, "You do not have the funds");
        require(tokenCount[msg.sender].hasToken==true, "You do not have the funds");
        tokenCount[msg.sender].cantVote=true;
        tokenCount[_toAddress].hasToken=false;
        voteCount[_toAddress]++;
    }


}