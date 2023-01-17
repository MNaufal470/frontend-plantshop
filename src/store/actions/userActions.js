import axios from "axios";
export const loginUser = (state, action) => {
  return (state.user = action.payload);
};

export const logout = async (state, action) => {
  await axios.get("/api/user/logout");
  localStorage.removeItem("userInfo");
  sessionStorage.removeItem("userInfo");
  document.location.href = "/login";
  return (state.user = {});
};
