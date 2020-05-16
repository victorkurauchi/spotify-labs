import React from 'react';
import { Empty, List, Skeleton, Avatar } from 'antd'

type Props = {
  data: { items: any[] };
}

const TrackCatalog = ({ data }: Props) => {
  if (!data?.items?.length) return <Empty />

  return (
    <List
      className="demo-loadmore-list"
      // loading={initLoading}
      itemLayout="horizontal"
      // loadMore={loadMore}
      dataSource={data.items}
      renderItem={item => (
        <List.Item
          actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
        >
          <Skeleton avatar title={false} loading={false} active>
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={<a href="https://ant.design">{item.name}</a>}
              description={`By ${item.artists[0].name} - Popularity ${item.popularity}/100`}
            />
            <div>content</div>
          </Skeleton>
        </List.Item>
      )}
    />
  );
} 
export default TrackCatalog
