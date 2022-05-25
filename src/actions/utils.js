import BigNumber from "bignumber.js";
import Web3 from 'web3';


var web3 = null;
var decimalPlaces = 6;
var web3Provider = null;

export const shortenString = (anyString, digits) => {
    const string = anyString.trim();
    const shortString =
        string.slice(0, digits + 2) + "..." + string.slice(-digits, string.length);
    return shortString;
};

export const shortenEthAddress = (address) => {
    return shortenString(address, 4);
};

export const shortenTxHash = (address) => {
    return shortenString(address, 5);
};

export const getWeb3 = () => {
    //return web3;
    // temporarily set it as the browser's injected web3
    const myWeb3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA));
    return myWeb3;
};

export const getWeb3Provider = () => {
    return web3Provider;
    // temporarily set it as the browser's injected web3
    /* const myWeb3 = new Web3(window.ethereum);
    return myWeb3; */
};

export const setWeb3 = (web3Object) => {
    web3 = web3Object;
};

export const setWeb3Provider = (web3ProviderObject) => {
    web3Provider = web3ProviderObject;
};

/*export const isWeb3Unlocked = async () => {
  const provider = await detectEthereumProvider();
  if (provider === window.ethereum) {
    const web3Obj = new Web3(provider);
    let network = await web3Obj.eth.net.getId();
    if (network === CHAIN[SELECTED.CHAIN][process.env.REACT_APP_ENV].networkID) {
      let accountList = await web3Obj.eth.getAccounts();
      // if account is unlocked, check if the correct network is selected
      if (accountList.length !== 0) {
        if (!web3) web3 = web3Obj;
        return true;
      }
    }
  }
  return false;
};*/

export const getContractInstance = async (abiJSONName) => {
    let instance;

    let artifactJSON;
    if(process.env.REACT_APP_ENV === "Testnet"){
        artifactJSON = require(`../abi_testnet/${abiJSONName}.json`);
    }else if(process.env.REACT_APP_ENV === "Staging" || process.env.REACT_APP_ENV === "Mainnet"){
        artifactJSON = require(`../abi_mainnet/${abiJSONName}.json`);
    }
    const web3Local = getWeb3();
    const network = await web3Local.eth.net.getId();
    const deployedAddress = artifactJSON.networks[network].address;
    console.log("abi: ", artifactJSON.abi, " deployedAddress: ", deployedAddress);

    instance = new web3Local.eth.Contract(artifactJSON.abi, deployedAddress);
    instance.setProvider(web3Local);

    return instance;
};

export const getContractAddressFrom = async (abiJSONName) => {
    let artifactJSON;
    if(process.env.REACT_APP_ENV === "Testnet"){
        artifactJSON = require(`../abi_testnet/${abiJSONName}.json`);
    }else if(process.env.REACT_APP_ENV === "Staging" || process.env.REACT_APP_ENV === "Mainnet"){
        artifactJSON = require(`../abi_mainnet/${abiJSONName}.json`);
    }
    const web3Local = getWeb3();
    const network = await web3Local.eth.net.getId();
    const deployedAddress = artifactJSON.networks[network].address;
    console.log("deployedAddress: ", deployedAddress);

    return deployedAddress;
};

export const getContractInstanceFrom = async (abiJSONName, deployedAddress) => {
    let instance;
    let artifactJSON;
    if(process.env.REACT_APP_ENV === "Testnet"){
        artifactJSON = require(`../abi_testnet/${abiJSONName}.json`);
    }else if(process.env.REACT_APP_ENV === "Staging" || process.env.REACT_APP_ENV === "Mainnet"){
        artifactJSON = require(`../abi_mainnet/${abiJSONName}.json`);
    }
    const web3Local = getWeb3();
    console.log("abi: ", artifactJSON, " deployedAddress: ", deployedAddress);
    instance = new web3Local.eth.Contract(artifactJSON, deployedAddress);
    instance.setProvider(web3Local);
    console.log("instance address: ", instance);

    return instance;
};

export const getStakeLPAddress = async (stakeLPCoreSC) => {
    const stakeLPAddress = await getContractAddressFrom(stakeLPCoreSC);
    return stakeLPAddress;
};

export const setDecimalPlaces = (valueNumber) => {
    decimalPlaces = Number(valueNumber);
    BigNumber.set({ DECIMAL_PLACES: decimalPlaces, ROUNDING_MODE: 3 });
};

export const getDecimalPlaces = () => {
    return decimalPlaces;
};

export const toBN = (valueStr) => {
    return web3.utils.toBN(valueStr);
};

export const unDecimalize = (valueString, decimals = decimalPlaces) => {
    // since BN.js doesn't accept decimals, we'll use BigNumber.js
    let bnValueString = valueString
        ? new BigNumber(valueString.toString())
        : new BigNumber(0);
    let bnDecimalPlaces = new BigNumber(decimals);
    let bnBase = new BigNumber(10);
    let bnMultiplier = bnBase.pow(bnDecimalPlaces);
    let bnResult = bnValueString.multipliedBy(bnMultiplier).toFixed(0);

    let bnFinalValueToBN = web3.utils.toBN(bnResult.toString());
    return bnFinalValueToBN;
};

