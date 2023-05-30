// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

//@title ArxNFT
//@author 0xSud0_ Find me on:  https://twitter.com/0xSud0_
//@description ERC721 tokenomics for property ownership

//-------------------------------------imports-------------------------------------

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ArxNFT is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    //-------------------------------------variables & mappings-------------------------------------

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    struct Property {
        string leagalOwner;
        string propertyAddress;
        string propertyType;
        string propertySize;
        string propertyDescription;
    }

    mapping(uint256 => Property) public properties;

    //-------------------------------------constructor-------------------------------------

    constructor() ERC721("ArxNFT", "AFT") {}

    //-------------------------------------Public Functions-------------------------------------

    function safeMint(
        address to,
        string memory uri,
        string memory _leagalOwner,
        string memory _propertyAddress,
        string memory _propertyType,
        string memory _propertySize,
        string memory _propertyDescripton
    ) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        properties[tokenId] = Property(
            _leagalOwner,
            _propertyAddress,
            _propertyType,
            _propertySize,
            _propertyDescripton
        );
        _setTokenURI(tokenId, uri);
    }

    //-------------------------------------Overrides-------------------------------------

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

    //-------------------------------------Getters-------------------------------------

    function getPropertyDetails(
        uint256 _tokenId
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        return (
            properties[_tokenId].leagalOwner,
            properties[_tokenId].propertyAddress,
            properties[_tokenId].propertyType,
            properties[_tokenId].propertySize,
            properties[_tokenId].propertyDescription
        );
    }

    function getLatestTokenId() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
}
