import React from 'react';
import { Breadcrumb, Input, Button, Card, Form } from 'antd'
import Layout from '../components/Layout'
// import { getHost } from '../utils/config';
// import { fetchUser } from '../efffects';
import { useAppStateContainer } from '../context/application';
// import { SET_IN_BULK } from '../store/actionTypes';
import TrackCatalog from '../components/Catalog/TrackCatalog';

const PlaylistPage = () => {
  const { state } = useAppStateContainer()
  const { playlist } = state.playlistState
  // const [name, setName] = React.useState('')
  // const [description, setDescription] = React.useState('')

  const createPlaylist = (values: any) => {
    // http call
    console.log(values)
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

        <Card>
          <Form
            {...formItemLayout}
            layout="horizontal"
            form={form}
            onFinish={createPlaylist}
            name="register"
          >
            <Form.Item label="Playlist name" rules={[{ required: true }]}>
              <Input placeholder="give your playlist a cool name" name="playlistName" />
            </Form.Item>
            <Form.Item label="Description" rules={[{ required: true }]}>
              <Input placeholder="any description?" name="description" />
            </Form.Item>
            <Form.Item {...buttonItemLayout}>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card>
          <TrackCatalog data={{ items: playlist }} options={['listen', 'remove']} />
        </Card>
      </div>
    </Layout>
  )
}

export default PlaylistPage
