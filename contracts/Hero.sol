// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import {IHero} from "./IHero.sol";

contract Hero is IHero {
    ////////////////////////////////////////////////////////
    ///                      STATE                       ///
    ////////////////////////////////////////////////////////

    /// @dev Keep track of how many journeys there have been.
    uint256 public totalJourneys;

    /// @dev Store the journey -- The chain *is* a database :(
    mapping(uint256 => Journey) public journeys;

    ////////////////////////////////////////////////////////
    ///                     SETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * @dev Allows any individual to permissionlessly start a journey.
     * @param journey The journey to start.
     */
    function pinJourney(Journey memory journey) external {
        /// @dev Store the journey.
        journeys[totalJourneys++] = journey;

        /// @dev Confirm the user set the caller correctly.
        require(
            journey.caller == msg.sender,
            "Hero: Journey caller must be msg.sender"
        );

        /// @dev Emit the event.
        emit JourneyPinned(
            journey.caller,
            totalJourneys - 1,
            journey.start,
            journey.end
        );
    }

    /**
     * @dev Allows the caller of a journey to unpin it.
     * @param _journeyId The journey to unpin.
     */
    function unpinJourney(uint256 _journeyId) external {
        /// @dev Load in the stack.
        Journey storage journey = journeys[_journeyId];

        /// @dev Confirm the user set the caller correctly.
        require(
            journey.caller == msg.sender,
            "Hero: Journey caller must be msg.sender"
        );

        /// @dev Prevent any future interactions with the journey.
        journey.end = block.timestamp;

        /// @dev Emit the event.
        emit JourneyUnpinned(
            journey.caller,
            _journeyId,
            journey.start,
            journey.end
        );
    }

    /**
     * @dev Allows an individual to embark on a specific quest of a journey.
     * @param _journeyId The journey to embark on.
     * @param _questId The quest to embark on.
     */
    function embark(uint256 _journeyId, uint256 _questId) external {
        /// @dev Load in the stack.
        Journey memory journey = journeys[_journeyId];

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

        /// @dev Reward the user.
        for (uint256 i; i < quest.rewards.length; i++) {
            /// @dev Load in the reward.
            Reward memory reward = quest.rewards[i];

            /// @dev Transfer the reward.
            reward.token.safeTransferFrom(
                address(this),
                msg.sender,
                reward.id,
                reward.amount,
                ""
            );
        }

        /// @dev Emit the event.
        emit QuestEmbarked(
            msg.sender,
            _journeyId,
            _questId,
            quest.to,
            quest.data,
            quest.value,
            quest.stopsRequired
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
    function _canCall(
        address user,
        Quest memory quest
    ) internal view returns (bool) {
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
