import React from "react";
import { Icon, Spinner } from "ui";

const TransactionIcon = (
  stepNumber: number,
  value: number,
  txFailed: boolean
) => {
  return stepNumber < value ? (
    <Icon
      iconName="success-full-disable"
      viewClass="icon-arrow !w-[1.5rem] !h-[1.5rem] md:!w-[1.3rem] md:!h-[1.3rem]"
    />
  ) : stepNumber === value ? (
    txFailed ? (
      <Icon
        iconName="error"
        viewClass="icon-error !w-[1.5rem] !h-[1.5rem] md:!w-[1.3rem] md:!h-[1.3rem]"
      />
    ) : (
      <Spinner size="medium" />
    )
  ) : (
    <Icon
      iconName="success-full"
      viewClass="icon-arrow !w-[1.5rem] !h-[1.5rem] md:!w-[1.3rem] md:!h-[1.3rem]"
    />
  );
};

export default TransactionIcon;
