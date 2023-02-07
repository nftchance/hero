// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

interface IBadger {
    /*//////////////////////////////////////////////////////////////
                                SCHEMAS
    //////////////////////////////////////////////////////////////*/

    /// @dev The structure of a Payment Token.
    struct PaymentToken {
        bytes32 paymentKey; /// @dev keccak256(abi.encodePacked(tokenAddress,tokenId));
        uint256 amount; /// @dev Amount needed per badge to claim.
    }

    /*//////////////////////////////////////////////////////////////
                                SETTERS
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Create a badge in the Organization.
     * @param _id The id of the badge being created.
     * @param _claimable Whether the badge is claimable or not.
     * @param _accountBound Whether or not the badge is account bound.
     * @param _signer The address of the signer.
     * @param _uri The URI for the badge.
     * @param _paymentToken The payment token for the badge.
     * @param _delegates The addresses of the delegates.
     */
    function setBadge(
        uint256 _id,
        bool _claimable,
        bool _accountBound,
        address _signer,
        string memory _uri,
        PaymentToken memory _paymentToken,
        address[] memory _delegates
    ) external;

    /**
     * @dev Allows the leader of a badge to mint the badge they are leading.
     * @param _to The address to mint the badge to.
     * @param _id The id of the badge to mint.
     * @param _amount The amount of the badge to mint.
     * @param _data The data to pass to the receiver.
     *
     * Requirements:
     * - `_msgSender` must be the leader of the badge.
     */
    function leaderMint(
        address _to,
        uint256 _id,
        uint256 _amount,
        bytes memory _data
    ) external;
}
