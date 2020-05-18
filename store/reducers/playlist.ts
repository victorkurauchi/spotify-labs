import { Action } from '../../interfaces/action'
import * as types from '../actionTypes'

export type PlaylistStateType = {
  tracks: { items: any[] };
  albums: { items: any[] };
  artists: { items: any[] };
  playlist: any[];
  operationStatus: string;
  userExistingPlaylists: any[];
}

export enum OperationStatus {
  STANDBY = 'standby',
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  ERRORED = 'errored'
}

export const playlistInitialState = {
  tracks: { items: [] },
  albums: { items: [] },
  artists: { items: [] },
  playlist: [],
  operationStatus: OperationStatus.STANDBY,
  userExistingPlaylists: [],
};

export const playlistReducer = (state: PlaylistStateType, action: Action) => {
  switch (action.type) {
    case types.SET_IN_BULK:
      const { tracks, albums, artists } = action.payload
      return { ...state, tracks, albums, artists }
    case types.SET_TRACKS:
      return { ...state, tracks: action.payload }
    case types.SET_ALBUMS:
      return { ...state, albums: action.payload }
    case types.SET_ARTISTS:
      return { ...state, artists: action.payload }
    case types.ADD_TRACK_TO_PLAYLIST:
      return { ...state, playlist: [...state.playlist, action.payload] }
    case types.SET_OPERATION_STATUS:
      return { ...state, operationStatus: action.payload }
    case types.SET_USER_PLAYLIST:
      return { ...state, userExistingPlaylists: action.payload, operationStatus: OperationStatus.FULFILLED }
    default: 
      return state;
  }
}
