import { Decimal } from "@cosmjs/math";
export const emptyFunc = () => ({});

export const decimalize = (valueString: string | number, decimals = 6) => {
  let truncate: number;
  if (typeof valueString === "string") {
    truncate = Number(valueString);
  } else {
    truncate = valueString;
  }
  return Decimal.fromAtomics(
    Math.trunc(truncate!).toString(),
    decimals
  ).toString();
};

export const unDecimalize = (valueString: string | number, decimals = 6) => {
  return Decimal.fromUserInput(valueString.toString(), decimals).atomics;
};
