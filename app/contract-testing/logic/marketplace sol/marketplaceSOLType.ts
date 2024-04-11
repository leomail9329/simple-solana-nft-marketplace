export type MarketplaceSol = {
  "version": "0.1.0",
  "name": "marketplace_sol",
  "instructions": [
    {
      "name": "list",
      "accounts": [
        {
          "name": "listingState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "seller",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "prgramNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "allowedRoyalty",
          "type": "u16"
        }
      ]
    },
    {
      "name": "updateListing",
      "accounts": [
        {
          "name": "listingState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "seller",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "allowedRoyalty",
          "type": "u16"
        }
      ]
    },
    {
      "name": "cancelListing",
      "accounts": [
        {
          "name": "listingState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "seller",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "prgramNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programNftPdaOwner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "buyNow",
      "accounts": [
        {
          "name": "listingState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerTradeStateMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerTradeStateMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "seller",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "prgramNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programNftPdaOwner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "teamMultisigVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "traderVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programAccessState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "historyManager",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerEveryDayTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerEveryDayTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketEveryDayTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "occsManager",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerOccsState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerOccsState",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "endDayTimestamp",
          "type": "u64"
        }
      ]
    },
    {
      "name": "fundWithdrawPdaWallet",
      "accounts": [
        {
          "name": "userPdaWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "mode",
          "type": "u8"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "makeOffer",
      "accounts": [
        {
          "name": "listingState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "offerState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerPdaWallet",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "seller",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "offerAmount",
          "type": "u64"
        },
        {
          "name": "endtime",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateOffer",
      "accounts": [
        {
          "name": "listingState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "offerState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerPdaWallet",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "seller",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "offerAmount",
          "type": "u64"
        },
        {
          "name": "endtime",
          "type": "u64"
        }
      ]
    },
    {
      "name": "closeOffer",
      "accounts": [
        {
          "name": "listingState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "offerState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "seller",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "acceptOffer",
      "accounts": [
        {
          "name": "listingState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "offerState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerTradeStateMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerTradeStateMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerPdaWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "seller",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "prgramNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programNftPdaOwner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "teamMultisigVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "traderVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programAccessState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "historyManager",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerEveryDayTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerEveryDayTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketEveryDayTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "occsManager",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerOccsState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerOccsState",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "endDayTimestamp",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createDirectOffer",
      "accounts": [
        {
          "name": "directOfferState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "seller",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyerPdaWallet",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerNftAta",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "offeredAmount",
          "type": "u64"
        },
        {
          "name": "endtime",
          "type": "u64"
        }
      ]
    },
    {
      "name": "closeDirectOffer",
      "accounts": [
        {
          "name": "directOfferState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "acceptDirectOffer",
      "accounts": [
        {
          "name": "directOfferState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerTradeStateMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerTradeStateMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "seller",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyerPdaWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "teamMultisigVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "traderVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programAccessState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "historyManager",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerEveryDayTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerEveryDayTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketEveryDayTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "occsManager",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerOccsState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerOccsState",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "allowedRoyalty",
          "type": "u16"
        },
        {
          "name": "endDayTimestamp",
          "type": "u64"
        }
      ]
    },
    {
      "name": "claimReward",
      "accounts": [
        {
          "name": "userEveydayTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketEverydayTradeState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTradeStateMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "traderVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "endDayTimestamp",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "listingState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isSold",
            "type": "bool"
          },
          {
            "name": "allowedRoyalty",
            "type": "u16"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "seller",
            "type": "publicKey"
          },
          {
            "name": "nftMetadata",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "offerState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isExpired",
            "type": "bool"
          },
          {
            "name": "endtime",
            "type": "u64"
          },
          {
            "name": "offeredAmount",
            "type": "u64"
          },
          {
            "name": "buyer",
            "type": "publicKey"
          },
          {
            "name": "listingState",
            "type": "publicKey"
          },
          {
            "name": "seller",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "directOfferState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isExpired",
            "type": "bool"
          },
          {
            "name": "endtime",
            "type": "u64"
          },
          {
            "name": "offeredAmount",
            "type": "u64"
          },
          {
            "name": "nftMetadata",
            "type": "publicKey"
          },
          {
            "name": "buyer",
            "type": "publicKey"
          },
          {
            "name": "seller",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "marketplaceState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marketplaceOwner",
            "type": "publicKey"
          },
          {
            "name": "occsManager",
            "type": "publicKey"
          },
          {
            "name": "historyManager",
            "type": "publicKey"
          },
          {
            "name": "teamMultisigVault",
            "type": "publicKey"
          },
          {
            "name": "traderVault",
            "type": "publicKey"
          },
          {
            "name": "stakingVault",
            "type": "publicKey"
          },
          {
            "name": "accessManager",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "userTradeStateMetadata",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isClaimed",
            "type": "bool"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidOptionRoyaltyValue",
      "msg": "Invalid Option Royalty Value"
    },
    {
      "code": 6001,
      "name": "MinimumListingConstaint",
      "msg": "Minimum Listing Constaint"
    },
    {
      "code": 6002,
      "name": "PubKeyMismatched",
      "msg": "PubKey Mismatched"
    },
    {
      "code": 6003,
      "name": "InvalidATA",
      "msg": "Invalid ATA"
    },
    {
      "code": 6004,
      "name": "InvalidOfferAmount",
      "msg": "Invalid Offer Amount"
    },
    {
      "code": 6005,
      "name": "InvalidListing",
      "msg": "Invalid Listing"
    },
    {
      "code": 6006,
      "name": "InvalidOffer",
      "msg": "Invalid Offer"
    },
    {
      "code": 6007,
      "name": "InsufficientFunds",
      "msg": "Insufficient Funds"
    },
    {
      "code": 6008,
      "name": "InvalidTimestamp",
      "msg": "Invalid Timestamp"
    },
    {
      "code": 6009,
      "name": "OfferExpired",
      "msg": "Offer Expired"
    },
    {
      "code": 6010,
      "name": "TokenAccountNotInit",
      "msg": "TokenAccount Not Init"
    },
    {
      "code": 6011,
      "name": "InvalidRewardClaimAccount",
      "msg": "Invalid Reward Claim Account"
    },
    {
      "code": 6012,
      "name": "InvalidClaimTimestamp",
      "msg": "Invalid Claim Timestamp"
    },
    {
      "code": 6013,
      "name": "InvalidClaimAccount",
      "msg": "Invalid Claim Account"
    }
  ]
};

export const IDL: MarketplaceSol = {
  "version": "0.1.0",
  "name": "marketplace_sol",
  "instructions": [
    {
      "name": "list",
      "accounts": [
        {
          "name": "listingState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "seller",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "prgramNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "allowedRoyalty",
          "type": "u16"
        }
      ]
    },
    {
      "name": "updateListing",
      "accounts": [
        {
          "name": "listingState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "seller",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "allowedRoyalty",
          "type": "u16"
        }
      ]
    },
    {
      "name": "cancelListing",
      "accounts": [
        {
          "name": "listingState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "seller",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "prgramNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programNftPdaOwner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "buyNow",
      "accounts": [
        {
          "name": "listingState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerTradeStateMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerTradeStateMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "seller",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "prgramNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programNftPdaOwner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "teamMultisigVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "traderVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programAccessState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "historyManager",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerEveryDayTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerEveryDayTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketEveryDayTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "occsManager",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerOccsState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerOccsState",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "endDayTimestamp",
          "type": "u64"
        }
      ]
    },
    {
      "name": "fundWithdrawPdaWallet",
      "accounts": [
        {
          "name": "userPdaWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "mode",
          "type": "u8"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "makeOffer",
      "accounts": [
        {
          "name": "listingState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "offerState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerPdaWallet",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "seller",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "offerAmount",
          "type": "u64"
        },
        {
          "name": "endtime",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateOffer",
      "accounts": [
        {
          "name": "listingState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "offerState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerPdaWallet",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "seller",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "offerAmount",
          "type": "u64"
        },
        {
          "name": "endtime",
          "type": "u64"
        }
      ]
    },
    {
      "name": "closeOffer",
      "accounts": [
        {
          "name": "listingState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "offerState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "seller",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "acceptOffer",
      "accounts": [
        {
          "name": "listingState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "offerState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerTradeStateMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerTradeStateMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerPdaWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "seller",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "prgramNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "programNftPdaOwner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "teamMultisigVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "traderVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programAccessState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "historyManager",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerEveryDayTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerEveryDayTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketEveryDayTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "occsManager",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerOccsState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerOccsState",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "endDayTimestamp",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createDirectOffer",
      "accounts": [
        {
          "name": "directOfferState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "seller",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyerPdaWallet",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerNftAta",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "offeredAmount",
          "type": "u64"
        },
        {
          "name": "endtime",
          "type": "u64"
        }
      ]
    },
    {
      "name": "closeDirectOffer",
      "accounts": [
        {
          "name": "directOfferState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "acceptDirectOffer",
      "accounts": [
        {
          "name": "directOfferState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerTradeStateMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerTradeStateMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "seller",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyerPdaWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "teamMultisigVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "traderVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgramId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programAccessState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "historyManager",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerEveryDayTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerEveryDayTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketEveryDayTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "occsManager",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sellerOccsState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerOccsState",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "allowedRoyalty",
          "type": "u16"
        },
        {
          "name": "endDayTimestamp",
          "type": "u64"
        }
      ]
    },
    {
      "name": "claimReward",
      "accounts": [
        {
          "name": "userEveydayTradeState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketEverydayTradeState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTradeStateMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "traderVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "endDayTimestamp",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "listingState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isSold",
            "type": "bool"
          },
          {
            "name": "allowedRoyalty",
            "type": "u16"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "seller",
            "type": "publicKey"
          },
          {
            "name": "nftMetadata",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "offerState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isExpired",
            "type": "bool"
          },
          {
            "name": "endtime",
            "type": "u64"
          },
          {
            "name": "offeredAmount",
            "type": "u64"
          },
          {
            "name": "buyer",
            "type": "publicKey"
          },
          {
            "name": "listingState",
            "type": "publicKey"
          },
          {
            "name": "seller",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "directOfferState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isExpired",
            "type": "bool"
          },
          {
            "name": "endtime",
            "type": "u64"
          },
          {
            "name": "offeredAmount",
            "type": "u64"
          },
          {
            "name": "nftMetadata",
            "type": "publicKey"
          },
          {
            "name": "buyer",
            "type": "publicKey"
          },
          {
            "name": "seller",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "marketplaceState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marketplaceOwner",
            "type": "publicKey"
          },
          {
            "name": "occsManager",
            "type": "publicKey"
          },
          {
            "name": "historyManager",
            "type": "publicKey"
          },
          {
            "name": "teamMultisigVault",
            "type": "publicKey"
          },
          {
            "name": "traderVault",
            "type": "publicKey"
          },
          {
            "name": "stakingVault",
            "type": "publicKey"
          },
          {
            "name": "accessManager",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "userTradeStateMetadata",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isClaimed",
            "type": "bool"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidOptionRoyaltyValue",
      "msg": "Invalid Option Royalty Value"
    },
    {
      "code": 6001,
      "name": "MinimumListingConstaint",
      "msg": "Minimum Listing Constaint"
    },
    {
      "code": 6002,
      "name": "PubKeyMismatched",
      "msg": "PubKey Mismatched"
    },
    {
      "code": 6003,
      "name": "InvalidATA",
      "msg": "Invalid ATA"
    },
    {
      "code": 6004,
      "name": "InvalidOfferAmount",
      "msg": "Invalid Offer Amount"
    },
    {
      "code": 6005,
      "name": "InvalidListing",
      "msg": "Invalid Listing"
    },
    {
      "code": 6006,
      "name": "InvalidOffer",
      "msg": "Invalid Offer"
    },
    {
      "code": 6007,
      "name": "InsufficientFunds",
      "msg": "Insufficient Funds"
    },
    {
      "code": 6008,
      "name": "InvalidTimestamp",
      "msg": "Invalid Timestamp"
    },
    {
      "code": 6009,
      "name": "OfferExpired",
      "msg": "Offer Expired"
    },
    {
      "code": 6010,
      "name": "TokenAccountNotInit",
      "msg": "TokenAccount Not Init"
    },
    {
      "code": 6011,
      "name": "InvalidRewardClaimAccount",
      "msg": "Invalid Reward Claim Account"
    },
    {
      "code": 6012,
      "name": "InvalidClaimTimestamp",
      "msg": "Invalid Claim Timestamp"
    },
    {
      "code": 6013,
      "name": "InvalidClaimAccount",
      "msg": "Invalid Claim Account"
    }
  ]
};
