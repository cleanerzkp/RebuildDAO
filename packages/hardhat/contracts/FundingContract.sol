
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./VotingContract.sol";

contract FundingContract {
    mapping(uint256 => uint256) public funds; // Proposal ID to funds
    address public admin;
    VotingContract public votingContract;

    event Funded(uint256 indexed proposalId, uint256 amount);
    event FundsReleased(uint256 indexed proposalId, uint256 amount);

    constructor(address _votingContract) {
        admin = msg.sender;
        votingContract = VotingContract(_votingContract);
    }

    function fundProject(uint256 proposalId) public payable {
        require(msg.value > 0, "Must send some ETH");
        funds[proposalId] += msg.value;
        emit Funded(proposalId, msg.value);
    }

    function releaseFunds(uint256 proposalId, address payable projectOwner) public {
        require(msg.sender == admin, "Only admin");
        require(votingContract.isProposalApproved(proposalId), "Proposal not approved");
        uint256 amount = funds[proposalId];
        require(amount > 0, "No funds to release");
        funds[proposalId] = 0;
        projectOwner.transfer(amount);
        emit FundsReleased(proposalId, amount);
    }
}
