// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

/// @dev Core dependencies.
import {IHerosJourney} from "./IHerosJourney.sol";
import {IBadger} from "./IBadger.sol";

/// @dev Helpers.
import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Bulletin is IHerosJourney {
    using Clones for address;
    using SafeERC20 for IERC20;

    ////////////////////////////////////////////////////////
    ///                      STATE                       ///
    ////////////////////////////////////////////////////////

    /// @dev The address of the implementation.
    address public journeySingleton;

    /// @dev The number of journeys.
    uint256 journeys;

    /// @dev Hotspot for the last pinned journey.
    Journey public journey;

    /// @dev An empty payment token as minting is action-gated.
    IBadger.PaymentToken public NULL_PAYMENT_TOKEN =
        IBadger.PaymentToken({paymentKey: bytes32(0), amount: 0});

    ////////////////////////////////////////////////////////
    ///                     SETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * @dev Allows any individual to permissionlessly start a journey.
     * @param _journey The journey to start.
     */
    function pinJourney(Journey memory _journey) external {
        /// @dev Confirm the user set the caller correctly.
        require(
            _journey.caller == msg.sender,
            "Hero: Journey caller must be msg.sender"
        );

        /// @dev Save the journey.
        journey = _journey;

        /// @dev Instantiate the 'delegates' for the journey.
        address heroAddress = journeySingleton.clone();

        /// @dev Load the stack.
        uint256 i;

        /// @dev Loop through all of the quests and instantiate the badges.
        for (i = 0; i < journey.quests.length; i++) {
            Quest memory quest = journey.quests[i];

            /// @dev Transfer all of the rewards to the Journey.
            for (uint256 j; j < quest.rewards.length; j++) {
                /// @dev Get the reward out of memory due to depth.
                Reward memory reward = quest.rewards[j];

                /// @dev Transfer the maximum compensation being offered for the Journey.
                reward.token.safeTransferFrom(
                    msg.sender,
                    address(this),
                    reward.amount
                );
            }

            /// @dev Manage the badge if the quest has an integrated organization.
            if (journey.badgerOrganization != IBadger(address(0))) {
                /// @dev Get the badge out of memory due to depth.
                Badge memory badge = quest.badge;

                /// @dev Append the hero address to the list of delegates of this badge.
                badge.delegates[badge.delegates.length] = heroAddress;

                /// @dev Set the ID of the badge.
                badge.id = journeys++;

                /// @dev Create the badge in the Badger organization.
                journey.badgerOrganization.setBadge(
                    badge.id, /// ------------------ @dev The ID of the journey (badge).
                    false, /// --------------------- @dev The badge is not claimable.
                    badge.accountBound, /// -------- @dev The badge is account bound.
                    address(0), /// ---------------- @dev The signer of minting: N/A.
                    badge.uri, /// ----------------- @dev The URI of the quest and the badge.
                    NULL_PAYMENT_TOKEN, /// -------- @dev The payment token: N/A.
                    badge.delegates /// ------------ @dev The delegates of the journey.
                );
            }
        }

        /// @dev Emit the creation of the journey.
        emit JourneyPinned(
            heroAddress,
            journey.caller,
            journey.start,
            journey.end
        );
    }

    ////////////////////////////////////////////////////////
    ///                     GETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * @dev Enables contracts to get the last pinned journey.
     */
    function getJourney() external view returns (Journey memory) {
        return journey;
    }
}
