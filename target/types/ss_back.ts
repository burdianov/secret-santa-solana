/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/ss_back.json`.
 */
export type SsBack = {
  "address": "BBsq6t16qU2Bs1CCgLVWPpmPn2DhkqqCAYxFRR4pwAKx",
  "metadata": {
    "name": "ssBack",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "addParticipant",
      "discriminator": [
        153,
        137,
        99,
        142,
        169,
        212,
        240,
        50
      ],
      "accounts": [
        {
          "name": "participant",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  114,
                  116,
                  105,
                  99,
                  105,
                  112,
                  97,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "organizer"
              },
              {
                "kind": "arg",
                "path": "partyId"
              },
              {
                "kind": "arg",
                "path": "participantId"
              }
            ]
          }
        },
        {
          "name": "party",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  114,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "organizer"
              },
              {
                "kind": "arg",
                "path": "partyId"
              }
            ]
          }
        },
        {
          "name": "organizer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "partyId",
          "type": "u32"
        },
        {
          "name": "participantId",
          "type": "string"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "email",
          "type": "string"
        }
      ]
    },
    {
      "name": "assignRecipient",
      "discriminator": [
        243,
        246,
        34,
        107,
        201,
        48,
        183,
        156
      ],
      "accounts": [
        {
          "name": "participant",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  114,
                  116,
                  105,
                  99,
                  105,
                  112,
                  97,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "organizer"
              },
              {
                "kind": "arg",
                "path": "partyId"
              },
              {
                "kind": "arg",
                "path": "participantId"
              }
            ]
          }
        },
        {
          "name": "party",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  114,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "organizer"
              },
              {
                "kind": "arg",
                "path": "partyId"
              }
            ]
          }
        },
        {
          "name": "organizer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "partyId",
          "type": "u32"
        },
        {
          "name": "participantId",
          "type": "string"
        },
        {
          "name": "recipientId",
          "type": "string"
        }
      ]
    },
    {
      "name": "createParty",
      "discriminator": [
        251,
        84,
        246,
        151,
        106,
        204,
        201,
        22
      ],
      "accounts": [
        {
          "name": "party",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  114,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "organizer"
              },
              {
                "kind": "arg",
                "path": "partyId"
              }
            ]
          }
        },
        {
          "name": "parties",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  114,
                  116,
                  105,
                  101,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "organizer"
              }
            ]
          }
        },
        {
          "name": "organizer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "partyId",
          "type": "u32"
        },
        {
          "name": "location",
          "type": "string"
        },
        {
          "name": "date",
          "type": "i64"
        },
        {
          "name": "budget",
          "type": "string"
        }
      ]
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "parties",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  114,
                  116,
                  105,
                  101,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "organizer"
              }
            ]
          }
        },
        {
          "name": "organizer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "updateParticipant",
      "discriminator": [
        21,
        180,
        156,
        111,
        222,
        176,
        127,
        243
      ],
      "accounts": [
        {
          "name": "participant",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  114,
                  116,
                  105,
                  99,
                  105,
                  112,
                  97,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "organizer"
              },
              {
                "kind": "arg",
                "path": "partyId"
              },
              {
                "kind": "arg",
                "path": "participantId"
              }
            ]
          }
        },
        {
          "name": "party",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  114,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "organizer"
              },
              {
                "kind": "arg",
                "path": "partyId"
              }
            ]
          }
        },
        {
          "name": "organizer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "partyId",
          "type": "u32"
        },
        {
          "name": "participantId",
          "type": "string"
        },
        {
          "name": "recipientId",
          "type": "string"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "email",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateParty",
      "discriminator": [
        252,
        43,
        155,
        138,
        59,
        72,
        147,
        228
      ],
      "accounts": [
        {
          "name": "party",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  114,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "organizer"
              },
              {
                "kind": "arg",
                "path": "partyId"
              }
            ]
          }
        },
        {
          "name": "organizer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "partyId",
          "type": "u32"
        },
        {
          "name": "location",
          "type": "string"
        },
        {
          "name": "date",
          "type": "i64"
        },
        {
          "name": "budget",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "participant",
      "discriminator": [
        32,
        142,
        108,
        79,
        247,
        179,
        54,
        6
      ]
    },
    {
      "name": "parties",
      "discriminator": [
        109,
        194,
        171,
        101,
        24,
        96,
        110,
        61
      ]
    },
    {
      "name": "party",
      "discriminator": [
        208,
        64,
        165,
        146,
        114,
        138,
        161,
        100
      ]
    }
  ],
  "types": [
    {
      "name": "participant",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "participantId",
            "type": "string"
          },
          {
            "name": "recipientId",
            "type": "string"
          },
          {
            "name": "partyId",
            "type": "u32"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "email",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "parties",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "count",
            "type": "u32"
          },
          {
            "name": "partiesList",
            "type": {
              "vec": "u32"
            }
          }
        ]
      }
    },
    {
      "name": "party",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "partyId",
            "type": "u32"
          },
          {
            "name": "organizer",
            "type": "pubkey"
          },
          {
            "name": "location",
            "type": "string"
          },
          {
            "name": "date",
            "type": "i64"
          },
          {
            "name": "budget",
            "type": "string"
          },
          {
            "name": "participants",
            "type": {
              "vec": "string"
            }
          }
        ]
      }
    }
  ]
};
