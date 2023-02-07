// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import {IERC1155} from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

contract IHero {
    ////////////////////////////////////////////////////////
    ///                      SCHEMA                      ///
    ////////////////////////////////////////////////////////

    struct Stop {
        IERC1155 badge;
        uint8 mandatory;
        uint256 id;
        uint256 balance;
    }

    struct Quest {
        address to;
        bytes data;
        uint256 value;
        uint256 stopsRequired;
        Stop[] stops;
        Reward[] rewards;
    }

    struct Reward {
        IERC1155 token;
        uint256 id;
        uint256 amount;
    }

    struct Journey {
        address caller;
        uint256 start;
        uint256 end;
        Quest[] quests;
    }

    ////////////////////////////////////////////////////////
    ///                      EVENTS                      ///
    ////////////////////////////////////////////////////////

    event JourneyPinned(
        address indexed caller,
        uint256 indexed journeyId,
        uint256 start,
        uint256 end
    );

    event JourneyUnpinned(
        address indexed caller,
        uint256 indexed journeyId,
        uint256 start,
        uint256 end
    );

    event QuestEmbarked(
        address indexed caller,
        uint256 indexed journeyId,
        uint256 indexed questId,
        address to,
        bytes data,
        uint256 value,
        uint256 stopsRequired
    );
}
