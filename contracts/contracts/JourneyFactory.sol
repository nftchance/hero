// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

/// @dev Core dependencies.
import {Journey} from "./Journey.sol";

/// @dev Helpers.
import {IHerosJourney} from "./interfaces/IHerosJourney.sol";
import {IBadger} from "./interfaces/IBadger.sol";

/// @dev Tokens
import {ERC20} from "solmate/src/tokens/ERC20.sol";

/// @dev Libraries.
import {Bytes32AddressLib} from "solmate/src/utils/Bytes32AddressLib.sol";
import {SafeTransferLib} from "solmate/src/utils/SafeTransferLib.sol";

contract JourneyFactory is IHerosJourney {
    using Bytes32AddressLib for address;
    using Bytes32AddressLib for bytes32;

    using SafeTransferLib for ERC20;

    ////////////////////////////////////////////////////////
    ///                      STATE                       ///
    ////////////////////////////////////////////////////////

    /// @dev The number of journeys.
    uint256 adventureCount;

    /// @dev Keeping track of the adventures inside a journey.
    mapping(address => Adventure) public journeyAddressToAdventure;

    /// @dev An empty payment token as minting is action-gated.
    IBadger.PaymentToken public NULL_PAYMENT_TOKEN =
        IBadger.PaymentToken({paymentKey: bytes32(0), amount: 0});

    ////////////////////////////////////////////////////////
    ///                     SETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * @dev Allows any individual to permissionlessly start a journey.
     * @param _adventure The journey to start.
     */
    function pinJourney(Adventure calldata _adventure)
        external
        returns (Journey journey, uint256 journeyId)
    {
        /// @dev Confirm the user set the caller correctly.
        require(
            _adventure.caller == msg.sender,
            "Hero: Adventure caller must be msg.sender"
        );

        /// @dev Calculate the journey id.
        unchecked {
            journeyId = adventureCount + 1;
        }

        /// @dev Deploy the new clone.
        journey = new Journey{salt: bytes32(journeyId)}();

        /// @dev Get the address of the Journey deployed.
        address journeyAddress = address(journey);

        /// @dev Save the journey.
        journeyAddressToAdventure[journeyAddress] = _adventure;

        /// @dev Loop through all of the quests and instantiate the badges.
        for (uint256 i; i < _adventure.quests.length; i++) {
            Quest memory quest = _adventure.quests[i];

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
            if (_adventure.badgerOrganization != IBadger(address(0))) {
                /// @dev Get the badge out of memory due to depth.
                Badge memory badge = quest.badge;

                /// @dev Append the hero address to the list of delegates of this badge.
                badge.delegates[badge.delegates.length] = journeyAddress;

                /// @dev Set the ID of the badge.
                /// @notice If we overflow here, congratulations, you've minted 2^256 badges.
                unchecked {
                    badge.id = adventureCount++;
                }

                /// @dev Create the badge in the Badger organization.
                _adventure.badgerOrganization.setBadge(
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
            journey,
            _adventure.caller,
            _adventure.start,
            _adventure.end
        );
    }

    ////////////////////////////////////////////////////////
    ///                     GETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * @dev Determines the address of a journey given its id.
     * @param _journeyId The id of the journey.
     * @return The address of the journey.
     */
    function getJourney(uint256 _journeyId) external view returns (Journey) {
        return
            Journey(
                payable(
                    keccak256(
                        abi.encodePacked(
                            /// @dev Prefix.
                            bytes1(0xff),
                            /// @dev Address of this contract.
                            address(this),
                            /// @dev Salt.
                            bytes32(_journeyId),
                            /// @dev Hash of the contract init code.
                            keccak256(
                                abi.encodePacked(
                                    /// @dev Deployment bytecode.
                                    type(Journey).creationCode
                                )
                            )
                        )
                    ).fromLast20Bytes() /// @dev Convert the CREATE2 hash into an address.
                )
            );
    }

    /**
     * @dev Gets the adventure of a deployed journey.
     * @param _journey The address of the journey.
     * @return The adventure of the journey.
     */
    function getAdventure(address _journey)
        external
        view
        returns (Adventure memory)
    {
        return journeyAddressToAdventure[_journey];
    }
}
