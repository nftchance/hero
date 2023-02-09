// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

/// @dev Core dependencies.
import {Journey} from "../Journey.sol";
import {IBadger} from "./IBadger.sol";
import {ERC20} from "solmate/src/tokens/ERC20.sol";
import {ERC1155} from "solmate/src/tokens/ERC1155.sol";

interface IHerosJourney {
    ////////////////////////////////////////////////////////
    ///                      SCHEMA                      ///
    ////////////////////////////////////////////////////////

    struct Stop {
        ERC1155 badge;
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
        ERC20 token;
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

    struct Adventure {
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
        Journey indexed journey,
        address indexed caller,
        uint256 start,
        uint256 end
    );

    event JourneyUnpinned();

    event QuestCompleted(address indexed caller, uint256 questId);
}
