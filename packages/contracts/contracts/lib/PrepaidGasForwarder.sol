// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.20;

import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Context.sol";

import {IGasOrder} from "../interfaces/IGasOrder.sol";

/**
 *
 * This contract might be used in order to support metatx, and keep compatibility with other trusted forewarders
 *
 */
// @todo add multiple trusted forewarders
abstract contract PrepaidGasForewarder is ERC2771Context, Ownable {
  using EnumerableSet for EnumerableSet.AddressSet;

  EnumerableSet.AddressSet internal _trustedForewarders;

  // @todo replace `_gasOrderContract` with hardcoded value

  constructor(IGasOrder _gasOrderContract) ERC2771Context(address(_gasOrderContract)) {
    _trustedForewarders.add(address(_gasOrderContract));
  }

  function isTrustedForwarder(address _forewarder) public view override returns (bool) {
    return _trustedForewarders.contains(_forewarder);
  }

  function _msgSender() internal view override(ERC2771Context, Context) returns (address sender) {
    return ERC2771Context._msgSender();
  }

  function _msgData() internal view override(ERC2771Context, Context) returns (bytes calldata) {
    return ERC2771Context._msgData();
  }

  function addTrustedForewarder(address _forewarder) external onlyOwner {
    _trustedForewarders.add(_forewarder);
    // @todo emit event
  }

  function removeTrustedForewarder(address _forewarder) external onlyOwner {
    _trustedForewarders.remove(_forewarder);
    // @todo emit event
  }
}
