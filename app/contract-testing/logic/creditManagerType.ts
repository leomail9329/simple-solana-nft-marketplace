export type OccsManager = {
  "version": "0.1.0",
  "name": "occs_manager",
  "instructions": [
    {
      "name": "initOccsManagerState",
      "accounts": [
        {
          "name": "occsManagerState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "occsManagerOwner",
          "isMut": true,
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
          "name": "occs",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "transferOccsManagerOwnership",
      "accounts": [
        {
          "name": "occsManagerState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "occsManagerOwner",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "newOwner",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "closeOccsManagerState",
      "accounts": [
        {
          "name": "occsManagerState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "occsManagerOwner",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "increaseOccsScore",
      "accounts": [
        {
          "name": "userOccsState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programAccessState",
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
          "name": "tokenAlias",
          "type": "u8"
        },
        {
          "name": "score",
          "type": "u64"
        },
        {
          "name": "totalAmountTraded",
          "type": "u64"
        }
      ]
    },
    {
      "name": "decreaseOccsScore",
      "accounts": [
        {
          "name": "userOccsState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programAccessState",
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
          "name": "score",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "occsManagerOwnerShipState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "occsManagerOwner",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "usersOccsState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenAlias",
            "type": "u8"
          },
          {
            "name": "occsScore",
            "type": "u64"
          },
          {
            "name": "totalAmountTraded",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "PubKeyMismatched",
      "msg": "PubKey Mismatched"
    },
    {
      "code": 6001,
      "name": "NotACPICall",
      "msg": "Not A CPI Call"
    },
    {
      "code": 6002,
      "name": "InvalidAccess",
      "msg": "Invalid Access"
    }
  ]
};

export const IDL: OccsManager = {
  "version": "0.1.0",
  "name": "occs_manager",
  "instructions": [
    {
      "name": "initOccsManagerState",
      "accounts": [
        {
          "name": "occsManagerState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "occsManagerOwner",
          "isMut": true,
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
          "name": "occs",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "transferOccsManagerOwnership",
      "accounts": [
        {
          "name": "occsManagerState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "occsManagerOwner",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "newOwner",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "closeOccsManagerState",
      "accounts": [
        {
          "name": "occsManagerState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "occsManagerOwner",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "increaseOccsScore",
      "accounts": [
        {
          "name": "userOccsState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programAccessState",
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
          "name": "tokenAlias",
          "type": "u8"
        },
        {
          "name": "score",
          "type": "u64"
        },
        {
          "name": "totalAmountTraded",
          "type": "u64"
        }
      ]
    },
    {
      "name": "decreaseOccsScore",
      "accounts": [
        {
          "name": "userOccsState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "instructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programAccessState",
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
          "name": "score",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "occsManagerOwnerShipState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "occsManagerOwner",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "usersOccsState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenAlias",
            "type": "u8"
          },
          {
            "name": "occsScore",
            "type": "u64"
          },
          {
            "name": "totalAmountTraded",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "PubKeyMismatched",
      "msg": "PubKey Mismatched"
    },
    {
      "code": 6001,
      "name": "NotACPICall",
      "msg": "Not A CPI Call"
    },
    {
      "code": 6002,
      "name": "InvalidAccess",
      "msg": "Invalid Access"
    }
  ]
};
