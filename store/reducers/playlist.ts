import { Action } from '../../interfaces/action'
import { SET_TRACKS, SET_ALBUMS, SET_ARTISTS, SET_IN_BULK } from '../actionTypes';

export type PlaylistStateType = {
  tracks: { items: any[] };
  albums: { items: any[] };
  artists: { items: any[] };
}

export const playlistInitialState = {
  tracks: { items: [] },
  albums: { items: [] },
  artists: { items: [] },
};

export const playlistReducer = (state: PlaylistStateType, action: Action) => {
  switch (action.type) {
    case SET_IN_BULK:
      const { tracks, albums, artists } = action.payload
      return { ...state, tracks, albums, artists }
    case SET_TRACKS:
      return { ...state, tracks: action.payload }
    case SET_ALBUMS:
      return { ...state, albums: action.payload }
    case SET_ARTISTS:
      return { ...state, artists: action.payload }
    default: 
      return state;
  }
}
