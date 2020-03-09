import jwt from 'jsonwebtoken';
import authentication from 'helpers/authentication';

/**
 * Documents
 * @default defaultData
 */

const defaultState = {
  isValid: null,
  service: null,
  accessToken: null,
  email: null,
  displayname: null,
  avatar: null,
}

/**
 * Refesh session
 */
export const REFRESH_SESSION = 'REFRESH_SESSION';
export const REFRESH_SESSION_OK = 'REFRESH_SESSION_OK';
export const REFRESH_SESSION_FAIL = 'REFRESH_SESSION_FAIL';

export const refreshSession = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: REFRESH_SESSION });

      let data = authentication.get();
      if (!data || typeof data !== 'object') {
        dispatch({
          type: REFRESH_SESSION_FAIL,
          reason: 'Storage is empty.',
          data: { ...defaultState }
        });
        return reject('Storage is empty.');
      }

      console.log('JWT:', jwt.decode(data.accessToken));
      dispatch({
        type: REFRESH_SESSION_OK,
        reason: null,
        data: { isValid: true, ...data }
      });
      return resolve(data);
    });
  }
}

/**
 * Log in
 */
export const LOG_IN = 'LOG_IN';
export const LOG_IN_OK = 'LOG_IN_OK';
export const LOG_IN_FAIL = 'LOG_IN_FAIL';

export const logIn = (data) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: LOG_IN });

      if (false) {
        dispatch({
          type: LOG_IN_FAIL,
          reason: 'Failed connection.',
          data: { ...defaultState }
        });
        return reject('Failed connection.');
      }

      authentication.set(data);
      dispatch({
        type: LOG_IN_OK,
        reason: null,
        data: { isValid: true, ...data }
      });
      return resolve(data);
    });
  }
}


/**
 * Log out
 */
export const LOG_OUT = 'LOG_OUT';
export const LOG_OUT_OK = 'LOG_OUT_OK';
export const LOG_OUT_FAIL = 'LOG_OUT_FAIL';

export const logOut = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: LOG_OUT });

      let data = authentication.get();
      if (!data) {
        dispatch({
          type: LOG_OUT_FAIL,
          reason: 'Empty storage.',
          data: null
        });
        return reject('Empty storage.');
      }

      authentication.clear();
      dispatch({
        type: LOG_OUT_OK,
        reason: null,
        data: { ...defaultState }
      });
      return resolve();
    });
  }
}

/**
 * Reducder
 */
export default (state = defaultState, action) => {
  switch (action.type) {
    case REFRESH_SESSION_OK:
      return { ...state, ...action.data };
    case REFRESH_SESSION_FAIL:
      return { ...state, ...action.data };
    case LOG_IN_OK:
      return { ...state, ...action.data };
    case LOG_IN_FAIL:
      return { ...state, ...action.data };
    case LOG_OUT_OK:
      return { ...state, ...action.data };
    case LOG_OUT_FAIL:
      return { ...state, ...action.data };
    default:
      return state;
  }
}