import React from "react";
import useFetch from 'use-http';
import { actions, useDispatch } from '../stores/AuthStore';
import { BASE_URL, AUTH_TOKEN_KEY, AUTH_USER_KEY } from '../libs/constants';
import { hasToken } from '../libs/utils';

const useAuth = () => {
	const dispatch = useDispatch();
  const fetch = useFetch(BASE_URL + '/api');
  const [errors, setError] = React.useState({ login: null });

  const loginUser = async ({ email, password }) => {
  	// clear Errors
  	setError({ ...errors, login: false });

  	// try login
    const payload = await fetch.post('/login', { email, password })

    if (fetch.response.ok) {
      localStorage.setItem(AUTH_TOKEN_KEY, payload.access_token);
      dispatch({
      	type: actions.SET_USER,
      	payload: await getAuthUser()
      });
      setError({ ...errors, login: false })
      return Promise.resolve('Login Successful');
    }

    if (payload.message)
    	setError({ ...errors, login: payload.message });
   	return Promise.reject(Error('Login Failed'));
  };

  const registerUser = async (formData) => {
  	// clear Errors
  	setError({ ...errors, register: false });

  	// try login
    const payload = await fetch.post('/register', formData)

    if (fetch.response.ok) {
      localStorage.setItem(AUTH_TOKEN_KEY, payload.access_token);
      dispatch({
      	type: actions.SET_USER,
      	payload: await getAuthUser()
      });
      setError({ ...errors, register: false })
      return Promise.resolve('Login Successful');
    }

    if (payload.message)
    	setError({ ...errors, register: payload.message });
   	return Promise.reject(Error('Registration Failed'));
  };

  const getAuthUser = async () => {
    const payload = await fetch.get('/me');
    if (fetch.response.ok) {
    	return payload;
    }

    return Promise.reject('User not found!');
  };

  const logoutUser = async () => {
  	// remove auth information from LocalStorage
    [AUTH_TOKEN_KEY, AUTH_USER_KEY].map((key) => localStorage.removeItem(key));

    return Promise.resolve();
  };

  return {
    getAuthUser,
    registerUser,
    logoutUser,
    loginUser,
    hasToken,
    errors,
    loading: fetch.loading,
  };
};

export default useAuth;
