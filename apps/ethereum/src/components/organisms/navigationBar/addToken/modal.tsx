import React from "react";
import Modal from "../../../molecules/modal";
import { useAppStore } from "../../../../store/store";
import Button from "../../../atoms/button";
import { chains, contracts } from "../../../../helpers/config";
import { getWalletProvider } from "../../../../helpers/utils";
import { displayToast } from "../../../molecules/toast";
import { ToastType } from "../../../molecules/toast/types";
import { addNetwork, registerToken } from "../../../../helpers/wallets";

const env: string = process.env.NEXT_PUBLIC_ENVIRONMENT!;

const AddTokenModal = () => {
  const tokenModal = useAppStore((state) => state.tokenModal);
  const handleAddTokenModal = useAppStore((state) => state.handleAddTokenModal);
  const walletInfo = useAppStore((state) => state.wallet);

  const handleClose = () => {
    handleAddTokenModal(false);
  };

  const handleSwitchNetwork = async () => {
    const ethContractAddressOnEthereum =
      contracts[process.env.NEXT_PUBLIC_ENVIRONMENT!]["l2stkETH"];
    const chain = chains[env][tokenModal.networkToSwitch!];
    const provider = getWalletProvider(walletInfo.walletName!);
    if (provider.chainId !== chain.networkIdHex) {
      const response = await addNetwork(provider, chain);
      if (!response) {
        displayToast(
          {
            message: "Error while Switching network",
          },
          ToastType.ERROR
        );
        return;
      } else {
        await registerToken(walletInfo, ethContractAddressOnEthereum);
      }
    }
  };

  const handleAddToken = async () => {
    try {
      const ethContractAddressOnEthereum =
        contracts[process.env.NEXT_PUBLIC_ENVIRONMENT!]["l2stkETH"];
      const chain = chains[env][tokenModal.networkToSwitch!];
      const provider = getWalletProvider(walletInfo.walletName!);
      if (provider.chainId !== chain.networkIdHex) {
        displayToast(
          {
            message: "Please switch the network to optimism",
          },
          ToastType.ERROR
        );
        return;
      }
      await registerToken(walletInfo, ethContractAddressOnEthereum);
    } catch (e) {
      console.log(e, "handleAddToken");
    }
  };

  return (
    <Modal
      show={tokenModal.modal}
      onClose={handleClose}
      header=""
      className="txnInfoModal"
      staticBackDrop={true}
      closeButton={true}
    >
      <div className="px-10 pt-10 md:px-7 md:pt-7">
        <p className="text-light-high text-center font-medium text-lg leading normal px-8 md:text-base md:px-7">
          Add Token
        </p>
      </div>
      <div className={`px-8 py-4 md:px-7 md:pt-4 m-0`}>
        <p className="text-light-high text-center text-base leading normal px-8 md:text-base md:px-7">
          To Add stkEth token on optimism network click on below add button to
          proceed.
        </p>
        <Button
          className="button w-full md:text-sm flex items-center
            justify-center max-w-[200px] mx-auto my-4"
          type="primary"
          size="medium"
          content="Add Token"
          onClick={handleAddToken}
        />
        <p className="text-light-high text-center text-base leading normal px-8 md:text-base md:px-7">
          If you not added optimism network to metamask yet click on below
          button to proceed.
        </p>
        <Button
          className="button w-full md:py-2 md:text-sm flex items-center
            justify-center max-w-[200px] mx-auto my-4"
          type="primary"
          size="medium"
          content="Switch Network"
          onClick={handleSwitchNetwork}
        />
      </div>
    </Modal>
  );
};

export default AddTokenModal;
