import React, { createContext, useReducer, useContext } from 'react';
import { accountReducer, AccountStateType, accountInitialState } from '../store/reducers/account';
import { playlistReducer, PlaylistStateType, playlistInitialState } from '../store/reducers/playlist';
import { Action } from '../interfaces/action';

type InitialStateType = {
  playlistState: PlaylistStateType;
  accountState: AccountStateType;
}

const initialState = {
  playlistState: playlistInitialState,
  accountState: accountInitialState,
}

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null
});

const mainReducer = ({ accountState, playlistState }: InitialStateType, action: Action) => ({
  playlistState: playlistReducer(playlistState, action),
  accountState: accountReducer(accountState, action),
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  )
}

const useAppStateContainer = () => {
  const contextValue = useContext(AppContext);
  return contextValue;
};

export { AppProvider, useAppStateContainer, AppContext };
