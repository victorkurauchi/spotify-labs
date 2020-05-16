import React from 'react';
import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons'
import { Typography, Card, Avatar } from 'antd'
const { Text } = Typography
const { Meta } = Card

import { SpotifyAccountInterface } from '../interfaces/account';

type Props = {
  account: SpotifyAccountInterface;
}

const Profile = ({ account }: Props) => {
  if (!account) return <Text>Account not available</Text>

  const fallback = 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'

  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt={account?.display_name}
          src={account?.images[0].url || fallback}
        />
      }
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title={account?.display_name}
        description={account?.email}
      />
    </Card>
  )
};

export default Profile;
