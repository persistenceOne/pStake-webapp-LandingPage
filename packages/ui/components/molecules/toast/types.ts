export interface Alert {
  message: any;
  txHash?: string;
}

export const enum ToastType {
  SUCCESS,
  ERROR,
  LOADING,
  INFO
}
