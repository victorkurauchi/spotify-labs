import { getHost } from '../utils/config'
import { notification, message } from 'antd'
import { SET_ACCOUNT_INFO, SET_OPERATION_STATUS } from '../store/actionTypes'
import { OperationStatus } from '../store/reducers/playlist'

export async function fetchUser(dispatch: Function) {
  const url = getHost()
  const res = await fetch(`${url}/me`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${window.localStorage.getItem('token')}`
    }
  })
  const response = await res.json()
  
  if (response.error) {
    console.log(`Code: ${response.error.status} / ${response.error.message}`)
    // dispatch error
    return
  }

  notification.open({
    message: 'Howdy',
    description: 'You are now authenticated with Spotify.',
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });

  dispatch({ type: SET_ACCOUNT_INFO, payload: response })
}

export async function createPlaylistEffect(userId: number, data: any, dispatch: Function) {
  const body = {
    description: data.description,
    name: data.name,
    public: data.public,
  }

  const url = getHost()
  const res = await fetch(`${url}/users/${userId}/playlists`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      authorization: `Bearer ${window.localStorage.getItem('token')}`
    }
  })

  const response = await res.json()

  console.log('response', response)
  
  if (response.error) {
    message.error(`Code: ${response.error.status} / ${response.error.message}`)
    dispatch({ type: SET_OPERATION_STATUS, payload: OperationStatus.ERRORED })
    return
  }

  const playlistRequest = await fetch(`${url}/playlists/${response.id}/tracks`, {
    method: 'POST',
    body: JSON.stringify({
      uris: data.tracks.map((track: any) => track.uri)
    }),
    headers: {
      authorization: `Bearer ${window.localStorage.getItem('token')}`
    }
  })

  const playlistResponse = await playlistRequest.json()

  console.log('playlistResponse', playlistResponse)

  message.success('Well done, Your playlist was succesfully created!')
  dispatch({ type: SET_OPERATION_STATUS, payload: OperationStatus.FULFILLED })
}
