import React from 'react';
import { Breadcrumb, Input, Row, Col, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import Layout from '../components/Layout'

const { Search } = Input

type Props = {
  user: any;
}

const IndexPage = ({ user }: Props) => {

  const authorize = () => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT
    const queryParams = `client_id=${clientId}&redirect_uri=${redirectUri}&scope=user-read-private,user-read-email&response_type=token`
    
    window.location.href = `https://accounts.spotify.com/authorize?${queryParams}`
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
              onSearch={value => console.log(value)}
            />
          </Col>
        </Row>
      </div>
    </Layout>
  )
}

// IndexPage.getInitialProps = async ({ req }: any) => {
//   const url = NEXT_PUBLIC_API_HOST;
//   const res = await fetch(`${url}/me`)
//   const json = await res.json()
//   return { user: json }
// }

export default IndexPage
