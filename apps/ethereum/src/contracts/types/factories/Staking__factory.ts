/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { Staking, StakingInterface } from "../Staking";

const _abi = [
  {
    inputs: [],
    name: "InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "messengerId",
        type: "uint256",
      },
    ],
    name: "MessengerNotEnabled",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "messengerId",
        type: "uint256",
      },
    ],
    name: "MessengerNotFound",
    type: "error",
  },
  {
    inputs: [],
    name: "StakingZeroAmount",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroMessengers",
    type: "error",
  },
  {
    inputs: [],
    name: "contractPaused",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "block",
        type: "uint256",
      },
    ],
    name: "ContractPaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "block",
        type: "uint256",
      },
    ],
    name: "ContractUnPaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "messengerId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "messenger",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isEnabled",
        type: "bool",
      },
    ],
    name: "MessengerAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "messengerId",
        type: "uint256",
      },
    ],
    name: "MessengerDisabled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "messengerId",
        type: "uint256",
      },
    ],
    name: "MessengerEnabled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_minActivatingDeposit",
        type: "uint256",
      },
    ],
    name: "SetMinActivationDeposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_pendingValidatorsLimit",
        type: "uint256",
      },
    ],
    name: "SetPendingValidatorsLimit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "indexed_user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "block_time",
        type: "uint256",
      },
    ],
    name: "Stake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "optimism",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "messengerId",
        type: "uint256",
      },
    ],
    name: "TransferredToL2",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_pendingValidators",
        type: "uint256",
      },
    ],
    name: "UpdatePendingValidators",
    type: "event",
  },
  {
    inputs: [],
    name: "BASIS_POINT",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DEPOSIT_CONTRACT",
    outputs: [
      {
        internalType: "contract IDepositContract",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VALIDATOR_DEPOSIT",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VERIFICATION_DEPOSIT",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "messenger",
            type: "address",
          },
          {
            internalType: "bool",
            name: "isEnabled",
            type: "bool",
          },
        ],
        internalType: "struct Issuer.MessengerData[]",
        name: "_messengers",
        type: "tuple[]",
      },
    ],
    name: "addMessenger",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "core",
    outputs: [
      {
        internalType: "contract ICore",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "publicKey",
        type: "bytes",
      },
    ],
    name: "depositToEth2",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_messengerId",
        type: "uint256",
      },
    ],
    name: "disableMessenger",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_messengerId",
        type: "uint256",
      },
    ],
    name: "enableMessenger",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "ethStaked",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDepositOptimism",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_messengerId",
        type: "uint256",
      },
    ],
    name: "getMessenger",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberMessengers",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ICore",
        name: "_core",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_pendingValidatorsLimit",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_depositContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_pendingValidators",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_ethStaked",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_ethMinted",
        type: "uint256",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "messengers",
    outputs: [
      {
        internalType: "address",
        name: "messenger",
        type: "address",
      },
      {
        internalType: "bool",
        name: "isEnabled",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_messengerId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_receiverAddress",
        type: "address",
      },
    ],
    name: "mintL2",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "pendingValidatorLimit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pendingValidators",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pendingValidatorsLimit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_pendingValidatorsLimit",
        type: "uint256",
      },
    ],
    name: "setPendingValidatorsLimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stake",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "stkEthMinted",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_messengerId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_receiverAddress",
        type: "address",
      },
    ],
    name: "transferToL2",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newActiveValidators",
        type: "uint256",
      },
    ],
    name: "updatePendingValidator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50612240806100206000396000f3fe6080604052600436106101c25760003560e01c80638da5cb5b116100f7578063cbe0944a11610095578063f2f4eb2611610064578063f2f4eb26146104cc578063f2fde38b146104ec578063f357397b1461050c578063f9fde9f41461051457600080fd5b8063cbe0944a14610462578063dcc77f0814610477578063ed7a8e6414610497578063ee24b86a146104b757600080fd5b8063a251b5a1116100d1578063a251b5a11461040d578063a46d55e914610420578063a82f255b14610436578063ada5f6421461044c57600080fd5b80638da5cb5b146103b357806390100bcc146103d15780639d95d0a8146103ed57600080fd5b8063441d92cc116101645780636b96736b1161013e5780636b96736b14610331578063715018a61461036957806380d2ac1c1461037e5780638456cb591461039e57600080fd5b8063441d92cc146102bf57806351310bd6146102dc5780635b49dc081461031b57600080fd5b806324ec66b3116101a057806324ec66b3146102435780632feb0be6146102825780633a4b66f1146102a25780633f4ba83a146102aa57600080fd5b806304989885146101c7578063111f052c146101fd578063114b095e1461021f575b600080fd5b3480156101d357600080fd5b506101e76101e2366004611bbe565b610534565b6040516101f49190611c33565b60405180910390f35b34801561020957600080fd5b5061021d610218366004611c77565b610725565b005b34801561022b57600080fd5b50610235609c5481565b6040519081526020016101f4565b34801561024f57600080fd5b5061026361025e366004611c77565b6107b7565b604080516001600160a01b0390931683529015156020830152016101f4565b34801561028e57600080fd5b5061021d61029d366004611c77565b6107ec565b61021d6108f2565b3480156102b657600080fd5b5061021d610996565b3480156102cb57600080fd5b506102356801ae361fc1451c000081565b3480156102e857600080fd5b506102fc6102f7366004611c77565b6109e1565b6040805192151583526001600160a01b039091166020830152016101f4565b34801561032757600080fd5b50610235609a5481565b34801561033d57600080fd5b50609854610351906001600160a01b031681565b6040516001600160a01b0390911681526020016101f4565b34801561037557600080fd5b5061021d610a45565b34801561038a57600080fd5b5061021d610399366004611ca5565b610a57565b3480156103aa57600080fd5b5061021d610bba565b3480156103bf57600080fd5b506065546001600160a01b0316610351565b3480156103dd57600080fd5b50610235670de0b6b3a764000081565b3480156103f957600080fd5b5061021d610408366004611d01565b610c07565b61021d61041b366004611d3a565b610ef7565b34801561042c57600080fd5b50610235609b5481565b34801561044257600080fd5b5061023560995481565b34801561045857600080fd5b5061023561271081565b34801561046e57600080fd5b50609a54610235565b34801561048357600080fd5b5061021d610492366004611c77565b611178565b3480156104a357600080fd5b5061021d6104b2366004611c77565b61120b565b3480156104c357600080fd5b50609d54610235565b3480156104d857600080fd5b50609754610351906001600160a01b031681565b3480156104f857600080fd5b5061021d610507366004611d6a565b611288565b61021d611301565b34801561052057600080fd5b5061021d61052f366004611d8e565b611342565b606061053e6116c6565b8161055c57604051631dd5486360e31b815260040160405180910390fd5b60008267ffffffffffffffff81111561057757610577611dee565b6040519080825280602002602001820160405280156105a0578160200160208202803683370190505b50905060005b8381101561071d5760008585838181106105c2576105c2611e04565b6105d89260206040909202019081019150611d6a565b6001600160a01b031614156106005760405163d92e233d60e01b815260040160405180910390fd5b609d85858381811061061457610614611e04565b835460018101855560009485526020909420604090910292909201929190910190506106408282611e28565b5050609d5461065190600190611e97565b82828151811061066357610663611e04565b6020026020010181815250507f2233f2853a7e43dd213cfcd4fd359c807587c3233c09642286d298cb064ff7ca818686848181106106a3576106a3611e04565b6106b99260206040909202019081019150611d6a565b8787858181106106cb576106cb611e04565b90506040020160200160208101906106e39190611eae565b604080519384526001600160a01b03909216602084015215159082015260600160405180910390a18061071581611ecb565b9150506105a6565b509392505050565b61072d6116c6565b612710811061077b5760405162461bcd60e51b8152602060048201526015602482015274125cdcdd595c8e881a5b9d985b1a59081b1a5b5a5d605a1b60448201526064015b60405180910390fd5b609a8190556040518181527ff13548771f8b7580cc62ccca5ed3dee7b41528a7ae35b642f1d8efc295075cce906020015b60405180910390a150565b609d81815481106107c757600080fd5b6000918252602090912001546001600160a01b0381169150600160a01b900460ff1682565b609754604080516307dc0d1d60e41b8152905133926001600160a01b031691637dc0d1d09160048083019260209291908290030181865afa158015610835573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108599190611ef6565b6001600160a01b0316146108af5760405162461bcd60e51b815260206004820152601e60248201527f4973737565723a204f6e6c79206f7261636c652063616e2075706461746500006044820152606401610772565b806099546108bd9190611e97565b60998190556040519081527f62a3b78aede45534644db5c8d40aa4d36bee5174ee6899574215f3c078188036906020016107ac565b609754600160a01b900460ff161561091d57604051634533a2b560e11b815260040160405180910390fd5b3461093b57604051636207797760e11b815260040160405180910390fd5b60408051338152346020820152428183015290517f5af417134f72a9d41143ace85b0a26dce6f550f894f2cbc1eeee8810603d91b69181900360600190a134609b546109879190611f13565b609b556109943433611720565b565b61099e6116c6565b6097805460ff60a01b191690556040514381527f36b0aa518e5bb69761c9ebb4ba308f44f6b1e319346947122d6e9d2665037de9906020015b60405180910390a1565b600080609d83815481106109f7576109f7611e04565b9060005260206000200160000160149054906101000a900460ff16609d8481548110610a2557610a25611e04565b60009182526020909120015490946001600160a01b039091169350915050565b610a4d6116c6565b61099460006118ec565b600054610100900460ff1615808015610a775750600054600160ff909116105b80610a915750303b158015610a91575060005460ff166001145b610af45760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610772565b6000805460ff191660011790558015610b17576000805461ff0019166101001790555b610b1f61193e565b610b2761196d565b609780546001600160a01b03808a166001600160a01b031992831617909255609a88905560988054928816929091169190911790556099849055609b839055609c8290558015610bb1576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50505050505050565b610bc26116c6565b6097805460ff60a01b1916600160a01b1790556040517f1f56865eed36853b82b13b742f7f60f4056c34e5a8b727e2c67c12190da413ca906109d79043815260200190565b609754600160a01b900460ff1615610c3257604051634533a2b560e11b815260040160405180910390fd5b82610c3c8161199c565b610c45816119f1565b60975460408051637cd8548560e01b815290516000926001600160a01b031691637cd854859160048083019260209291908290030181865afa158015610c8f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cb39190611ef6565b6040516370a0823160e01b81523360048201526001600160a01b0391909116906370a0823190602401602060405180830381865afa158015610cf9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d1d9190611f2b565b9050838110610ed757609760009054906101000a90046001600160a01b03166001600160a01b0316637cd854856040518163ffffffff1660e01b8152600401602060405180830381865afa158015610d79573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d9d9190611ef6565b604051632770a7eb60e21b8152336004820152602481018690526001600160a01b039190911690639dc29fac90604401600060405180830381600087803b158015610de757600080fd5b505af1158015610dfb573d6000803e3d6000fd5b50505050609d8581548110610e1257610e12611e04565b6000918252602090912001546040516307516c1f60e11b81526001600160a01b0385811660048301526024820187905290911690630ea2d83e90604401600060405180830381600087803b158015610e6957600080fd5b505af1158015610e7d573d6000803e3d6000fd5b5050604080513381526001600160a01b0387166020820152908101879052606081018890527f8887eadce601fe2e2bbad0bd002cc491fcbe8785a0dc94c176c5df85abc214dc9250608001905060405180910390a1610ef0565b604051631e9acf1760e31b815260040160405180910390fd5b5050505050565b609754600160a01b900460ff1615610f2257604051634533a2b560e11b815260040160405180910390fd5b34610f4057604051636207797760e11b815260040160405180910390fd5b81610f4a8161199c565b610f53816119f1565b60408051338152346020820152428183015290517f5af417134f72a9d41143ace85b0a26dce6f550f894f2cbc1eeee8810603d91b69181900360600190a160975460408051637cd8548560e01b815290516000926001600160a01b031691637cd854859160048083019260209291908290030181865afa158015610fdb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fff9190611ef6565b6001600160a01b03166399530b066040518163ffffffff1660e01b8152600401602060405180830381865afa15801561103c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110609190611f2b565b61107234670de0b6b3a7640000611f44565b61107c9190611f63565b9050609d848154811061109157611091611e04565b6000918252602090912001546040516307516c1f60e11b81526001600160a01b0385811660048301526024820184905290911690630ea2d83e90604401600060405180830381600087803b1580156110e857600080fd5b505af11580156110fc573d6000803e3d6000fd5b5050505080609c5461110e9190611f13565b609c55609b5461111f903490611f13565b609b55604080513381526001600160a01b0385166020820152908101829052606081018590527f8887eadce601fe2e2bbad0bd002cc491fcbe8785a0dc94c176c5df85abc214dc9060800160405180910390a150505050565b6111806116c6565b8061118a8161199c565b611193816119f1565b6000609d83815481106111a8576111a8611e04565b60009182526020909120018054911515600160a01b0260ff60a01b199092169190911790556040517f07431de27d8d44d83b0a095cb2d166e4d367ae12f6049d77e3954b3b84f65ab9906111ff9084815260200190565b60405180910390a15050565b6112136116c6565b61121c8161199c565b6001609d828154811061123157611231611e04565b60009182526020909120018054911515600160a01b0260ff60a01b199092169190911790556040517f27e0a574d176231be3e81a6f7a15ff44d6d1b4a23b58c2761f02c0352360db3b906107ac9083815260200190565b6112906116c6565b6001600160a01b0381166112f55760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610772565b6112fe816118ec565b50565b34156109945734609b60008282546113199190611f13565b9091555061132a9050366000611c77565b609c600082825461133b9190611f13565b9091555050565b609754600160a01b900460ff161561136d57604051634533a2b560e11b815260040160405180910390fd5b611388670de0b6b3a76400006801ae361fc1451c0000611f13565b4710156113e25760405162461bcd60e51b815260206004820152602260248201527f4973737565723a204e6f7420656e6f756768206574686572206465706f736974604482015261195960f21b6064820152608401610772565b60975460408051630bbbbe7560e31b815290516000926001600160a01b031691635dddf3a89160048083019260209291908290030181865afa15801561142c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114509190611ef6565b6001600160a01b0316636c36511a84846040518363ffffffff1660e01b815260040161147d929190611fae565b600060405180830381865afa15801561149a573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526114c29190810190612054565b90506114d18160400151611a3a565b609760009054906101000a90046001600160a01b03166001600160a01b0316635dddf3a86040518163ffffffff1660e01b8152600401602060405180830381865afa158015611524573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115489190611ef6565b6001600160a01b0316634df84ea884846040518363ffffffff1660e01b8152600401611575929190611fae565b600060405180830381600087803b15801561158f57600080fd5b505af11580156115a3573d6000803e3d6000fd5b5050505060995460016115b69190611f13565b60995560985460975460408051638305930360e01b815290516001600160a01b03938416936322895118936801ae361fc1451c00009389938993909216916383059303916004808201926020929091908290030181865afa15801561161f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116439190611f2b565b60405160200161165591815260200190565b60408051601f1981840301815290829052602088015160608901516001600160e01b031960e089901b16845261168f959493600401612172565b6000604051808303818588803b1580156116a857600080fd5b505af11580156116bc573d6000803e3d6000fd5b5050505050505050565b6065546001600160a01b031633146109945760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610772565b60975460408051637cd8548560e01b815290516000926001600160a01b031691637cd854859160048083019260209291908290030181865afa15801561176a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061178e9190611ef6565b6001600160a01b03166399530b066040518163ffffffff1660e01b8152600401602060405180830381865afa1580156117cb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117ef9190611f2b565b61180184670de0b6b3a7640000611f44565b61180b9190611f63565b905080609c5461181b9190611f13565b609c5560975460408051637cd8548560e01b815290516001600160a01b0390921691637cd85485916004808201926020929091908290030181865afa158015611868573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061188c9190611ef6565b6040516340c10f1960e01b81526001600160a01b0384811660048301526024820184905291909116906340c10f1990604401600060405180830381600087803b1580156118d857600080fd5b505af1158015610bb1573d6000803e3d6000fd5b606580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600054610100900460ff166119655760405162461bcd60e51b8152600401610772906121bf565b610994611b07565b600054610100900460ff166119945760405162461bcd60e51b8152600401610772906121bf565b610994611b37565b60006001600160a01b0316609d82815481106119ba576119ba611e04565b6000918252602090912001546001600160a01b031614156112fe57604051634b731b4b60e01b815260048101829052602401610772565b609d8181548110611a0457611a04611e04565b600091825260209091200154600160a01b900460ff166112fe5760405163727dc07960e01b815260048101829052602401610772565b611a42611b64565b6000816001600160a01b0316670de0b6b3a764000060405160006040518083038185875af1925050503d8060008114611a97576040519150601f19603f3d011682016040523d82523d6000602084013e611a9c565b606091505b5050905080611afd5760405162461bcd60e51b815260206004820152602760248201527f4973737565723a204661696c656420746f2073656e6420746f204e6f6465204f6044820152663832b930ba37b960c91b6064820152608401610772565b506112fe60018055565b600054610100900460ff16611b2e5760405162461bcd60e51b8152600401610772906121bf565b610994336118ec565b600054610100900460ff16611b5e5760405162461bcd60e51b8152600401610772906121bf565b60018055565b60026001541415611bb75760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610772565b6002600155565b60008060208385031215611bd157600080fd5b823567ffffffffffffffff80821115611be957600080fd5b818501915085601f830112611bfd57600080fd5b813581811115611c0c57600080fd5b8660208260061b8501011115611c2157600080fd5b60209290920196919550909350505050565b6020808252825182820181905260009190848201906040850190845b81811015611c6b57835183529284019291840191600101611c4f565b50909695505050505050565b600060208284031215611c8957600080fd5b5035919050565b6001600160a01b03811681146112fe57600080fd5b60008060008060008060c08789031215611cbe57600080fd5b8635611cc981611c90565b9550602087013594506040870135611ce081611c90565b959894975094956060810135955060808101359460a0909101359350915050565b600080600060608486031215611d1657600080fd5b83359250602084013591506040840135611d2f81611c90565b809150509250925092565b60008060408385031215611d4d57600080fd5b823591506020830135611d5f81611c90565b809150509250929050565b600060208284031215611d7c57600080fd5b8135611d8781611c90565b9392505050565b60008060208385031215611da157600080fd5b823567ffffffffffffffff80821115611db957600080fd5b818501915085601f830112611dcd57600080fd5b813581811115611ddc57600080fd5b866020828501011115611c2157600080fd5b634e487b7160e01b600052604160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b80151581146112fe57600080fd5b8135611e3381611c90565b81546001600160a01b031981166001600160a01b039290921691821783556020840135611e5f81611e1a565b6001600160a81b03199190911690911790151560a01b60ff60a01b1617905550565b634e487b7160e01b600052601160045260246000fd5b600082821015611ea957611ea9611e81565b500390565b600060208284031215611ec057600080fd5b8135611d8781611e1a565b6000600019821415611edf57611edf611e81565b5060010190565b8051611ef181611c90565b919050565b600060208284031215611f0857600080fd5b8151611d8781611c90565b60008219821115611f2657611f26611e81565b500190565b600060208284031215611f3d57600080fd5b5051919050565b6000816000190483118215151615611f5e57611f5e611e81565b500290565b600082611f8057634e487b7160e01b600052601260045260246000fd5b500490565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b602081526000611fc2602083018486611f85565b949350505050565b6040516080810167ffffffffffffffff81118282101715611fed57611fed611dee565b60405290565b604051601f8201601f1916810167ffffffffffffffff8111828210171561201c5761201c611dee565b604052919050565b60005b8381101561203f578181015183820152602001612027565b8381111561204e576000848401525b50505050565b6000602080838503121561206757600080fd5b825167ffffffffffffffff8082111561207f57600080fd5b908401906080828703121561209357600080fd5b61209b611fca565b8251600481106120aa57600080fd5b815282840151828111156120bd57600080fd5b8301601f810188136120ce57600080fd5b8051838111156120e0576120e0611dee565b6120f2601f8201601f19168701611ff3565b9350808452888682840101111561210857600080fd5b61211781878601888501612024565b5050818482015261212a60408401611ee6565b6040820152606083015160608201528094505050505092915050565b6000815180845261215e816020860160208601612024565b601f01601f19169290920160200192915050565b608081526000612186608083018789611f85565b82810360208401526121988187612146565b905082810360408401526121ac8186612146565b9150508260608301529695505050505050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b60608201526080019056fea26469706673582212203e4a7f49d229ed899a5c03ee28654d4a0dfbed2bd3cf18d907ef059331b3c56d64736f6c634300080a0033";

type StakingConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StakingConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Staking__factory extends ContractFactory {
  constructor(...args: StakingConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Staking> {
    return super.deploy(overrides || {}) as Promise<Staking>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Staking {
    return super.attach(address) as Staking;
  }
  override connect(signer: Signer): Staking__factory {
    return super.connect(signer) as Staking__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StakingInterface {
    return new utils.Interface(_abi) as StakingInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Staking {
    return new Contract(address, _abi, signerOrProvider) as Staking;
  }
}
