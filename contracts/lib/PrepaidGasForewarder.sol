// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.19;

import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import {IExecutor} from "../interfaces/IExecutor.sol";

/**
 *
 * This contract might be used in order to support metatx, and keep compatibility with other trusted forewarders
 *
 */
// @todo add multiple trusted forewarders
contract PrepaidGasForewarder is ERC2771Context, Ownable {
  using EnumerableSet for EnumerableSet.AddressSet;

  EnumerableSet.AddressSet internal _trustedForewarders;

  // @todo replace `_executorContract` with hardcoded value

  constructor(IExecutor _executorContract) ERC2771Context(address(_executorContract)) {
    _trustedForewarders.add(address(_executorContract));
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
