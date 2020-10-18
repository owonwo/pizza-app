import React from "react";
// import { log } from "@wigxel/utils";
import useFetch from 'use-http';
import { BASE_URL, AUTH_TOKEN_KEY } from '../libs/constants';


const getToken = () => localStorage.getItem(AUTH_TOKEN_KEY);
const hasToken = () => !!getToken();

const useAuth = () => {
  const fetch = useFetch(BASE_URL + '/api', {
  	interceptors: {
  		request({ options }) {
  			if (hasToken())
  				options.headers.Authorization = `Bearer ${getToken()}`;

  			return options;
  		}
  	}
  });
  const [errors, setError] = React.useState({ login: null });

  const loginUser = async ({ email, password }) => {
  	// clear Errors
  	setError({ ...errors, login: false });

  	// try login
    const payload = await fetch.post('/login', { email, password })

    if (fetch.response.ok) {
      localStorage.setItem(AUTH_TOKEN_KEY, payload.access_token);
      setError({ ...errors, login: false })
      return Promise.resolve('Login Successful');
    }

    if (payload.message)
    	setError({ ...errors, login: payload.message });
   	return Promise.reject(Error('Login Failed'));
  };

  const getAuthUser = async () => {
    const payload = await fetch.get('/me');
    if (fetch.response.ok) {
    	return payload;
    }

    return Promise.reject('User not found!');
  };

  const logoutUser = () => {
    console.log("logging out user");
    localStorage.removeItem(AUTH_TOKEN_KEY);
    return Promise.resolve();
  };

  return {
    getAuthUser,
    logoutUser,
    loginUser,
    hasToken,
    errors,
  };
};

export default useAuth;
