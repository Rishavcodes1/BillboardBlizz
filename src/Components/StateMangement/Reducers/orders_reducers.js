import { COMPLETED_ORDER, PENDING_ORDER } from "../CONSTANTS";

let local_completed_orders = [];
try {
  local_completed_orders = JSON.parse(localStorage.getItem("completed_orders"));
  if (local_completed_orders == null) {
    local_completed_orders = [];
  }
} catch (error) {}

let initial_state = { completed_orders: local_completed_orders };
let updated_local_completed_orders = [];
let completed_orders_array = [];
const orders_reducers = (state = initial_state, action) => {
  switch (action.type) {
    case COMPLETED_ORDER:
      completed_orders_array = Object.values(state.completed_orders);
      if (completed_orders_array.includes(action.payload.orderID)) {
        return { completed_orders: state.completed_orders };
      }
      updated_local_completed_orders = [
        ...state.completed_orders,
        action.payload.orderID,
      ];
      localStorage.setItem(
        "completed_orders",
        JSON.stringify(updated_local_completed_orders)
      );
      return { completed_orders: updated_local_completed_orders };

    case PENDING_ORDER:
      completed_orders_array = Object.values(state.completed_orders);
      completed_orders_array = completed_orders_array.filter(
        (item) => item != action.payload.orderID
      );

      localStorage.setItem(
        "completed_orders",
        JSON.stringify(completed_orders_array)
      );
      return { completed_orders: completed_orders_array };
    default:
      return state;
  }
};
export default orders_reducers;
