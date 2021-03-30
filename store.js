import React, { useReducer } from 'react';
import axios from 'axios';

export const BACKEND_URL = 'http://localhost:3004';
// export const BACKEND_URL = 'https://freight-buddy-mobile-backend.herokuapp.com';
// key for async storage to store a user's authentication details
export const USER_AUTH = 'USER_AUTH';

// create an object that represents all the data contained in the app
export const initialState = {
  requests: [],
  selectedRequest: {},
  userRequests: [],
};

// define each reducer action type we want to do on the data we defined above
const RETRIEVE_REQUESTS = 'RETRIEVE_REQUESTS';
const SET_REQUEST = 'SET_REQUEST';
const RETRIEVE_USER_REQUESTS = 'RETRIEVE_USER_REQUESTS';

// define the matching reducer function
export function appReducer(state, action) {
  switch (action.type) {
    case RETRIEVE_REQUESTS:
      return { ...state, requests: action.payload.requests };
    case SET_REQUEST:
      return { ...state, selectedRequest: action.payload.request };
    case RETRIEVE_USER_REQUESTS:
      return { ...state, userRequests: action.payload.userRequests };
    default:
      return state;
  }
}

// define the matching reducer actions
export function retrieveRequestsAction(requests) {
  return {
    type: RETRIEVE_REQUESTS,
    payload: {
      requests,
    },
  };
}

export function setSelectedRequestAction(request) {
  return {
    type: SET_REQUEST,
    payload: {
      request,
    },
  };
}

export function retrieveUserRequestsAction(userRequests) {
  return {
    type: RETRIEVE_USER_REQUESTS,
    payload: {
      userRequests,
    },
  };
}

/* ********************************
 * ********************************
 * ********************************
 * ********************************
 *        Provider Code
 * ********************************
 * ********************************
 * ********************************
 * ********************************
 */
// In this section we extract out the provider HOC
export const AppContext = React.createContext(null);
const { Provider } = AppContext;

// export a provider HOC that contains the initalized reducer
// pass the reducer as context to the children
// any child component will be able to alter the state of the app
export function AppProvider({ children }) {
  const [store, dispatch] = useReducer(appReducer, initialState);
  return (
    <Provider value={{ store, dispatch }}>
      {children}
    </Provider>
  );
}

/* ********************************
 * ********************************
 * ********************************
 * ********************************
 *        Backend Requests
 * ********************************
 * ********************************
 * ********************************
 * ********************************
 */
// retrieve available requests to the user's country (i.e. requests with status='requested')
export async function retrieveRequests(dispatch, userCountry) {
  return axios.get(`${BACKEND_URL}/requests`, { params: { country: userCountry } })
    .then((result) => {
      // update the state in AppProvider with the requests
      dispatch(retrieveRequestsAction(result.data.requestsList));
      return { error: false };
    })
    .catch((error) => {
      if (error.message === 'Request failed with status code 403') {
        console.log('forbidden error');
        return { error: true };
      }
      console.log(error);
      return { error: true };
    });
}

// retrieve a user's requests
export async function retrieveUserRequests(dispatch, userId) {
  return axios.get(`${BACKEND_URL}/users/${userId}/requests`)
    .then((result) => {
      // update the state in AppProvider with the user's requests
      dispatch(retrieveUserRequestsAction(result.data.userRequests));
      return { error: false };
    })
    .catch((error) => {
      if (error.message === 'Request failed with status code 403') {
        console.log('forbidden error');
        return { error: true };
      }
      console.log(error);
      return { error: true };
    });
}
