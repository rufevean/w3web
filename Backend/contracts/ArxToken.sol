// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

//@title ArxPropertyToken
//@author 0xSud0_ Find me on:  https://twitter.com/0xSud0_
//@description ERC20 tokenomics for property ownership represented by an NFT

//-------------------------------------imports-------------------------------------

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract ArxToken is ERC20, Ownable, ERC20Permit, ERC721Holder, ERC20Votes {
    //-------------------------------------variables-------------------------------------

    IERC721 public collection;
    uint256 public tokenId;
    bool public initialized = false;
    bool public forSale = false;
    bool public forRent = false;
    bool public sharesForSale = false;
    uint256 public salePrice;
    uint256 public rentPerMonth;
    bool public canRedeem = false;
    uint public tokensRem;
    uint256 public tokenPrice;
    address public propertyOwner;
    address[] public tokenHolders;
    address public approvedBuyer;
    address public approvedRentee;

    //-------------------------------------events-------------------------------------

    event NFTForSale(uint256 _price); //event to be emitted when nft is put for sale
    event SharesForSale(uint256 _price); //event to be emitted when shares are put for sale
    event PropertyForRent(uint256 _price); //event to be emitted when shares are put for sale
    event priceUpdated(uint256 _price); //event to be emitted when price of property is updated
    event Initialized(address _collection, uint256 _tokenId); //event to be emitted when contract is initialized

    event Redeemed(uint256 _amount, uint256 _tokens); //event to be emitted when tokens are redeemed
    event PurchasedShare(uint256 _amount, uint256 _price); //event to be emitted when shares are purchased
    event PurchasedNFT(uint256 _amount); //event to be emitted when nft is purchased
    event RentDistributed(uint256 _amount); //event to be emitted when rent is distributed

    //-------------------------------------constructor-------------------------------------

    constructor(
        uint _totalTokens,
        address _propertyOwner,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) ERC20Permit(_name) {
        tokensRem = _totalTokens; //set tokens remaining
        propertyOwner = _propertyOwner; //set property owner
    }

    //-------------------------------------overrides for ERC20Votes-------------------------------------

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
        removeTokenHolder(from); //remove token holder
        tokenHolders.push(to); //add token holder
    }

    function _mint(
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._mint(to, amount);
        tokenHolders.push(to); //add token holder
    }

    function _burn(
        address account,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._burn(account, amount);
        removeTokenHolder(account); //remove token holder
    }

    //-------------------------------------internal functions-------------------------------------

    function removeTokenHolder(address account) internal {
        for (uint256 i = 0; i < tokenHolders.length; i++) {
            if (tokenHolders[i] == account) {
                tokenHolders[i] = tokenHolders[tokenHolders.length - 1]; //replace token holder with last token holder
                tokenHolders.pop(); //remove token holder
                break; //break out of loop
            }
        }
    }

    function transferToOwner(uint256 _amount) internal {
        uint256 propertyOwnerCut = _amount / balanceOf(propertyOwner); //Defining 15 percent of earnings
        _burn(propertyOwner, balanceOf(propertyOwner)); //burn tokens from property owner
        payable(propertyOwner).transfer(propertyOwnerCut); //send ether to property owner
    }

    //-------------------------------------onlyOwner functions-------------------------------------

    function initialize(
        address _collection,
        uint256 _tokenId,
        address _from
    ) external onlyOwner {
        require(!initialized, "Already initialized"); //verify not already initialized
        uint _amountt = (tokensRem * 15) / 100; //Defining 15 percent of tokens
        collection = IERC721(_collection); //setting the nft collection
        collection.safeTransferFrom(_from, address(this), _tokenId); //taking nft from the nft owner
        tokenId = _tokenId; //setting the token id
        initialized = true; //initialized
        _mint(propertyOwner, _amountt); //sent 15 percent tokens to property owner
        tokensRem -= _amountt; //update tokens remaining
        tokenHolders.push(propertyOwner); //add propertyOwner as a token holder

        emit Initialized(_collection, _tokenId);
    }

    function putSharesForSale(uint256 _price) external onlyOwner {
        sharesForSale = true; //shares for sale
        salePrice = _price; //set sale price
        tokenPrice = salePrice / totalSupply(); //set token price

        emit SharesForSale(tokenPrice);
    }

    function putNFTForSale(uint256 _price) external onlyOwner {
        forSale = true; //nft for sale
        salePrice = _price; //set sale price
        tokenPrice = salePrice / totalSupply(); //set token price

        emit NFTForSale(_price);
    }

    function putForRent(uint256 _price) external onlyOwner {
        forRent = true; //nft for rent
        rentPerMonth = _price; //set rent per month

        emit PropertyForRent(_price);
    }

    function changeNftPrice(uint256 _price) external onlyOwner {
        salePrice = _price; //update sale price
        tokenPrice = salePrice / totalSupply(); //update token price

        emit priceUpdated(_price);
    }

    function pauseSharePurchase() external onlyOwner {
        sharesForSale = false; //shares no longer for sale
    }

    function pauseNftPurchase() external onlyOwner {
        forSale = false; //nft no longer for sale
    }

    function pauseRent() external onlyOwner {
        forRent = false; //property no longer for rent
    }

    function setBuyer(address _buyer) external onlyOwner {
        approvedBuyer = _buyer; //set approved buyer
    }

    function setRentee(address _rentee) external onlyOwner {
        approvedRentee = _rentee; //set approved rentee
    }

    //-------------------------------------public functions-------------------------------------

    function redeem(uint256 _amount) external {
        require(canRedeem, "Redemption not available"); //verify redemption is available
        require(balanceOf(msg.sender) >= _amount, "Insuffient tokens!"); //verify user has enough tokens
        uint256 totalEther = address(this).balance; //total ether in contract
        uint256 toRedeem = (_amount * totalEther) / totalSupply(); //ether to redeem

        _burn(msg.sender, _amount); //burn tokens
        payable(msg.sender).transfer(toRedeem); //send ether to user

        emit Redeemed(toRedeem, _amount);
    }

    function getTokenPrice(uint256 _amount) external view returns (uint256) {
        require(initialized, "Not initialized yet!"); //verify contract is initialized
        return _amount * tokenPrice; //return price of tokens
    }

    function getNFTPrice() external view returns (uint256) {
        require(initialized, "Not initialized yet!"); //verify contract is initialized
        return salePrice; //return price of nft
    }

    function getRentPrice() external view returns (uint256) {
        require(initialized, "Not initialized yet!"); //verify contract is initialized
        return rentPerMonth; //return rent per month
    }

    function getCurrentTokenUseage() external view returns (uint256, uint256) {
        require(initialized, "Not initialized yet!"); //verify contract is initialized
        return (tokensRem, totalSupply()); //return total tokens vaiable to use and tokens minted
    }

    //-------------------------------------payable functions-------------------------------------

    function purchaseNFT() external payable {
        require(msg.sender == approvedBuyer, "Not approved buyer"); //verify buyer is approved
        require(forSale, "Not for sale"); //verify nft is for sale
        require(msg.value >= salePrice, "Not enough ether sent"); //verify enough ether is sent
        collection.transferFrom(address(this), msg.sender, tokenId); //transfer nft to buyer
        forSale = false; //nft no longer for sale
        canRedeem = true; //tokens can now be redeemed

        transferToOwner(msg.value); //transfer a cut of ether to owner

        emit PurchasedNFT(salePrice);
    }

    function purchaseShare(uint256 _amount) external payable {
        require(sharesForSale, "Not for sale yet"); //verify shares are for sale
        require(msg.value >= 0, "Cant send 0 ether"); //verify ether is provided
        require(tokensRem >= _amount, "Shares not available"); //verify shares are available
        require(msg.value >= _amount * tokenPrice, "Not enough ether sent"); //verify enough ether is sent
        tokensRem -= _amount; //update shares remaining
        _mint(msg.sender, _amount); //mint tokens
        transfer(propertyOwner, msg.value); //send ether to property owner

        emit PurchasedShare(_amount, _amount * tokenPrice);
    }

    function payRent() external payable {
        require(
            (msg.sender == approvedRentee) || (msg.sender == propertyOwner),
            "Not approved to use this!"
        ); //verify rentee is approved
        require(forRent, "Not for rent"); //verify property is for rent
        require(msg.value >= rentPerMonth, "Not enough ether sent"); //verify enough ether is sent
        uint256 totalEther = msg.value; //total rent
        uint256 toDistribute = totalEther / totalSupply(); //rent per token
        for (uint256 i = 0; i < tokenHolders.length; i++) {
            payable(tokenHolders[i]).transfer(toDistribute); //distribute rent
        }

        emit RentDistributed(toDistribute);
    }

    //-------------------------------------receive and fallback functions-------------------------------------
    receive() external payable {} //receive() is called if msg.data is empty and no other function matches

    fallback() external payable {} //fallback() is called if no other function matches for payment
}
