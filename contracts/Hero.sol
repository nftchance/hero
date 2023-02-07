// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

/// @dev Core dependencies.
import {IHerosJourney} from "./interfaces/IHerosJourney.sol";

/// @dev Helpers.
import {Bulletin} from "./Bulletin.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Hero is IHerosJourney {
    using SafeERC20 for IERC20;

    ////////////////////////////////////////////////////////
    ///                      STATE                       ///
    ////////////////////////////////////////////////////////

    /// @dev Store the journey -- The chain *is* a database :(
    Journey public journey;

    ////////////////////////////////////////////////////////
    ///                   CONSTRUCTOR                    ///
    ////////////////////////////////////////////////////////

    constructor() {
        /// @dev Load in the journey.
        journey = Bulletin(msg.sender).getJourney();
    }

    ////////////////////////////////////////////////////////
    ///                     SETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * @dev Allows the caller of a journey to unpin it.
     */
    function unpinJourney() external {
        /// @dev Confirm the user set the caller correctly.
        require(
            journey.caller == msg.sender,
            "Hero: Journey caller must be msg.sender"
        );

        /// @dev Confirm the Journey is active.
        require(
            journey.end >= block.timestamp,
            "Hero: Journey must be active to unpin"
        );

        /// @dev Prevent any future interactions with the journey.
        journey.end = block.timestamp;

        /// @dev Transfer all the remaining rewards to the caller.
        for(uint256 i; i < journey.quests.length; i++) {
            /// @dev Load the quest into the stack. 
            Quest memory quest = journey.quests[i];

            /// @dev Loop through all the rewards for every quest.
            for (uint256 j; j < quest.rewards.length; j++) {
                /// @dev Load the reward into the stack.
                Reward memory reward = quest.rewards[j];

                /// @dev Transfer the provided funding back to the caller.
                reward.token.safeTransfer(
                    msg.sender,
                    reward.token.balanceOf(address(this))
                );
            }
        }

        /// @dev Emit the event.
        emit JourneyUnpinned(
            address(this),
            journey.caller,
            journey.start,
            journey.end
        );
    }

    /**
     * @dev Allows an individual to embark on a specific quest of a journey.
     * @param _questId The quest to embark on.
     */
    function embark(uint256 _questId) external {
        /// @dev Confirm the journey is still active.
        require(
            journey.start >= block.timestamp && journey.end <= block.timestamp,
            "Hero: Journey must be active to embark"
        );

        /// @dev Load in the quest.
        Quest memory quest = journey.quests[_questId];

        /// @dev Confirm the user has the required stops.
        require(
            _canCall(msg.sender, quest),
            "Hero: User does not have required stops"
        );

        /// @dev Execute the quest.
        (bool success, ) = quest.to.call{value: quest.value}(quest.data);

        /// @dev Confirm the quest was successful.
        require(success, "Hero: Quest failed");

        /// @dev TODO: Implement the reward systems.

        /// @dev Reward the user.
        for (uint256 i; i < quest.rewards.length; i++) {
            /// @dev Load in the reward.
            Reward memory reward = quest.rewards[i];

            /// @dev Transfer the reward.
            reward.token.safeTransfer(msg.sender, reward.amount);
        }

        /// @dev Mint the badge.
        journey.badgerOrganization.leaderMint(
            msg.sender,
            quest.badge.id,
            quest.badge.amount,
            ""
        );

        /// @dev Emit the event.
        emit QuestCompleted(
            address(this),
            msg.sender,
            _questId
        );
    }

    ////////////////////////////////////////////////////////
    ///                 INTERNAL GETTERS                 ///
    ////////////////////////////////////////////////////////

    /**
     * @dev Determines if a user has the required credentials to call a function.
     * @param user The user to check.
     * @return True if the user has the required credentials, false otherwise.
     */
    function _canCall(address user, Quest memory quest)
        internal
        view
        returns (bool)
    {
        /// @dev Load in the stack.
        uint256 carried;
        uint256 i;

        Stop[] memory stops = quest.stops;

        Stop memory stop;

        /// @dev Determine if the user has met the proper conditions of access.
        for (i; i < stops.length; i++) {
            /// @dev Step through the stops until we have enough carried or we run out.
            stop = stops[i];

            /// @dev If the user has sufficient balance, account for 1 carried.
            if (stop.badge.balanceOf(user, stop.id) >= stop.balance)
                carried++;
                /// @dev If the stop is required and balance is insufficient, we can't continue.
            else if (stop.mandatory == 1) return false;

            /// @dev Keep on swimming.
        }

        /// @dev Final check if no mandatory badges had an insufficient balance.
        return carried >= quest.stopsRequired;
    }
}
