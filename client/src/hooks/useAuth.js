import React from "react";
import { log } from "@wigxel/utils";

const useAuth = () => {
  const [errors, setError] = React.useState({ signin: null });
  const [signedIn, setSignedIn] = React.useState("LOADING");

  const loginUser = ({ email, password }) => {
    Promise.resolve()
      .then(() => console.log("Login Success"))
      .catch((err) => setError({ ...errors, signin: err.message }));
  };

  const getUser = async (id, closure) => {
    return Promise.resolve({ name: "James" });
  };

  const userIsAdmin = async (id) => {
    const user = await getUser(id);
    if (user.privilege !== "SUPER") throw Error("Unauthorized User");

    return log(user, "Authenticated User");
  };

  const logoutUser = () => {
    console.log("logging out user");
    return Promise.resolve();
  };

  return {
    logoutUser,
    getUser,
    loginUser,
    errors,
    signedIn,
  };
};

export default useAuth;
