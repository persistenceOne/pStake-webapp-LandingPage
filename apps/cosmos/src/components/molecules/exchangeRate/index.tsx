import React, { useState } from "react";
import { ExchangeRateTypes } from "./types";
import { formatNumber } from "utils";
import { Icon } from "ui";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";

const ExchangeRate = ({ type }: ExchangeRateTypes) => {
  const { exchangeRate } = useSelector((state: RootState) => state.initialData);
  const [reverseExchangeRate, setReverseExchangeRate] = useState(false);

  return (
    <>
      {type === "stake"
        ? reverseExchangeRate
          ? `1 stkATOM = ${formatNumber(1 / exchangeRate)} ATOM`
          : `1 ATOM = ${formatNumber(exchangeRate)} stkATOM`
        : reverseExchangeRate
        ? `1 ATOM = ${formatNumber(exchangeRate)} stkATOM`
        : `1 stkATOM = ${formatNumber(1 / exchangeRate)} ATOM`}

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
