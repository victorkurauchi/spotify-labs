import { getHost } from "../utils/config"
import { notification } from 'antd'
import { SET_ACCOUNT_INFO } from "../store/actionTypes"


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
