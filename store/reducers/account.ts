import { Action } from '../../interfaces/action'
import { SET_ACCOUNT_INFO } from '../actionTypes';
import { SpotifyAccountInterface } from '../../interfaces/account';

export type AccountStateType = {
  account: SpotifyAccountInterface|null;
}

export const accountInitialState = {
  account: null
};

export const accountReducer = (state: AccountStateType, action: Action) => {
  switch (action.type) {
    case SET_ACCOUNT_INFO:
      return { ...state, account: action.payload }
    default: 
      return state;
  }
}
