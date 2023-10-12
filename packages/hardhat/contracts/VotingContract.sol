// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract VotingContract {
    mapping(uint256 => uint256) public votes; // Proposal ID to vote count
    uint256 public voteThreshold = 1000;

    event Voted(uint256 indexed proposalId, uint256 voteCount);

    function voteForProposal(uint256 proposalId) public {
        votes[proposalId]++;
        emit Voted(proposalId, votes[proposalId]);
    }

    function isProposalApproved(uint256 proposalId) public view returns (bool) {
        return votes[proposalId] >= voteThreshold;
    }
}
