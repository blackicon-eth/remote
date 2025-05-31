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
