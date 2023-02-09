// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

/// @dev Core dependencies.
import {IBadger} from "./IBadger.sol";
import {IERC1155} from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IHerosJourney {
    ////////////////////////////////////////////////////////
    ///                      SCHEMA                      ///
    ////////////////////////////////////////////////////////

    struct Stop {
        IERC1155 badge;
        uint8 mandatory;
        uint256 id;
        uint256 balance;
    }

    struct Transaction {
        address target;
        bytes data;
        uint256 value;
    }

    struct Reward {
        IERC20 token;
        uint256 id;
        uint256 amount;
    }

    struct Badge {
        bool accountBound;
        uint256 id;
        uint256 amount;
        string uri;
        address[] delegates;
    }

    struct Quest {
        address to;
        bytes data;
        uint256 value;
        uint256 max;
        uint256 stopsRequired;
        Stop[] stops; /// ----------------- @dev Required to complete quest.
        Transaction[] transactions; /// --- @dev Transactions inside quest.
        Reward[] rewards; /// ------------- @dev ERC20 token(s).
        Badge badge; /// ------------------ @dev ERC1155 badge.
    }

    struct Journey {
        IBadger badgerOrganization;
        address caller;
        uint256 start;
        uint256 end;
        Quest[] quests; /// ---------------- @dev Quests available to complete.
    }

    ////////////////////////////////////////////////////////
    ///                      EVENTS                      ///
    ////////////////////////////////////////////////////////

    event JourneyPinned(
        address indexed hero,
        address indexed caller,
        uint256 start,
        uint256 end
    );

    event JourneyUnpinned(
        address indexed hero,
        address indexed caller,
        uint256 start,
        uint256 end
    );

    event QuestCompleted(
        address indexed hero,
        address indexed caller,
        uint256 questId
    );
}
