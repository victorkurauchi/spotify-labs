import { getHost } from '../utils/config'
import { notification, message } from 'antd'
import { SET_ACCOUNT_INFO } from '../store/actionTypes'

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

// TODO add items to playlist
export async function createPlaylistEffect(userId: number, data: any) {
  const url = getHost()
  const res = await fetch(`${url}/users/${userId}/playlists`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      authorization: `Bearer ${window.localStorage.getItem('token')}`
    }
  })

  const response = await res.json()

  console.log(response)
  
  if (response.error) {
    console.log(`Code: ${response.error.status} / ${response.error.message}`)
    message.error(`Code: ${response.error.status} / ${response.error.message}`)
    return
  }

  message.success('Well done, Your playlist was succesfully created!')
}
