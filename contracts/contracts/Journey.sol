// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

/// @dev Core dependencies.
import {JourneyFactory} from "./JourneyFactory.sol";

/// @dev Helpers.
import {IHerosJourney} from "./interfaces/IHerosJourney.sol";
import {IBadger} from "./interfaces/IBadger.sol";

/// @dev Tokens.
import {ERC20} from "solmate/src/tokens/ERC20.sol";

/// @dev Libraries.
import {SafeTransferLib} from "solmate/src/utils/SafeTransferLib.sol";

contract Journey is IHerosJourney {
    using SafeTransferLib for ERC20;

    ////////////////////////////////////////////////////////
    ///                      STATE                       ///
    ////////////////////////////////////////////////////////

    JourneyFactory public immutable factory;

    ////////////////////////////////////////////////////////
    ///                   CONSTRUCTOR                    ///
    ////////////////////////////////////////////////////////

    constructor() {
        /// @dev Load in the factory.
        factory = JourneyFactory(msg.sender);
    }

    ////////////////////////////////////////////////////////
    ///                     SETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * @dev Allows the caller of a journey to unpin it.
     */
    function unpinJourney() external {
        /// @dev Load in the journey.
        Adventure memory adventure = factory.getAdventure(address(this));

        /// @dev Confirm the user set the caller correctly.
        require(
            adventure.caller == msg.sender,
            "Hero: Journey caller must be msg.sender"
        );

        /// @dev Confirm the Journey is active.
        require(
            adventure.end >= block.timestamp,
            "Hero: Journey must be active to unpin"
        );

        /// @dev Prevent any future interactions with the journey.
        adventure.end = block.timestamp;

        /// @dev Transfer all the remaining rewards to the caller.
        for (uint256 i; i < adventure.quests.length; i++) {
            /// @dev Load the quest into the stack.
            Quest memory quest = adventure.quests[i];

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
        emit JourneyUnpinned();
    }

    /**
     * @dev Allows an individual to embark on a specific quest of a journey.
     * @param _questId The quest to embark on.
     */
    function embark(uint256 _questId) external payable {
        /// @dev Load in the journey.
        Adventure memory adventure = factory.getAdventure(address(this));

        /// @dev Confirm the journey is still active.
        require(
            adventure.start >= block.timestamp && adventure.end <= block.timestamp,
            "Hero: Journey must be active to embark"
        );

        /// @dev Load in the quest.
        Quest memory quest = adventure.quests[_questId];

        /// @dev Confirm the user has the required stops.
        require(
            _canCall(msg.sender, quest.stops, quest.stopsRequired),
            "Hero: User does not have required stops"
        );

        /// @dev Call the function that was prepared by the Journey creator.
        for (uint256 i; i < quest.transactions.length; i++) {
            /// @dev Load in the transaction.
            Transaction memory transaction = quest.transactions[i];

            /// @dev Call the transaction.
            (bool success, ) = transaction.target.call{
                value: transaction.value
            }(transaction.data);

            /// @dev Confirm the transaction was successful.
            require(success, "Hero: Transaction failed");
        }

        /// @dev Reward the user.
        for (uint256 i; i < quest.rewards.length; i++) {
            /// @dev Load in the reward.
            Reward memory reward = quest.rewards[i];

            /// @dev Transfer the reward.
            reward.token.safeTransfer(msg.sender, reward.amount);
        }

        /// @dev Mint the badge.
        adventure.badgerOrganization.leaderMint(
            msg.sender,
            quest.badge.id,
            quest.badge.amount,
            ""
        );

        /// @dev Emit the event.
        emit QuestCompleted(msg.sender, _questId);
    }

    ////////////////////////////////////////////////////////
    ///                 INTERNAL GETTERS                 ///
    ////////////////////////////////////////////////////////

    /**
     * @dev Determines if a user has the required credentials to call a function.
     * @param user The user to check.
     * @param stops The stops to check.
     * @param stopsRequired The number of stops required.
     * @return True if the user has the required credentials, false otherwise.
     */
    function _canCall(
        address user,
        Stop[] memory stops,
        uint256 stopsRequired
    ) internal view returns (bool) {
        /// @dev Load in the stack.
        uint256 carried;
        uint256 i;

        /// @dev Load a hot slot for the active stop.
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
        return carried >= stopsRequired;
    }
}
