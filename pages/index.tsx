import React from 'react';
import { Breadcrumb, Input, Row, Col, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import Layout from '../components/Layout'
import { getHost } from '../utils/config';
import { fetchUser } from '../efffects';
import { useAppStateContainer } from '../context/application';
import { SET_IN_BULK } from '../store/actionTypes';
import AlbumCatalog from '../components/Catalog/AlbumCatalog';
const debounce = require('lodash.debounce')

const { Search } = Input

type Props = {
  user: any;
}

const IndexPage = ({ user }: Props) => {
  const { dispatch, state } = useAppStateContainer()

  React.useEffect(() => {
    fetchUser(dispatch)
  }, [])

  const authorize = () => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT
    const queryParams = `client_id=${clientId}&redirect_uri=${redirectUri}&scope=user-read-private,user-read-email&response_type=token`
    
    window.location.href = `https://accounts.spotify.com/authorize?${queryParams}`
  }

  const applySearch = async (val: string) => {
    if (val.length > 3) {
      const res = await fetch(`${getHost()}/search?q=${val}&limit=50&type=album,artist,track`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${window.localStorage.getItem('token')}`
        }
      })
      const data = await res.json()
      console.log(data)
      if (data) {
        dispatch({
          type: SET_IN_BULK,
          payload: { ...data }
        })
      }
    }
  }

  return (
    <Layout>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content">
        { !user && (
          <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={12} offset={6}>
              <Button
                type="primary"
                icon={<UserOutlined />}
                loading={false}
                onClick={authorize}
              >
                Login with Spotify
              </Button>
            </Col>
          </Row>
        )}

        <Row gutter={[16, 24]}>
          <Col className="gutter-row" span={12} offset={6}>
            <Search
              placeholder="Lets bring you some songs :)"
              enterButton="Search"
              size="large"
              onSearch={debounce(applySearch, 500)}
            />
          </Col>
        </Row>

        { state.playlistState.albums && (<AlbumCatalog data={state.playlistState.albums} />)}
      </div>
    </Layout>
  )
}

export default IndexPage
