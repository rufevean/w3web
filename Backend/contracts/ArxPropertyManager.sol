// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

//@title ArxPropertyManager
//@author 0xSud0_ Find me on:  https://twitter.com/0xSud0_
//@description Implementing and using the ArxNFT & ArxToken Contracts to Implement Governance for property Investors

//-------------------------------------imports-------------------------------------

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "./ArxNFT.sol";
import "./ArxToken.sol";

contract ArxPropertyManager is Ownable, ERC721Holder {
    //-------------------------------------variables & mappings-------------------------------------

    ArxNFT public arxNFT; // ArxNFT contract instance
    ArxToken public arxToken; // ArxToken contract instance
    address public arxNFTAddress; // ArxNFT deployed contract address
    uint256[] public arxNFTTokenIds; // ArxNFT tokenIds array

    mapping(uint256 => address) public arxTokenIdToArxTokenAddress; // ArxToken contract address to ArxNFT tokenId mapping

    //-------------------------------------events-------------------------------------

    event PropertyListed(
        address indexed _to,
        string _uri,
        string _leagalOwner,
        string _propertyAddress,
        string _propertyType,
        string _propertySize,
        string _propertyDescripton,
        uint256 _totalSupply,
        string _name,
        string _symbol,
        uint256 _tokenId,
        address _arxTokenAddress
    );
    event ShareSetForSale(uint256 indexed _tokenId, uint256 _Price);
    event NFTSetForSale(uint256 indexed _tokenId, uint256 _Price);
    event PropertySetForRent(uint256 indexed _tokenId, uint256 _Price);
    event NFTPriceChanged(uint256 indexed _tokenId, uint256 _Price);
    event RenteeChanged(uint256 indexed _tokenId, address _rentee);
    event BuyerSet(uint256 indexed _tokenId, address _buyer);

    //-------------------------------------constructor-------------------------------------

    constructor() {
        arxNFT = new ArxNFT(); // Deploying the ArxNFT contract
        arxNFTAddress = address(arxNFT); // Storing the ArxNFT deployed contract address
    }

    //-------------------------------------Internal Functions-------------------------------------

    function _mintPropertyNFT(
        address _to,
        string memory _uri,
        string memory _leagalOwner,
        string memory _propertyAddress,
        string memory _propertyType,
        string memory _propertySize,
        string memory _propertyDescripton
    ) internal returns (uint256) {
        arxNFT.safeMint(
            _to,
            _uri,
            _leagalOwner,
            _propertyAddress,
            _propertyType,
            _propertySize,
            _propertyDescripton
        ); // Minting the ArxNFT for the entered property details
        return arxNFT.getLatestTokenId(); // Returning the latest tokenId
    }

    //-------------------------------------Public Functions-------------------------------------

    function returnArxTokenAddress(
        uint256 _tokenId
    ) public view returns (address) {
        return arxTokenIdToArxTokenAddress[_tokenId]; // Returning the ArxToken contract address for the entered ArxNFT tokenId
    }

    //-----------------------------OnlyOwner Functions-------------------------------------

    function listProperty(
        address _to,
        string memory _uri,
        string memory _leagalOwner,
        string memory _propertyAddress,
        string memory _propertyType,
        string memory _propertySize,
        string memory _propertyDescripton,
        uint256 _totalSupply,
        string memory _name,
        string memory _symbol
    ) public onlyOwner {
        uint256 tokenId = _mintPropertyNFT(
            address(this),
            _uri,
            _leagalOwner,
            _propertyAddress,
            _propertyType,
            _propertySize,
            _propertyDescripton
        ); // Minting the ArxNFT for the entered property details
        arxNFTTokenIds.push(tokenId); // Pushing the tokenId to the ArxNFT tokenIds array
        arxToken = new ArxToken(_totalSupply, _to, _name, _symbol); // Deploying the ArxToken contract for this nft
        arxTokenIdToArxTokenAddress[tokenId] = address(arxToken); // Mapping the ArxToken contract address to ArxNFT tokenId
        arxNFT.approve(address(arxToken), tokenId); // Approving the ArxToken contract to transfer the ArxNFT tokenId
        arxToken.initialize(address(arxNFT), tokenId, address(this)); // Initializing the ArxToken contract

        emit PropertyListed(
            _to,
            _uri,
            _leagalOwner,
            _propertyAddress,
            _propertyType,
            _propertySize,
            _propertyDescripton,
            _totalSupply,
            _name,
            _symbol,
            tokenId,
            address(arxToken)
        ); // Emitting the PropertyListed event
    }

    /*-------------------------------------Governance Functions-------------------------------------*/
    function putSharesForSale(
        uint256 _tokenId,
        uint256 _price
    ) public onlyOwner {
        ArxToken arxTokenInstatk = ArxToken(
            payable(arxTokenIdToArxTokenAddress[_tokenId])
        ); // ArxToken contract instance using the ArxToken contract address
        arxTokenInstatk.putSharesForSale(_price); // Calling the putSharesForSale function in ArxToken contract
        emit ShareSetForSale(_tokenId, _price); // Emitting the ShareSetForSale event
    }

    function putNFTForSale(uint256 _tokenId, uint256 _price) public onlyOwner {
        ArxToken arxTokenInstatk = ArxToken(
            payable(arxTokenIdToArxTokenAddress[_tokenId])
        ); // ArxToken contract instance using the ArxToken contract address
        arxTokenInstatk.putNFTForSale(_price); // Calling the putNFTForSale function in ArxToken contract
        emit NFTSetForSale(_tokenId, _price); // Emitting the NFTSetForSale event
    }

    function putForRent(uint256 _tokenId, uint256 _price) public onlyOwner {
        ArxToken arxTokenInstatk = ArxToken(
            payable(arxTokenIdToArxTokenAddress[_tokenId])
        ); // ArxToken contract instance using the ArxToken contract address
        arxTokenInstatk.putForRent(_price); // Calling the putForRent function in ArxToken contract
    }

    function changeNftPrice(uint256 _tokenId, uint256 _price) public onlyOwner {
        ArxToken arxTokenInstatk = ArxToken(
            payable(arxTokenIdToArxTokenAddress[_tokenId])
        ); // ArxToken contract instance using the ArxToken contract address
        arxTokenInstatk.changeNftPrice(_price); // Calling the changeNftPrice function in ArxToken contract
    }

    function pauseSharePurchase(uint256 _tokenId) public onlyOwner {
        ArxToken arxTokenInstatk = ArxToken(
            payable(arxTokenIdToArxTokenAddress[_tokenId])
        ); // ArxToken contract instance using the ArxToken contract address
        arxTokenInstatk.pauseSharePurchase(); // Calling the pauseSharePurchase function in ArxToken contract
    }

    function pauseNftPurchase(uint256 _tokenId) public onlyOwner {
        ArxToken arxTokenInstatk = ArxToken(
            payable(arxTokenIdToArxTokenAddress[_tokenId])
        ); // ArxToken contract instance using the ArxToken contract address
        arxTokenInstatk.pauseNftPurchase(); // Calling the pauseNftPurchase function in ArxToken contract
    }

    function pauseRent(uint256 _tokenId) public onlyOwner {
        ArxToken arxTokenInstatk = ArxToken(
            payable(arxTokenIdToArxTokenAddress[_tokenId])
        ); // ArxToken contract instance using the ArxToken contract address
        arxTokenInstatk.pauseRent(); // Calling the pauseRent function in ArxToken contract
    }

    function setBuyer(uint256 _tokenId, address _buyer) public onlyOwner {
        ArxToken arxTokenInstatk = ArxToken(
            payable(arxTokenIdToArxTokenAddress[_tokenId])
        ); // ArxToken contract instance using the ArxToken contract address
        arxTokenInstatk.setBuyer(_buyer); // Calling the setBuyer function in ArxToken contract
    }

    function setRentee(uint256 _tokenId, address _renter) public onlyOwner {
        ArxToken arxTokenInstatk = ArxToken(
            payable(arxTokenIdToArxTokenAddress[_tokenId])
        ); // ArxToken contract instance using the ArxToken contract address
        arxTokenInstatk.setRentee(_renter); // Calling the setRentee function in ArxToken contract
    }
}
