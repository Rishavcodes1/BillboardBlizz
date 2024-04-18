import { COMPLETED_ORDER, PENDING_ORDER } from "../CONSTANTS";

export const orders = (orderID) => ({
  type: COMPLETED_ORDER,
  payload: {
    orderID,
  },
});

export const pendingOrder = (orderID) => ({
  type: PENDING_ORDER,
  payload: {
    orderID,
  },
});
