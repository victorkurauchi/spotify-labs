import React from 'react';
import { List, Skeleton, Avatar, Card } from 'antd';

type Props = {
  data: any[];
}
const Playlist = ({ data }: Props) => {
  const imgFallback = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  return (
    <Card>
      <List
        className="demo-loadmore-list"
        // loading={initLoading}
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Skeleton avatar title={false} loading={false} active>
              <List.Item.Meta
                avatar={
                  <Avatar src={item.images.length && item.images[2] ? item.images[2].url : imgFallback} />
                }
                title={<a href={item.href} target="_blank">{item.name}</a>}
                description={`Tracks: ${item.tracks.total}`}
              />
              <div>Owner: {item.owner.display_name}</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Playlist;
