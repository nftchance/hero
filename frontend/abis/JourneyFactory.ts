export const JourneyFactoryAbi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "hero",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "caller",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "start",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "end",
                "type": "uint256"
            }
        ],
        "name": "JourneyPinned",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "hero",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "caller",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "start",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "end",
                "type": "uint256"
            }
        ],
        "name": "JourneyUnpinned",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "hero",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "caller",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "questId",
                "type": "uint256"
            }
        ],
        "name": "QuestCompleted",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "NULL_PAYMENT_TOKEN",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "paymentKey",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_journey",
                "type": "address"
            }
        ],
        "name": "getJourney",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "contract IBadger",
                        "name": "badgerOrganization",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "caller",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "start",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "end",
                        "type": "uint256"
                    },
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "to",
                                "type": "address"
                            },
                            {
                                "internalType": "bytes",
                                "name": "data",
                                "type": "bytes"
                            },
                            {
                                "internalType": "uint256",
                                "name": "value",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "max",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "stopsRequired",
                                "type": "uint256"
                            },
                            {
                                "components": [
                                    {
                                        "internalType": "contract IERC1155",
                                        "name": "badge",
                                        "type": "address"
                                    },
                                    {
                                        "internalType": "uint8",
                                        "name": "mandatory",
                                        "type": "uint8"
                                    },
                                    {
                                        "internalType": "uint256",
                                        "name": "id",
                                        "type": "uint256"
                                    },
                                    {
                                        "internalType": "uint256",
                                        "name": "balance",
                                        "type": "uint256"
                                    }
                                ],
                                "internalType": "struct IHerosJourney.Stop[]",
                                "name": "stops",
                                "type": "tuple[]"
                            },
                            {
                                "components": [
                                    {
                                        "internalType": "address",
                                        "name": "target",
                                        "type": "address"
                                    },
                                    {
                                        "internalType": "bytes",
                                        "name": "data",
                                        "type": "bytes"
                                    },
                                    {
                                        "internalType": "uint256",
                                        "name": "value",
                                        "type": "uint256"
                                    }
                                ],
                                "internalType": "struct IHerosJourney.Transaction[]",
                                "name": "transactions",
                                "type": "tuple[]"
                            },
                            {
                                "components": [
                                    {
                                        "internalType": "contract IERC20",
                                        "name": "token",
                                        "type": "address"
                                    },
                                    {
                                        "internalType": "uint256",
                                        "name": "id",
                                        "type": "uint256"
                                    },
                                    {
                                        "internalType": "uint256",
                                        "name": "amount",
                                        "type": "uint256"
                                    }
                                ],
                                "internalType": "struct IHerosJourney.Reward[]",
                                "name": "rewards",
                                "type": "tuple[]"
                            },
                            {
                                "components": [
                                    {
                                        "internalType": "bool",
                                        "name": "accountBound",
                                        "type": "bool"
                                    },
                                    {
                                        "internalType": "uint256",
                                        "name": "id",
                                        "type": "uint256"
                                    },
                                    {
                                        "internalType": "uint256",
                                        "name": "amount",
                                        "type": "uint256"
                                    },
                                    {
                                        "internalType": "string",
                                        "name": "uri",
                                        "type": "string"
                                    },
                                    {
                                        "internalType": "address[]",
                                        "name": "delegates",
                                        "type": "address[]"
                                    }
                                ],
                                "internalType": "struct IHerosJourney.Badge",
                                "name": "badge",
                                "type": "tuple"
                            }
                        ],
                        "internalType": "struct IHerosJourney.Quest[]",
                        "name": "quests",
                        "type": "tuple[]"
                    }
                ],
                "internalType": "struct IHerosJourney.Journey",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "journeySingleton",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "journeys",
        "outputs": [
            {
                "internalType": "contract IBadger",
                "name": "badgerOrganization",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "caller",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "start",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "end",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "contract IBadger",
                        "name": "badgerOrganization",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "caller",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "start",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "end",
                        "type": "uint256"
                    },
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "to",
                                "type": "address"
                            },
                            {
                                "internalType": "bytes",
                                "name": "data",
                                "type": "bytes"
                            },
                            {
                                "internalType": "uint256",
                                "name": "value",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "max",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "stopsRequired",
                                "type": "uint256"
                            },
                            {
                                "components": [
                                    {
                                        "internalType": "contract IERC1155",
                                        "name": "badge",
                                        "type": "address"
                                    },
                                    {
                                        "internalType": "uint8",
                                        "name": "mandatory",
                                        "type": "uint8"
                                    },
                                    {
                                        "internalType": "uint256",
                                        "name": "id",
                                        "type": "uint256"
                                    },
                                    {
                                        "internalType": "uint256",
                                        "name": "balance",
                                        "type": "uint256"
                                    }
                                ],
                                "internalType": "struct IHerosJourney.Stop[]",
                                "name": "stops",
                                "type": "tuple[]"
                            },
                            {
                                "components": [
                                    {
                                        "internalType": "address",
                                        "name": "target",
                                        "type": "address"
                                    },
                                    {
                                        "internalType": "bytes",
                                        "name": "data",
                                        "type": "bytes"
                                    },
                                    {
                                        "internalType": "uint256",
                                        "name": "value",
                                        "type": "uint256"
                                    }
                                ],
                                "internalType": "struct IHerosJourney.Transaction[]",
                                "name": "transactions",
                                "type": "tuple[]"
                            },
                            {
                                "components": [
                                    {
                                        "internalType": "contract IERC20",
                                        "name": "token",
                                        "type": "address"
                                    },
                                    {
                                        "internalType": "uint256",
                                        "name": "id",
                                        "type": "uint256"
                                    },
                                    {
                                        "internalType": "uint256",
                                        "name": "amount",
                                        "type": "uint256"
                                    }
                                ],
                                "internalType": "struct IHerosJourney.Reward[]",
                                "name": "rewards",
                                "type": "tuple[]"
                            },
                            {
                                "components": [
                                    {
                                        "internalType": "bool",
                                        "name": "accountBound",
                                        "type": "bool"
                                    },
                                    {
                                        "internalType": "uint256",
                                        "name": "id",
                                        "type": "uint256"
                                    },
                                    {
                                        "internalType": "uint256",
                                        "name": "amount",
                                        "type": "uint256"
                                    },
                                    {
                                        "internalType": "string",
                                        "name": "uri",
                                        "type": "string"
                                    },
                                    {
                                        "internalType": "address[]",
                                        "name": "delegates",
                                        "type": "address[]"
                                    }
                                ],
                                "internalType": "struct IHerosJourney.Badge",
                                "name": "badge",
                                "type": "tuple"
                            }
                        ],
                        "internalType": "struct IHerosJourney.Quest[]",
                        "name": "quests",
                        "type": "tuple[]"
                    }
                ],
                "internalType": "struct IHerosJourney.Journey",
                "name": "_journey",
                "type": "tuple"
            }
        ],
        "name": "pinJourney",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const