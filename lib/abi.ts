export const REMOTE_ACCOUNT_ABI = [
    {
      "type": "fallback",
      "stateMutability": "nonpayable"
    },
    {
      "type": "receive",
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "VERSION",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "addOwnerWithThreshold",
      "inputs": [
        {
          "name": "owner",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_threshold",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "approveHash",
      "inputs": [
        {
          "name": "hashToApprove",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "approvedHashes",
      "inputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "changeThreshold",
      "inputs": [
        {
          "name": "_threshold",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "checkNSignatures",
      "inputs": [
        {
          "name": "dataHash",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "data",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "signatures",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "requiredSignatures",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "checkNSignatures",
      "inputs": [
        {
          "name": "executor",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "dataHash",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "signatures",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "requiredSignatures",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "checkSignatures",
      "inputs": [
        {
          "name": "dataHash",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "data",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "signatures",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "checkSignatures",
      "inputs": [
        {
          "name": "executor",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "dataHash",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "signatures",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "disableModule",
      "inputs": [
        {
          "name": "prevModule",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "module",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "domainSeparator",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "enableModule",
      "inputs": [
        {
          "name": "module",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "endpointAddress",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "execTransaction",
      "inputs": [
        {
          "name": "to",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "value",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "data",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "operation",
          "type": "uint8",
          "internalType": "enum Enum.Operation"
        },
        {
          "name": "safeTxGas",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "baseGas",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "gasPrice",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "gasToken",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "refundReceiver",
          "type": "address",
          "internalType": "address payable"
        },
        {
          "name": "signatures",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [
        {
          "name": "success",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "execTransactionFromModule",
      "inputs": [
        {
          "name": "to",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "value",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "data",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "operation",
          "type": "uint8",
          "internalType": "enum Enum.Operation"
        }
      ],
      "outputs": [
        {
          "name": "success",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "execTransactionFromModuleReturnData",
      "inputs": [
        {
          "name": "to",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "value",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "data",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "operation",
          "type": "uint8",
          "internalType": "enum Enum.Operation"
        }
      ],
      "outputs": [
        {
          "name": "success",
          "type": "bool",
          "internalType": "bool"
        },
        {
          "name": "returnData",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "executeBatchStargate",
      "inputs": [
        {
          "name": "_stargateAddresses",
          "type": "address[]",
          "internalType": "address[]"
        },
        {
          "name": "_sendParams",
          "type": "tuple[]",
          "internalType": "struct SendParam[]",
          "components": [
            {
              "name": "dstEid",
              "type": "uint32",
              "internalType": "uint32"
            },
            {
              "name": "to",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "amountLD",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "minAmountLD",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "extraOptions",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "composeMsg",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "oftCmd",
              "type": "bytes",
              "internalType": "bytes"
            }
          ]
        },
        {
          "name": "_messagingFees",
          "type": "tuple[]",
          "internalType": "struct MessagingFee[]",
          "components": [
            {
              "name": "nativeFee",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "lzTokenFee",
              "type": "uint256",
              "internalType": "uint256"
            }
          ]
        },
        {
          "name": "_nativeAmounts",
          "type": "uint256[]",
          "internalType": "uint256[]"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "executeStargate",
      "inputs": [
        {
          "name": "_stargate",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_sendParam",
          "type": "tuple",
          "internalType": "struct SendParam",
          "components": [
            {
              "name": "dstEid",
              "type": "uint32",
              "internalType": "uint32"
            },
            {
              "name": "to",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "amountLD",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "minAmountLD",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "extraOptions",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "composeMsg",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "oftCmd",
              "type": "bytes",
              "internalType": "bytes"
            }
          ]
        },
        {
          "name": "_messagingFee",
          "type": "tuple",
          "internalType": "struct MessagingFee",
          "components": [
            {
              "name": "nativeFee",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "lzTokenFee",
              "type": "uint256",
              "internalType": "uint256"
            }
          ]
        },
        {
          "name": "_nativeAmount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "getModulesPaginated",
      "inputs": [
        {
          "name": "start",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "pageSize",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "array",
          "type": "address[]",
          "internalType": "address[]"
        },
        {
          "name": "next",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getOwners",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address[]",
          "internalType": "address[]"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getStorageAt",
      "inputs": [
        {
          "name": "offset",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "length",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getThreshold",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getTransactionHash",
      "inputs": [
        {
          "name": "to",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "value",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "data",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "operation",
          "type": "uint8",
          "internalType": "enum Enum.Operation"
        },
        {
          "name": "safeTxGas",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "baseGas",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "gasPrice",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "gasToken",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "refundReceiver",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_nonce",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "txHash",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "init",
      "inputs": [
        {
          "name": "_owner",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_endpointAddress",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_stargateAddresses",
          "type": "address[]",
          "internalType": "address[]"
        },
        {
          "name": "_tokenAddresses",
          "type": "address[]",
          "internalType": "address[]"
        },
        {
          "name": "_portalRouterAddress",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_stargateFee",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "isModuleEnabled",
      "inputs": [
        {
          "name": "module",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "isOwner",
      "inputs": [
        {
          "name": "owner",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "isStargate",
      "inputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "lzCompose",
      "inputs": [
        {
          "name": "_from",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_guid",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "_message",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "_executor",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_extraData",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "nonce",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "owner",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "portalRouterAddress",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "prepare",
      "inputs": [
        {
          "name": "_stargate",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_dstEid",
          "type": "uint32",
          "internalType": "uint32"
        },
        {
          "name": "_amount",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "_composer",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_composeMsg",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "_composeFunctionGasLimit",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "valueToSend",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "sendParam",
          "type": "tuple",
          "internalType": "struct SendParam",
          "components": [
            {
              "name": "dstEid",
              "type": "uint32",
              "internalType": "uint32"
            },
            {
              "name": "to",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "amountLD",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "minAmountLD",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "extraOptions",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "composeMsg",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "oftCmd",
              "type": "bytes",
              "internalType": "bytes"
            }
          ]
        },
        {
          "name": "messagingFee",
          "type": "tuple",
          "internalType": "struct MessagingFee",
          "components": [
            {
              "name": "nativeFee",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "lzTokenFee",
              "type": "uint256",
              "internalType": "uint256"
            }
          ]
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "removeOwner",
      "inputs": [
        {
          "name": "prevOwner",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "owner",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_threshold",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setFallbackHandler",
      "inputs": [
        {
          "name": "handler",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setGuard",
      "inputs": [
        {
          "name": "guard",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setModuleGuard",
      "inputs": [
        {
          "name": "moduleGuard",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setStargateFee",
      "inputs": [
        {
          "name": "_stargateFee",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setup",
      "inputs": [
        {
          "name": "_owners",
          "type": "address[]",
          "internalType": "address[]"
        },
        {
          "name": "_threshold",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "to",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "data",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "fallbackHandler",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "paymentToken",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "payment",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "paymentReceiver",
          "type": "address",
          "internalType": "address payable"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "signedMessages",
      "inputs": [
        {
          "name": "",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "simulateAndRevert",
      "inputs": [
        {
          "name": "targetContract",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "calldataPayload",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "stargateFee",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "stargateToToken",
      "inputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "swapOwner",
      "inputs": [
        {
          "name": "prevOwner",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "oldOwner",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "newOwner",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "AddedOwner",
      "inputs": [
        {
          "name": "owner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ApproveHash",
      "inputs": [
        {
          "name": "approvedHash",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "owner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ChangedFallbackHandler",
      "inputs": [
        {
          "name": "handler",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ChangedGuard",
      "inputs": [
        {
          "name": "guard",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ChangedModuleGuard",
      "inputs": [
        {
          "name": "moduleGuard",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ChangedThreshold",
      "inputs": [
        {
          "name": "threshold",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "DisabledModule",
      "inputs": [
        {
          "name": "module",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "EnabledModule",
      "inputs": [
        {
          "name": "module",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ExecutionFailure",
      "inputs": [
        {
          "name": "txHash",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "payment",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ExecutionFromModuleFailure",
      "inputs": [
        {
          "name": "module",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ExecutionFromModuleSuccess",
      "inputs": [
        {
          "name": "module",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ExecutionSuccess",
      "inputs": [
        {
          "name": "txHash",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "payment",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "RemovedOwner",
      "inputs": [
        {
          "name": "owner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "SafeReceived",
      "inputs": [
        {
          "name": "sender",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "value",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "SafeSetup",
      "inputs": [
        {
          "name": "initiator",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "owners",
          "type": "address[]",
          "indexed": false,
          "internalType": "address[]"
        },
        {
          "name": "threshold",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "initializer",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        },
        {
          "name": "fallbackHandler",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "SignMsg",
      "inputs": [
        {
          "name": "msgHash",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        }
      ],
      "anonymous": false
    },
    {
      "type": "error",
      "name": "InvalidOptionType",
      "inputs": [
        {
          "name": "optionType",
          "type": "uint16",
          "internalType": "uint16"
        }
      ]
    }
  ] as const;

// Contract ABI for getAccount function
export const REMOTE_ACCOUNT_FACTORY_ABI = [
    {
      "type": "constructor",
      "inputs": [
        {
          "name": "_stargate",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_endpoint",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_stargateAddresses",
          "type": "address[]",
          "internalType": "address[]"
        },
        {
          "name": "_tokenAddresses",
          "type": "address[]",
          "internalType": "address[]"
        },
        {
          "name": "_portalRouter",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_stargateFee",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "_implBytecode",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "deploy",
      "inputs": [
        {
          "name": "owner",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "deployedAddress",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "endpoint",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getAccount",
      "inputs": [
        {
          "name": "owner",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "implBytecode",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "portalRouter",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "setBytecode",
      "inputs": [
        {
          "name": "_implBytecode",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "stargate",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "stargateAddresses",
      "inputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "event",
      "name": "ContractDeployed",
      "inputs": [
        {
          "name": "deployedAddress",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "salt",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "DeploymentFailed",
      "inputs": [
        {
          "name": "salt",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "reason",
          "type": "string",
          "indexed": false,
          "internalType": "string"
        }
      ],
      "anonymous": false
    }
  ] as const;


  export const STARGATE_ABI = [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint8","name":"_sharedDecimals","type":"uint8"},{"internalType":"address","name":"_endpoint","type":"address"},{"internalType":"address","name":"_owner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"InvalidLocalDecimals","type":"error"},{"inputs":[],"name":"Path_AlreadyHasCredit","type":"error"},{"inputs":[],"name":"Path_InsufficientCredit","type":"error"},{"inputs":[],"name":"Path_UnlimitedCredit","type":"error"},{"inputs":[{"internalType":"uint256","name":"amountLD","type":"uint256"},{"internalType":"uint256","name":"minAmountLD","type":"uint256"}],"name":"SlippageExceeded","type":"error"},{"inputs":[],"name":"Stargate_InsufficientFare","type":"error"},{"inputs":[],"name":"Stargate_InvalidAmount","type":"error"},{"inputs":[],"name":"Stargate_InvalidPath","type":"error"},{"inputs":[],"name":"Stargate_InvalidTokenDecimals","type":"error"},{"inputs":[],"name":"Stargate_LzTokenUnavailable","type":"error"},{"inputs":[],"name":"Stargate_OutflowFailed","type":"error"},{"inputs":[],"name":"Stargate_Paused","type":"error"},{"inputs":[],"name":"Stargate_RecoverTokenUnsupported","type":"error"},{"inputs":[],"name":"Stargate_ReentrantCall","type":"error"},{"inputs":[],"name":"Stargate_SlippageTooHigh","type":"error"},{"inputs":[],"name":"Stargate_Unauthorized","type":"error"},{"inputs":[],"name":"Stargate_UnreceivedTokenNotFound","type":"error"},{"inputs":[],"name":"Transfer_ApproveFailed","type":"error"},{"inputs":[],"name":"Transfer_TransferFailed","type":"error"},{"anonymous":false,"inputs":[{"components":[{"internalType":"address","name":"feeLib","type":"address"},{"internalType":"address","name":"planner","type":"address"},{"internalType":"address","name":"treasurer","type":"address"},{"internalType":"address","name":"tokenMessaging","type":"address"},{"internalType":"address","name":"creditMessaging","type":"address"},{"internalType":"address","name":"lzToken","type":"address"}],"indexed":false,"internalType":"struct StargateBase.AddressConfig","name":"config","type":"tuple"}],"name":"AddressConfigSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint32","name":"srcEid","type":"uint32"},{"components":[{"internalType":"uint32","name":"srcEid","type":"uint32"},{"internalType":"uint64","name":"amount","type":"uint64"}],"indexed":false,"internalType":"struct Credit[]","name":"credits","type":"tuple[]"}],"name":"CreditsReceived","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint32","name":"dstEid","type":"uint32"},{"components":[{"internalType":"uint32","name":"srcEid","type":"uint32"},{"internalType":"uint64","name":"amount","type":"uint64"}],"indexed":false,"internalType":"struct Credit[]","name":"credits","type":"tuple[]"}],"name":"CreditsSent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint32","name":"dstEid","type":"uint32"},{"indexed":false,"internalType":"bool","name":"oft","type":"bool"}],"name":"OFTPathSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"guid","type":"bytes32"},{"indexed":false,"internalType":"uint32","name":"srcEid","type":"uint32"},{"indexed":true,"internalType":"address","name":"toAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amountReceivedLD","type":"uint256"}],"name":"OFTReceived","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"guid","type":"bytes32"},{"indexed":false,"internalType":"uint32","name":"dstEid","type":"uint32"},{"indexed":true,"internalType":"address","name":"fromAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amountSentLD","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountReceivedLD","type":"uint256"}],"name":"OFTSent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"paused","type":"bool"}],"name":"PauseSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"PlannerFeeWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint64","name":"amountSD","type":"uint64"}],"name":"TreasuryFeeAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint64","name":"amountSD","type":"uint64"}],"name":"TreasuryFeeWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes32","name":"guid","type":"bytes32"},{"indexed":false,"internalType":"uint8","name":"index","type":"uint8"},{"indexed":false,"internalType":"uint32","name":"srcEid","type":"uint32"},{"indexed":false,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"amountLD","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"composeMsg","type":"bytes"}],"name":"UnreceivedTokenCached","type":"event"},{"inputs":[{"internalType":"uint256","name":"_amountLD","type":"uint256"}],"name":"addTreasuryFee","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"approvalRequired","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"endpoint","outputs":[{"internalType":"contract ILayerZeroEndpointV2","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAddressConfig","outputs":[{"components":[{"internalType":"address","name":"feeLib","type":"address"},{"internalType":"address","name":"planner","type":"address"},{"internalType":"address","name":"treasurer","type":"address"},{"internalType":"address","name":"tokenMessaging","type":"address"},{"internalType":"address","name":"creditMessaging","type":"address"},{"internalType":"address","name":"lzToken","type":"address"}],"internalType":"struct StargateBase.AddressConfig","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTransferGasLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"localEid","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"oftVersion","outputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"},{"internalType":"uint64","name":"version","type":"uint64"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"eid","type":"uint32"}],"name":"paths","outputs":[{"internalType":"uint64","name":"credit","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"plannerFee","outputs":[{"internalType":"uint256","name":"available","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint32","name":"dstEid","type":"uint32"},{"internalType":"bytes32","name":"to","type":"bytes32"},{"internalType":"uint256","name":"amountLD","type":"uint256"},{"internalType":"uint256","name":"minAmountLD","type":"uint256"},{"internalType":"bytes","name":"extraOptions","type":"bytes"},{"internalType":"bytes","name":"composeMsg","type":"bytes"},{"internalType":"bytes","name":"oftCmd","type":"bytes"}],"internalType":"struct SendParam","name":"_sendParam","type":"tuple"}],"name":"quoteOFT","outputs":[{"components":[{"internalType":"uint256","name":"minAmountLD","type":"uint256"},{"internalType":"uint256","name":"maxAmountLD","type":"uint256"}],"internalType":"struct OFTLimit","name":"limit","type":"tuple"},{"components":[{"internalType":"int256","name":"feeAmountLD","type":"int256"},{"internalType":"string","name":"description","type":"string"}],"internalType":"struct OFTFeeDetail[]","name":"oftFeeDetails","type":"tuple[]"},{"components":[{"internalType":"uint256","name":"amountSentLD","type":"uint256"},{"internalType":"uint256","name":"amountReceivedLD","type":"uint256"}],"internalType":"struct OFTReceipt","name":"receipt","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint32","name":"dstEid","type":"uint32"},{"internalType":"bytes32","name":"to","type":"bytes32"},{"internalType":"uint256","name":"amountLD","type":"uint256"},{"internalType":"uint256","name":"minAmountLD","type":"uint256"},{"internalType":"bytes","name":"extraOptions","type":"bytes"},{"internalType":"bytes","name":"composeMsg","type":"bytes"},{"internalType":"bytes","name":"oftCmd","type":"bytes"}],"internalType":"struct SendParam","name":"_sendParam","type":"tuple"},{"internalType":"bool","name":"_payInLzToken","type":"bool"}],"name":"quoteSend","outputs":[{"components":[{"internalType":"uint256","name":"nativeFee","type":"uint256"},{"internalType":"uint256","name":"lzTokenFee","type":"uint256"}],"internalType":"struct MessagingFee","name":"fee","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"_srcEid","type":"uint32"},{"components":[{"internalType":"uint32","name":"srcEid","type":"uint32"},{"internalType":"uint64","name":"amount","type":"uint64"}],"internalType":"struct Credit[]","name":"_credits","type":"tuple[]"}],"name":"receiveCredits","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint32","name":"srcEid","type":"uint32"},{"internalType":"bytes32","name":"sender","type":"bytes32"},{"internalType":"uint64","name":"nonce","type":"uint64"}],"internalType":"struct Origin","name":"_origin","type":"tuple"},{"internalType":"bytes32","name":"_guid","type":"bytes32"},{"internalType":"uint8","name":"_seatNumber","type":"uint8"},{"internalType":"address","name":"_receiver","type":"address"},{"internalType":"uint64","name":"_amountSD","type":"uint64"}],"name":"receiveTokenBus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint32","name":"srcEid","type":"uint32"},{"internalType":"bytes32","name":"sender","type":"bytes32"},{"internalType":"uint64","name":"nonce","type":"uint64"}],"internalType":"struct Origin","name":"_origin","type":"tuple"},{"internalType":"bytes32","name":"_guid","type":"bytes32"},{"internalType":"address","name":"_receiver","type":"address"},{"internalType":"uint64","name":"_amountSD","type":"uint64"},{"internalType":"bytes","name":"_composeMsg","type":"bytes"}],"name":"receiveTokenTaxi","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"recoverToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_guid","type":"bytes32"},{"internalType":"uint8","name":"_index","type":"uint8"},{"internalType":"uint32","name":"_srcEid","type":"uint32"},{"internalType":"address","name":"_receiver","type":"address"},{"internalType":"uint256","name":"_amountLD","type":"uint256"},{"internalType":"bytes","name":"_composeMsg","type":"bytes"}],"name":"retryReceiveToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint32","name":"dstEid","type":"uint32"},{"internalType":"bytes32","name":"to","type":"bytes32"},{"internalType":"uint256","name":"amountLD","type":"uint256"},{"internalType":"uint256","name":"minAmountLD","type":"uint256"},{"internalType":"bytes","name":"extraOptions","type":"bytes"},{"internalType":"bytes","name":"composeMsg","type":"bytes"},{"internalType":"bytes","name":"oftCmd","type":"bytes"}],"internalType":"struct SendParam","name":"_sendParam","type":"tuple"},{"components":[{"internalType":"uint256","name":"nativeFee","type":"uint256"},{"internalType":"uint256","name":"lzTokenFee","type":"uint256"}],"internalType":"struct MessagingFee","name":"_fee","type":"tuple"},{"internalType":"address","name":"_refundAddress","type":"address"}],"name":"send","outputs":[{"components":[{"internalType":"bytes32","name":"guid","type":"bytes32"},{"internalType":"uint64","name":"nonce","type":"uint64"},{"components":[{"internalType":"uint256","name":"nativeFee","type":"uint256"},{"internalType":"uint256","name":"lzTokenFee","type":"uint256"}],"internalType":"struct MessagingFee","name":"fee","type":"tuple"}],"internalType":"struct MessagingReceipt","name":"msgReceipt","type":"tuple"},{"components":[{"internalType":"uint256","name":"amountSentLD","type":"uint256"},{"internalType":"uint256","name":"amountReceivedLD","type":"uint256"}],"internalType":"struct OFTReceipt","name":"oftReceipt","type":"tuple"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_dstEid","type":"uint32"},{"components":[{"internalType":"uint32","name":"srcEid","type":"uint32"},{"internalType":"uint64","name":"amount","type":"uint64"},{"internalType":"uint64","name":"minAmount","type":"uint64"}],"internalType":"struct TargetCredit[]","name":"_credits","type":"tuple[]"}],"name":"sendCredits","outputs":[{"components":[{"internalType":"uint32","name":"srcEid","type":"uint32"},{"internalType":"uint64","name":"amount","type":"uint64"}],"internalType":"struct Credit[]","name":"","type":"tuple[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint32","name":"dstEid","type":"uint32"},{"internalType":"bytes32","name":"to","type":"bytes32"},{"internalType":"uint256","name":"amountLD","type":"uint256"},{"internalType":"uint256","name":"minAmountLD","type":"uint256"},{"internalType":"bytes","name":"extraOptions","type":"bytes"},{"internalType":"bytes","name":"composeMsg","type":"bytes"},{"internalType":"bytes","name":"oftCmd","type":"bytes"}],"internalType":"struct SendParam","name":"_sendParam","type":"tuple"},{"components":[{"internalType":"uint256","name":"nativeFee","type":"uint256"},{"internalType":"uint256","name":"lzTokenFee","type":"uint256"}],"internalType":"struct MessagingFee","name":"_fee","type":"tuple"},{"internalType":"address","name":"_refundAddress","type":"address"}],"name":"sendToken","outputs":[{"components":[{"internalType":"bytes32","name":"guid","type":"bytes32"},{"internalType":"uint64","name":"nonce","type":"uint64"},{"components":[{"internalType":"uint256","name":"nativeFee","type":"uint256"},{"internalType":"uint256","name":"lzTokenFee","type":"uint256"}],"internalType":"struct MessagingFee","name":"fee","type":"tuple"}],"internalType":"struct MessagingReceipt","name":"msgReceipt","type":"tuple"},{"components":[{"internalType":"uint256","name":"amountSentLD","type":"uint256"},{"internalType":"uint256","name":"amountReceivedLD","type":"uint256"}],"internalType":"struct OFTReceipt","name":"oftReceipt","type":"tuple"},{"components":[{"internalType":"uint72","name":"ticketId","type":"uint72"},{"internalType":"bytes","name":"passengerBytes","type":"bytes"}],"internalType":"struct Ticket","name":"ticket","type":"tuple"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"feeLib","type":"address"},{"internalType":"address","name":"planner","type":"address"},{"internalType":"address","name":"treasurer","type":"address"},{"internalType":"address","name":"tokenMessaging","type":"address"},{"internalType":"address","name":"creditMessaging","type":"address"},{"internalType":"address","name":"lzToken","type":"address"}],"internalType":"struct StargateBase.AddressConfig","name":"_config","type":"tuple"}],"name":"setAddressConfig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_dstEid","type":"uint32"},{"internalType":"bool","name":"_oft","type":"bool"}],"name":"setOFTPath","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_paused","type":"bool"}],"name":"setPause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_gasLimit","type":"uint256"}],"name":"setTransferGasLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sharedDecimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stargateType","outputs":[{"internalType":"enum StargateType","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"status","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"transferTokenOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasuryFee","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"guid","type":"bytes32"},{"internalType":"uint8","name":"index","type":"uint8"}],"name":"unreceivedTokens","outputs":[{"internalType":"bytes32","name":"hash","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawPlannerFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint64","name":"_amountSD","type":"uint64"}],"name":"withdrawTreasuryFee","outputs":[],"stateMutability":"nonpayable","type":"function"}] as const;
