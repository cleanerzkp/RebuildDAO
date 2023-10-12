// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ProjectProposal is
	ERC721,
	ERC721URIStorage,
	ERC721Enumerable,
	Ownable
{
	using Counters for Counters.Counter;
	Counters.Counter private _tokenIdCounter;

	struct Proposal {
		uint256 id;
		string name;
		string description;
		string url;
        string location;
		uint256 fundingGoal;
		uint256 fundsRaised;
	}

	mapping(uint256 => uint256) public fundingGoals;
	mapping(uint256 => string) public locations;
	mapping(uint256 => string) public names;
	mapping(uint256 => string) public descriptions;
	mapping(uint256 => string) public urls;
	mapping(uint256 => uint256) public fundsRaised;

	constructor() ERC721("ProjectProposal", "PP") {}

	function supportsInterface(
		bytes4 interfaceId
	)
		public
		view
		override(ERC721, ERC721Enumerable, ERC721URIStorage)
		returns (bool)
	{
		return super.supportsInterface(interfaceId);
	}

	function _beforeTokenTransfer(
		address from,
		address to,
		uint256 tokenId,
		uint256 batchSize
	) internal override(ERC721, ERC721Enumerable) {
		super._beforeTokenTransfer(from, to, tokenId, batchSize);
	}

	function _burn(
		uint256 tokenId
	) internal override(ERC721, ERC721URIStorage) {
		super._burn(tokenId);
	}

	function tokenURI(
		uint256 tokenId
	) public view override(ERC721, ERC721URIStorage) returns (string memory) {
		return super.tokenURI(tokenId);
	}

	function createProposal(
		string memory name,
		string memory description,
		string memory uri,
		uint256 fundingGoal,
		string memory location
	) public returns (uint256) {
		uint256 tokenId = _tokenIdCounter.current();
		_mint(msg.sender, tokenId);
		_setTokenURI(tokenId, uri);

		fundingGoals[tokenId] = fundingGoal;
		locations[tokenId] = location;
		names[tokenId] = name;
		descriptions[tokenId] = description;

		_tokenIdCounter.increment();
		return tokenId;
	}

	function doTransaction(uint256 tokenId) public payable {
		require(msg.value > 0, "Must send some ether");
		fundsRaised[tokenId] += msg.value;
	}

	function getAllProposals() public view returns (Proposal[] memory) {
		Proposal[] memory proposals = new Proposal[](totalSupply());

		for (uint256 i = 0; i < totalSupply(); i++) {
			uint256 tokenId = tokenByIndex(i);
			proposals[i] = Proposal({
				id: tokenId,
				name: names[tokenId],
				description: descriptions[tokenId],
                location: locations[tokenId],
				url: tokenURI(tokenId),
				fundingGoal: fundingGoals[tokenId],
				fundsRaised: fundsRaised[tokenId]
			});
		}
		return proposals;
	}
}
