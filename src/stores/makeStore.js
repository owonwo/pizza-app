import React from "react";
import t from "prop-types";

export const makeStore = (initial_state, reducer) => {
  const storeCtx = React.createContext();
  const dispatchCtx = React.createContext({});

  const Provider = ({ children }) => {
    const [store, dispatch] = React.useReducer(reducer, initial_state);
    dispatch.thunkify = (a) => () => dispatch(a);
    dispatch.curry = (type) => (payload) => dispatch({ type, payload });

    return (
      <dispatchCtx.Provider value={dispatch}>
        <storeCtx.Provider value={store}>{children}</storeCtx.Provider>
      </dispatchCtx.Provider>
    );
  };

  Provider.propTypes = {
    children: t.node.isRequired,
  };

  const useStore = () => React.useContext(storeCtx);
  const useDispatch = () => React.useContext(dispatchCtx);

  return { useDispatch, useStore, Provider, Consumer: storeCtx.Consumer };
};
