import * as React from 'react'
import Head from 'next/head'
import { Layout, Menu, Row, Col, Avatar, Dropdown, Badge } from 'antd'

const { Header, Content, Footer } = Layout
import { UserOutlined } from '@ant-design/icons'
import { useAppStateContainer } from '../context/application'
import Link from 'next/link'

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="/">Profile</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="/">Settings</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">Logout</Menu.Item>
  </Menu>
);

type Props = {
  title?: string
}

const BaseLayout: React.FunctionComponent<Props> = ({
  children,
  title = 'Vamp Labz Spotify',
}) => {
  const { state } = useAppStateContainer()
  const avatar = state.accountState?.account?.images[0].url
  const playlistCount = state.playlistState?.playlist?.length

  const withAvatar = () => (
    <Avatar size="large" src={avatar} />
  )

  const withIcon = () => (
    <Avatar size="large" icon={<UserOutlined />} />
  )

  return  (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout className="layout" style={{ minHeight: '100vh' }}>
        <Header>
          <Row justify="space-between">
            <Col>
              <div className="logo" />
              <Menu theme="dark" mode="horizontal">
                <Menu.Item key="1">
                  <Link href="/">
                    <a style={{ color: 'white' }}>Home</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Badge count={playlistCount} offset={[0, -9]}>
                    <Link href="/playlist">
                      <a style={{ color: 'white' }}>Playlist</a>
                    </Link>
                  </Badge>
                </Menu.Item>
              </Menu>
            </Col>
  
            <Col>
              <Dropdown overlay={menu} trigger={['click']}>
                { avatar ? withAvatar() : withIcon() }
              </Dropdown>
            </Col>
          </Row>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Vamp Labz ©{new Date().getFullYear()} Created by Victor</Footer>
      </Layout>
    </div>
  )
}

export default BaseLayout
