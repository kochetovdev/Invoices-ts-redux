import { UserAuthData } from "../types";

export const saveUserDataToLocalstorage = (userData: UserAuthData) => {
  localStorage.setItem("user", JSON.stringify(userData));
};