export const longDecimalize = (valueString, decimals = decimalPlaces) => {
    // BigNumber.set({ DECIMAL_PLACES: decimalPlaces, ROUNDING_MODE: 5 });
    let bnValueString = valueString
        ? new BigNumber(valueString.toString())
        : new BigNumber(0);
    let bnDecimalPlaces = new BigNumber(decimals);
    let bnBase = new BigNumber(10);
    let bnDenominator = bnBase.pow(bnDecimalPlaces);
    let bnFinalValueToBNString, bnFinalValue;
    bnFinalValueToBNString = bnValueString
        .div(bnDenominator)
        .toFixed(decimals, 1);

    // let bnFinalValueToBNStringDP = bnFinalValueToBNString.decimalPlaces(6, 1);
    console.log("bnFinalValueToBNString: ", bnFinalValueToBNString.toString());
    /*  if (bnFinalValueToBNString > bnFinalValueToBNStringDP) {
      bnFinalValue = bnFinalValueToBNString.toExponential(Number(fixed), 1);
    } else {
      bnFinalValue = bnFinalValueToBNString.toFixed(Number(fixed), 1);
    } */
    return bnFinalValueToBNString.toString();
};

export const autoExponentiation = (valueString, fixed = decimalPlaces) => {
    let bnFinalValue;
    let valueStringBN = new BigNumber(valueString);
    let valueStringBNDP = valueStringBN.decimalPlaces(6, 1);
    let denominator = new BigNumber(10 ** decimalPlaces);
    let one = new BigNumber(1);
    let minVal = one.dividedBy(denominator);
    console.log(
        "valueStringBN: ",
        valueStringBN.toString(),
        " valueStringBNDP: ",
        valueStringBNDP.toString()
    );
    if (valueStringBN.isGreaterThanOrEqualTo(one)) {
        bnFinalValue = valueStringBN.toFixed(Number(fixed), 1);
    } else {
        if (valueStringBN > valueStringBNDP) {
            bnFinalValue = valueStringBN.toExponential(Number(fixed), 1);
        } else {
            bnFinalValue = valueStringBN.toFixed(Number(fixed), 1);
        }
    }

    // return valueStringBN;
    return bnFinalValue.toString();
};

export const decimalize = (
    valueString,
    decimals = decimalPlaces,
    fixed = decimalPlaces
) => {
    // BigNumber.set({ DECIMAL_PLACES: decimalPlaces, ROUNDING_MODE: 5 });
    let bnValueString = valueString
        ? new BigNumber(valueString.toString())
        : new BigNumber(0);
    let bnDecimalPlaces = new BigNumber(decimals);
    let bnBase = new BigNumber(10);
    let bnDenominator = bnBase.pow(bnDecimalPlaces);
    let bnFinalValueToBNString;
    bnFinalValueToBNString = bnValueString.div(bnDenominator);

    /* let bnFinalValueToBNStringDP = bnFinalValueToBNString.decimalPlaces(6, 1);
    console.log(
      "bnFinalValueToBNString: ",
      bnFinalValueToBNString.toString(),
      " bnFinalValueToBNStringDP: ",
      bnFinalValueToBNStringDP.toString()
    );
    if (bnFinalValueToBNString > bnFinalValueToBNStringDP) {
      bnFinalValue = bnFinalValueToBNString.toExponential(Number(fixed), 1);
    } else {
      bnFinalValue = bnFinalValueToBNString.toFixed(Number(fixed), 1);
    }

    // return bnFinalValueToBNString;
    return bnFinalValue.toString(); */

    return autoExponentiation(bnFinalValueToBNString.toString(), fixed);
};

export const getDeployedBlockNumber = async (contractName) => {
    let artifactJSON;
    if(process.env.REACT_APP_ENV === "Testnet"){
        artifactJSON = require(`../abi_testnet/${contractName}.json`);
    }else if(process.env.REACT_APP_ENV === "Staging" || process.env.REACT_APP_ENV === "Mainnet"){
        artifactJSON = require(`../abi_mainnet/${contractName}.json`);
    }

    const network = await web3.eth.net.getId();
    const deployedTransactionHash =
        artifactJSON.networks[network].transactionHash;
    const deployedBlockNumber = await web3.eth.getTransaction(
        deployedTransactionHash
    ).blockNumber;

    return deployedBlockNumber;
};

