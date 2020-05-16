import React from 'react';
import { Breadcrumb, Row, Col, Typography, Spin, notification } from 'antd'
import { getHashParams } from '../utils/url'
import { useAppStateContainer } from '../context/application';
import { getHost } from '../utils/config';
import Layout from '../components/Layout'
import ErrorHint from '../components/Error';
import { SET_ACCOUNT_INFO } from '../store/actionTypes';
import Profile from '../components/Profile';
import Link from 'next/link';

const { Text, Title } = Typography

const renderLoading = () => (
  <Row>
    <Col span={12} offset={6}>
      <Spin size="large"></Spin>
      <Text>Authenticating you...</Text>
    </Col>
  </Row>
)

const openNotification = (title: string, message: string) => {
  notification.open({
    message: title,
    description: message,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};

const CallbackPage = () => {
  const { state, dispatch } = useAppStateContainer()
  const { accountState } = state
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<null|string>(null)

  async function fetchUser() {
    const url = getHost()
    const res = await fetch(`${url}/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${window.localStorage.getItem('token')}`
      }
    })
    const response = await res.json()
    setLoading(false)
    
    if (response.error) {
      setError(`Code: ${response.error.status} / ${response.error.message}`)
      return
    }

    openNotification('Howdy!', 'You are now authenticated with Spotify.')

    dispatch({ type: SET_ACCOUNT_INFO, payload: response })
  }

  React.useEffect(() => {
    const query = getHashParams()
    window.localStorage.setItem('token', query.access_token)
    fetchUser()
  }, []);

  return (
    <Layout>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Authentication</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content">
        { error && (<ErrorHint msg={error} />)}

        { loading && renderLoading() }

        <Row gutter={16}>
          { accountState.account && (
            <>
              <Col className="gutter-row">
                <Profile account={accountState.account} />
              </Col>
              <Col className="gutter-row">
                <Title level={2}>Welcome to our labs</Title>
                <Text>Now let's find some songs and create a playlist for you</Text>
                <br/>

                <Link href="/">
                  <a>Take me to the search.</a>
                </Link>
              </Col>
            </>
          )}
        </Row>
      </div>
    </Layout>
  )
} 

export default CallbackPage
