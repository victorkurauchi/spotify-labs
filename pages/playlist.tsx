import React from 'react';
import { Breadcrumb, Input, Button, Card, Form, Checkbox, Spin, Tabs, Divider } from 'antd'
import Layout from '../components/Layout'
import { useAppStateContainer } from '../context/application'
import TrackCatalog from '../components/Catalog/TrackCatalog'
import { createPlaylistEffect, getUserPlaylistEffect } from '../efffects'
import { OperationStatus } from '../store/reducers/playlist';
import Playlist from '../components/Playlist';

const PlaylistPage = () => {
  const { state, dispatch } = useAppStateContainer()
  const { playlist } = state.playlistState
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const { operationStatus } = state.playlistState
    if (operationStatus === OperationStatus.ERRORED 
        || operationStatus === OperationStatus.FULFILLED) {
          setLoading(false)
        }
  }, [state.playlistState.operationStatus])

  React.useEffect(() => {
    if (state.accountState.account) {
      getUserPlaylistEffect(state.accountState.account.id, dispatch)
    }
  }, [])

  const createPlaylist = (values: any) => {
    const body = {
      description: values.description,
      name: values.playlistName,
      public: values.public,
      tracks: state.playlistState.playlist
    }

    setLoading(true)
    createPlaylistEffect(state.accountState.account!.id, body, dispatch)
  }

  const [form] = Form.useForm()

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  }

  const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 4 },
  }

  return (
    <Layout>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Playlist</Breadcrumb.Item>
      </Breadcrumb>

      <div className="site-layout-content">
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Create" key="1">
            { loading && <Spin size="large" />}

            <Card>
              <Form
                {...formItemLayout}
                form={form}
                name="register"
                layout="horizontal"
                onFinish={createPlaylist}
                scrollToFirstError
              >

                <Form.Item name="playlistName" label="Give it a cool name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>

                <Form.Item name="description" label="Any description?" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>

                <Form.Item {...buttonItemLayout}
                  name="public"
                  valuePropName="checked"
                  rules={[
                    { validator:(_, value) => value ? Promise.resolve() : Promise.reject('Should accept agreement') },
                  ]}
                >
                  <Checkbox>
                    I want to make it public
                  </Checkbox>
                </Form.Item>
                
                <Form.Item {...buttonItemLayout}>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </Form>

              <Divider />

              <TrackCatalog data={{ items: playlist }} options={['listen', 'remove']} />
            </Card>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Your saved lists" key="2">
            <Playlist data={state.playlistState.userExistingPlaylists} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Layout>
  )
}

export default PlaylistPage