export const GET_BLOCKCHAIN_NETWORK = (chainId) => {
    let bnStr = "Unknown Network";
    switch (chainId) {
        case 1:
            bnStr = "Ethereum Mainnet";
            break;
        case 100:
            bnStr = "xDAI Chain";
            break;
        case 101:
            bnStr = "EtherInc";
            break;
        case 108:
            bnStr = "ThunderCore Mainnet";
            break;
        case 11:
            bnStr = "Metadium Mainnet";
            break;
        case 1122334455:
            bnStr = "IPOS Network";
            break;
        case 12:
            bnStr = "Metadium Testnet";
            break;
        case 122:
            bnStr = "Fuse Mainnet";
            break;
        case 13:
            bnStr = "Diode Staging";
            break;
        case 1313114:
            bnStr = "Ether-1";
            break;
        case 1313161554:
            bnStr = "NEAR MainNet";
            break;
        case 1313161555:
            bnStr = "NEAR TestNet";
            break;
        case 1313500:
            bnStr = "Xerom";
            break;
        case 13371337:
            bnStr = "PepChain Churchill";
            break;
        case 137:
            bnStr = "Matic Mainnet";
            break;
        case 15:
            bnStr = "Diode Prenet";
            break;
        case 162:
            bnStr = "Lightstreams Testnet";
            break;
        case 1620:
            bnStr = "Atheios";
            break;
        case 163:
            bnStr = "Lightstreams Mainnet";
            break;
        case 18:
            bnStr = "ThunderCore Testnet";
            break;
        case 18289463:
            bnStr = "IOLite";
            break;
        case 1856:
            bnStr = "Teslafunds";
            break;
        case 1987:
            bnStr = "EtherGem";
            break;
        case 2:
            bnStr = "Expanse Network";
            break;
        case 20:
            bnStr = "ELA-ETH-Sidechain Mainnet";
            break;
        case 200625:
            bnStr = "Akaroma";
            break;
        case 21:
            bnStr = "ELA-ETH-Sidechain Testnet";
            break;
        case 211:
            bnStr = "Freight Trust Network";
            break;
        case 24484:
            bnStr = "Webchain";
            break;
        case 246:
            bnStr = "Energy Web Chain";
            break;
        case 246529:
            bnStr = "ARTIS sigma1";
            break;
        case 246785:
            bnStr = "ARTIS tau1";
            break;
        case 250:
            bnStr = "Fantom Opera";
            break;
        case 269:
            bnStr = "High Performance Blockchain";
            break;
        case 28945486:
            bnStr = "Auxilium Network Mainnet";
            break;
        case 3:
            bnStr = "Ethereum Testnet Ropsten";
            break;
        case 30:
            bnStr = "RSK Mainnet";
            break;
        case 31:
            bnStr = "RSK Testnet";
            break;
        case 31102:
            bnStr = "Ethersocial Network";
            break;
        case 3125659152:
            bnStr = "Pirl";
            break;
        case 38:
            bnStr = "Valorbit";
            break;
        case 385:
            bnStr = "Lisinski";
            break;
        case 39797:
            bnStr = "Energi Mainnet";
            break;
        case 4:
            bnStr = "Ethereum Testnet Rinkeby";
            break;
        case 42:
            bnStr = "Ethereum Testnet Kovan";
            break;
        case 420:
            bnStr = "Optimistic Ethereum";
            break;
        case 43110:
            bnStr = "Athereum";
            break;
        case 49797:
            bnStr = "Energi Testnet";
            break;
        case 5:
            bnStr = "Ethereum Testnet Görli";
            break;
        case 56:
            bnStr = "Binance Smart Chain Mainnet";
            break;
        case 6:
            bnStr = "Ethereum Classic Testnet Kotti";
            break;
        case 60:
            bnStr = "GoChain";
            break;
        case 61:
            bnStr = "Ethereum Classic Mainnet";
            break;
        case 61717561:
            bnStr = "Aquachain";
            break;
        case 62:
            bnStr = "Ethereum Classic Testnet Morden";
            break;
        case 63:
            bnStr = "Ethereum Classic Testnet Mordor";
            break;
        case 64:
            bnStr = "Ellaism";
            break;
        case 7:
            bnStr = "ThaiChain";
            break;
        case 73799:
            bnStr = "Energy Web Volta Testnet";
            break;
        case 76:
            bnStr = "Mix";
            break;
        case 77:
            bnStr = "POA Network Sokol";
            break;
        case 7762959:
            bnStr = "Musicoin";
            break;
        case 78110:
            bnStr = "Firenze test network";
            break;
        case 8:
            bnStr = "Ubiq Network Mainnet";
            break;
        case 80001:
            bnStr = "Matic Mumbai";
            break;
        case 820:
            bnStr = "Callisto Mainnet";
            break;
        case 821:
            bnStr = "Callisto Testnet";
            break;
        case 88:
            bnStr = "TomoChain";
            break;
        case 9:
            bnStr = "Ubiq Network Testnet";
            break;
        case 97:
            bnStr = "Binance Smart Chain Testnet";
            break;
        case 977:
            bnStr = "Nepal Blockchain Network";
            break;
        case 99:
            bnStr = "POA Network Core";
            break;
        case 1337:
        case 5777:
            bnStr = "Local Blockchain Instance";
            break;

        default:
            bnStr = "Unknown Network";
            break;
    }
    return bnStr;
};
