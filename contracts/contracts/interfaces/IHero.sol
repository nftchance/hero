// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import {IHerosJourney} from "./IHerosJourney.sol";

interface IHero is IHerosJourney {
    function initialize(Journey memory journey) external;
}
