import { compose, createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

export default initialState => {
  initialState =
    JSON.parse(window.localStorage.getItem('state')) || initialState;

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );

  store.subscribe(() => {
    const state = store.getState();
    const persist = {
      // cart: state.cart,
      // total: state.total
    };

    window.localStorage.setItem('state', JSON.stringify(persist));
  });

  return store;
};


