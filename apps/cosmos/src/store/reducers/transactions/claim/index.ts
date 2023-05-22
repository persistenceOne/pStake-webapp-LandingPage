import { createSlice } from "@reduxjs/toolkit";
import { ClaimTransactionPayload, ClaimState } from "./types";

const initialState: ClaimState = {
  showModal: false
};

const claim = createSlice({
  name: "Claim",
  initialState,
  reducers: {
    executeClaimTransactionSaga: (state, action: ClaimTransactionPayload) => {},
    hideClaimModal: (state) => {
      state.showModal = false;
    },
    showClaimModal: (state) => {
      state.showModal = true;
    }
  }
});

export const { executeClaimTransactionSaga, showClaimModal, hideClaimModal } =
  claim.actions;

export default claim.reducer;
