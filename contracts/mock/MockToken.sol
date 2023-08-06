pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract MockToken is ERC20, Ownable {
  constructor(string memory _name, string memory _symbol, uint256 _initialSupply) ERC20(_name, _symbol) {
    _mint(msg.sender, _initialSupply);
  }

  function mint(address _recipient, uint256 _amount) public onlyOwner {
    _mint(_recipient, _amount);
  }

  function burn(address _target, uint256 _amount) public onlyOwner {
    _burn(_target, _amount);
  }
}
//@todo add token factory
