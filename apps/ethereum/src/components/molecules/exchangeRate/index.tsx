import React, { useState } from "react";
import { ExchangeRateTypes } from "./types";
import { formatNumber } from "../../../helpers/utils";
import { Icon } from "../../atoms/icon";
import { useAppStore } from "../../../store/store";

const ExchangeRate = ({ type }: ExchangeRateTypes) => {
  const exchangeRate = useAppStore((state) => state.exchangeRate);

  const [reverseExchangeRate, setReverseExchangeRate] = useState(false);

  return (
    <>
      {type === "stake"
        ? reverseExchangeRate
          ? `1 stkETH = ${formatNumber(1 / Number(exchangeRate))} ETH`
          : `1 ETH = ${formatNumber(Number(exchangeRate))} stkETH`
        : reverseExchangeRate
        ? `1 ETH = ${formatNumber(Number(exchangeRate))} stkETH`
        : `1 stkETH = ${formatNumber(1 / Number(exchangeRate))} ETH`}

      <span
        className="flex ml-2 items-center cursor-pointer"
        onClick={() => {
          setReverseExchangeRate(!reverseExchangeRate);
        }}
      >
        <Icon iconName="switch" viewClass="search" />
      </span>
    </>
  );
};

export default ExchangeRate;
