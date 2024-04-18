let adminDetails = [];
let storeDetails = [];
let userDetails = [];

try {
  adminDetails = JSON.parse(localStorage.getItem("admin"));
  if (adminDetails == null) {
    adminDetails = undefined;
  }
  storeDetails = JSON.parse(localStorage.getItem("store"));
  if (storeDetails == null) {
    storeDetails = undefined;
  }
  userDetails = JSON.parse(localStorage.getItem("user"));
  if (userDetails == null) {
    userDetails = undefined;
  }
} catch (error) {}

const initialState = {
  admin: adminDetails,
  store: storeDetails,
  user: userDetails,
};
const login_reducer = (state = initialState, action) => {
  switch (action.type) {
    case 1:

    default:
      return state;
  }
};

export default login_reducer;
